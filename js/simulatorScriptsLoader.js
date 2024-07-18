var scriptsForCheck = [
    "js/HttpReqHelper.js",
    "js/exceptionInterceptor.js",
    "js/envTester.js",
	"js/additionalDataLoader.js"
];

var toolsScripts = [
    "js/jszip.min.js",
    "js/HttpReqHelper.js",
    "js/WebSockHelper.js",
	"ReplaySimulator.js",
    "js/touchHook.js"
];

function selectMainScript()
{
	return "js/engine.js";
}

function loadAndRunMainScript()
{
	calledRun = false;
	var mainScript = window.ge.scriptPrefix + selectMainScript() + "?v=" + window.ge.version;
	yepnope({ load: mainScript });
}

function load()
{
    "use strict";

    yepnope({
        load: scriptsForCheck,

        complete: function () {
            "use strict";
			addDataLoader.load(function(data){
				window.ge.wofhTactics = data;
        	    if (EnvTester.checkAll()){
            	    console.log("All checks passed");
                	yepnope({
                    	load: toolsScripts
                	});
            	}
	            else{
    	            EnvTester.notSupportImpl(EnvTester.customNotSupportImpl);
            	}
           	});
        }
    });

};