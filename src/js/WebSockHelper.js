function WebSockHelper()
{
	this.socket = null;
	this.message = new Uint8Array();
	this.messagesQueue = [];
	this.isConnected_ = false;
	this.server = "",
	this.sendQueue = [];

	this.connect = function (srv)
	{
		srv = srv.replace("ws://", "")
		srv = srv.replace("wss://", "");
		if (location.protocol !== "https:")  srv = "ws://" + srv;
		else srv = "wss://" + srv;

		this.isConnected_ = false;
		this.server = srv;
		var self = this;
		try{
			this.socket = new WebSocket(srv, "ws");
			this.socket.binaryType = "arraybuffer";
			this.socket.onopen = function()
			{
				self.isConnected_ = true;
				self.sendQueue.forEach(msg => {
					self.socket.send(msg);				
				});
				console.log("ws connected");
			}
			this.socket.onclose = function()
			{
				self.isConnected_ = false;
				console.log("ws disconnected");
			}
			this.socket.onmessage = function(event)
			{
				var _message = new Uint8Array(event.data);
				self.messagesQueue.unshift(_message);
			}
			this.socket.onerror = function(error)
			{
				self.socket.close();
			}
		}
		catch(e){
			this.isConnected_ = false;
		}
	}

	this.disconnect = function()
	{
		this.socket.close();
	}

	this.receiveMessage = function(pSize)
	{
		//Chek if there are messages in the queue
		if(this.messagesQueue.length == 0) return 0;

		//Get top message from the queue and put it to the heap
		var _message = this.messagesQueue[this.messagesQueue.length - 1];
		var _size    = _message.byteLength;
		//Allocate memory for message data
		var _pointer = Module._malloc(_size);

		//Put message size to C++ variable through the heap
		HEAPU8[pSize] = _size & 255;
		HEAPU8[pSize + 1] = (_size >> 8) & 255;
		HEAPU8[pSize + 2] = (_size >> 16) & 255;
		HEAPU8[pSize + 3] = (_size >> 24) & 255;
		for(var i = 0; i < _size; ++i){
			HEAPU8[_pointer + i] = _message[i];
		}
		this.messagesQueue.length -= 1;

		return _pointer;
	}

	this.sendMessage = function(pointer, size)
	{
		var message = new Uint8Array(Module.HEAP8.subarray(pointer, pointer + size));
		if (!this.isConnected_){
			this.sendQueue.push(message);
			return;
		}

		try{
			this.socket.send(message);
		} catch(e) {
		}
	}

	this.isConnected = function() {return this.isConnected_;}
}
