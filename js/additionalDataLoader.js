var utils = {
	urlToObj: function(url) {
		url = url || document.location.search;
		if (url[0] == '?' || url[0] == '#') url = url.slice(1);
		
		var arr = url.split('&');
		var params = {};
		for (var i in arr) {
			if (arr[i].indexOf('=') == -1){
				params[arr[i]] = true;
			} else {
				var part = arr[i].split('=');
				params[part[0]] = decodeURIComponent(part[1].replace(/[+]/g, ' '));
			}
		}
		return params;
	},
	
	objToUrl: function(obj){
		var url = [];
		for(var param in obj){
			url.push(param+'='+obj[param]);
		}
		return url.join('&');
	},
	
	sizeOf: function(obj){
		var count = 0;
		for(var i in obj){
			count++;
		}
		return count;
	},
};

var request = {
	protocol: 'https://',
	
	domain: '',
	
	send: function(comand, search, params){
		params = params||{};
		params.method = params.method||'GET';
		params.domain = params.domain||this.domain;
		params.json = params.json === undefined ? true : params.json;
		params.callback = params.callback||function(){};
		
		search = (search instanceof Object ? utils.objToUrl(search) : search)||'';
		if( search && search[0] != '?' ) 
			search = '?' + search;
		
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		
		var xhr = new XHR();
		
		xhr.open(params.method, this.protocol+params.domain+'/'+comand+search, true);
		
		xhr.onload = function(){
			var resp = params.json ? JSON.parse(this.responseText) : this.responseText;
			
			params.callback(resp);
		}
		
		xhr.onerror = function() {
			alert('Error: ' + this.status);
		}
		
		xhr.send();
	}
};

var addDataLoader = {
	data: {},
	
	load: function(afterLoad){
		this.afterLoad = afterLoad||function(){};
		
		this.waiting = 1;
		
		this.data = this.getDataForLoad();
		
		addDataLoader.tryLoadTactics();
		
		addDataLoader.onLoaded();
	},
	
	getDataForLoad: function(){
		var data = utils.urlToObj();
		
		request.domain = data.domain;
		
		data.simulation = JSON.parse(data.simulation);
		
		return data;
	},
	
	onLoaded: function(){
		if ( --this.waiting != 0 ) return;
		
		addDataLoader.afterLoad(JSON.stringify(this.data));
	},
};

addDataLoader.tryLoadTactics = function()
{
	var self = this;
	
	tactics = this.data.simulation.tactics;
	
	if( !tactics ) return;
	
	if(tactics.tactics0)
	{
		this.waiting++;
		
		request.send('aj_tacticsdata', tactics.tactics0, {callback:function(tacticData){
			tactics.tactics0 = addDataLoader.tryLoadTactics.addConvert(tacticData);
			
			self.onLoaded();
		}});
	}
	
	if(tactics.tactics1)
	{
		this.waiting++;
		
		request.send('aj_tacticsdata', tactics.tactics1, {callback:function(tacticData){
			tactics.tactics1 = addDataLoader.tryLoadTactics.addConvert(tacticData);;
			
			self.onLoaded();
		}});
	}
}

addDataLoader.tryLoadTactics.addConvert = function(tacticData)
{
	if( tacticData ){
		tacticData.data = JSON.parse(tacticData.data);
		
		if( tacticData.data.data )
			tacticData.data.data = JSON.parse(tacticData.data.data);
	}
	
	return tacticData;
};