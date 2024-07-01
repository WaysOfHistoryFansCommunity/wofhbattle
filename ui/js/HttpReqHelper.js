function HttpReqHelper() 
{
	this.requests = [];
	this.cache = [];

    this.cacheFile = function(url, dataPtr, dataSize)
	{
		var co = {};
		url = url.split('/').pop();
		co.url = url;
		co.data = Module.HEAPU8.buffer.slice(dataPtr, dataPtr + dataSize|0);
		this.cache.push(co);
	};

	this.isDone = function (idx)
	{
		if (idx >= this.requests.length) {
			throw("HttpReqHelper::isDone index out of bound " + idx);
			return false;
		}
		assert(this.requests[idx] !== null);
		return this.requests[idx].isDone;
	};

	this.isSuccess = function (idx)
	{
		if (idx >= this.requests.length) throw("HttpReqHelper::isSucceess index out of bound " + idx);
		assert(this.requests[idx] !== null);
		return this.requests[idx].isSuccess;
	};

	this.getProgress = function (idx)
	{
		if (idx >= this.requests.length) throw("HttpReqHelper::getProgress index out of bound " + idx);
		assert(this.requests[idx] !== null);
		return this.requests[idx].progress;
	};

	this.getStatus = function (idx)
	{
		if (idx >= this.requests.length) throw("HttpReqHelper::getStatus index out of bound " + idx);
		assert(this.requests[idx] !== null);
		return this.requests[idx].status;
	};

	this.getData = function (idx, dataPtr, sizePtr)
	{
		if (idx >= this.requests.length) {
			throw("HttpReqHelper::getData index out of bound " + idx);
			return false;
		}
		assert(this.requests[idx] !== null);
		var request = this.requests[idx];
		HEAP8[sizePtr + 0] = (request.resultSize >> 0) & 255;
		HEAP8[sizePtr + 1] = (request.resultSize >> 8) & 255;
		HEAP8[sizePtr + 2] = (request.resultSize >> 16) & 255;
		HEAP8[sizePtr + 3] = (request.resultSize >> 24) & 255;

    	HEAP8[dataPtr + 0] = (request.resultPointer >> 0) & 255;
		HEAP8[dataPtr + 1] = (request.resultPointer >> 8) & 255;
		HEAP8[dataPtr + 2] = (request.resultPointer >> 16) & 255;
		HEAP8[dataPtr + 3] = (request.resultPointer >> 24) & 255;

		return true;
	}

	this.releaseRequester = function (idx)
	{
		if (idx >= this.requests.length) {
			throw("HttpReqHelper::releaseRequest index out of bound " + idx);
			return ;
		}
		assert(this.requests[idx] !== null);
		this.requests[idx] = null;
	};

	this.makeRequest = function(url, postData, contentType)
	{
		var id = this.requests.length;
		for (var i = 0; i < this.requests.length; ++i){
			if (this.requests[i] !== null) continue;
			id = i;
			break;
		}

		var request = new Object();
		this.requests[id] = request;
		request.url = url;
		url = url.split('/').pop();
		for (var i = 0; i < this.cache.length; ++i){
			var co = this.cache[i];
 			if (url.startsWith(co.url)){
				var data = new Uint8Array(co.data);
				request.isDone = true;
				request.isSuccess = true;
				request.status = 200;
				request.resultSize = data.byteLength;
                request.progress = data.byteLength;
				request.resultPointer = Module._malloc(request.resultSize);
				for (var i = 0, len = request.resultSize; i < len; ++i) {
					Module.HEAP8[request.resultPointer + i] = data[i] & 255;
				}
				return id;
			}
		}

		request.post = postData;
		request.resultSize = 0;
		request.resultPointer = 0;
		request.isDone = false;
		request.isSuccess = false;
        request.progress = 0;

		var xhr = new XMLHttpRequest();

		if (request.url.lastIndexOf(".jsh") == request.url.length - 4) {
			request.url = request.url + "?v=" + window.ge.version;
		}

		if (request.post !== "") {
			xhr.open("POST", request.url, true);
		}
		else {
			xhr.open("GET", request.url, true);
		}
		
		xhr.setRequestHeader("Content-Type", contentType);
		xhr.setRequestHeader("Accept", "application/octet-stream");
		xhr.responseType = 'arraybuffer';
	
		xhr.onprogress = function(pe){
			request.progress = pe.loaded;
		};

		xhr.ontimeout = function(pe){
			request.isDone = true;
			request.isSuccess = false;
			request.status = xhr.status;
		};

    	xhr.onreadystatechange = function () {
	        if (xhr.readyState !== 4) return;
			request.isDone = true;
			request.status = xhr.status;
        	if (xhr.status !== 200) {
				request.isSuccess = false;
	    		return ;
    	    }
			var uInt8Array = new Uint8Array(xhr.response);
			request.resultSize = uInt8Array.length;
			request.resultPointer = Module._malloc(request.resultSize);
			Module.HEAP8.set(uInt8Array, request.resultPointer);
			request.isSuccess = true;
	    };

		if (request.post !== "") xhr.send(request.post);
		else xhr.send(null);

		return id;
	};

	return this;
}
