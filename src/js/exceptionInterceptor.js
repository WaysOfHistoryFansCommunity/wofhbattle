console.oldLog = console.log;
console.oldConsoleError = console.error;
console.oldConsoleWarning = console.warn;

debugCollector = {
	echo : true,
	text : "",
	error : "",
	addLog : function(log)
	{
		if (debugCollector.echo) console.oldLog(log);
		debugCollector.text += log + "\n";
	},
	addWarn : function(warn)
	{
		if (debugCollector.echo) console.oldConsoleWarning(warn);
		debugCollector.text += "Warning:\t" + warn + "\n";
	},
	addError : function(error_)
	{
		if (debugCollector.echo) console.oldConsoleError(error_);
		debugCollector.error = error_;
		debugCollector.text += "Error:\t" + error_ + "\n";
	},
	fireError : function(error_)
	{
		/*
		localStorage.setItem("ge_log", debugCollector.text);
		var zip = new JSZip();
		zip.file("report.log", debugCollector.text);
		
		zip.generateAsync({type:"blob", compression: "DEFLATE"}).then(function(content) {
		
			setTimeout(function(){
				let formData = new FormData();
				var uid = Date.now() + "_" + (((1+Math.random())*0x10000)|0).toString(16).substring(1);
				formData.append("web-" + uid + ".zip", content);

				var uploadUrl;
				if (location.origin.indexOf("warselect.io") !== -1) {
					uploadUrl = 'https://upload.warselect.io/upload';
					if (location.protocol !== "https:") uploadUrl = 'http://upload.warselect.io/upload';
				}
				else {
					uploadUrl = 'https://upload.waysofhistory.com:2443/upload';
					if (location.protocol !== "https:") uploadUrl = 'http://upload.waysofhistory.com/upload';
				}

				fetch(uploadUrl, {
						method: "POST", 
						body: formData
					}).then(()=>EnvTester.notSupportImpl(debugCollector.redirectToErrorPage));
			}, 0);
		});
		*/
		return;
	},
	redirectToErrorPage : function()
	{
		"use strict";
		var currentLocation = document.location.href;
		document.location.href = "errors/errorPage.html?" + window.ge.version;
	}
};


console.warn = function (message) {
	debugCollector.addWarn(message);
};

console.log = function (message) {
	debugCollector.addLog(message);
};

console.error = function(message){
	debugCollector.addError(message);
	debugCollector.fireError(message);
};

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) 
{
	debugCollector.addError(errorMsg);
	debugCollector.fireError(errorMsg);
    return false;
}
