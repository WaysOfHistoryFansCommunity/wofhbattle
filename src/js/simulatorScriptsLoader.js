
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
	calledRun = false;//___hack to correct this issue: https://github.com/emscripten-core/emscripten/issues/10785
	var mainScript = window.ge.scriptPrefix + selectMainScript() + "?v=" + window.ge.version;
	yepnope({ load: mainScript });
}

function load(){
    "use strict";

    var v = "?v=" + window.ge.version;

    for(var i in scriptsForCheck){
        scriptsForCheck[i] = window.ge.scriptPrefix + scriptsForCheck[i] + v;
    }

    for(var j in toolsScripts){
        toolsScripts[j] = window.ge.scriptPrefix + toolsScripts[j] + v;
    }

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