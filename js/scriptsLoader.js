
var scriptsForCheck = [
    "js/exceptionInterceptor.js",
    "js/envTester.js"
];

var toolsScripts = [
    "js/jszip.min.js",
    "js/HttpReqHelper.js",
    "js/WebSockHelper.js",
    "js/touchHook.js"
];

var mainScript = "js/engine.js";

function recalcScriptUrl(baseUrl){
    const v = "?v=" + window.ge.version;
    return window.ge.scriptPrefix + baseUrl + v;
}

function selectMainScript()
{
	return "js/engine.js";
}

function load(){
    "use strict";

    for(var i in scriptsForCheck){
        scriptsForCheck[i] = recalcScriptUrl(scriptsForCheck[i]);
    }

    for(var j in toolsScripts){
        toolsScripts[j] = recalcScriptUrl(toolsScripts[j]);
    }

    yepnope({
        load: scriptsForCheck,

        complete: function () {
            "use strict";
            if (EnvTester.checkAll()){
                console.log("All checks passed");
                yepnope({
                    load: toolsScripts,

                    complete: function()
					{
						mainScript = selectMainScript();
						mainScript = recalcScriptUrl(mainScript);
                        yepnope({ load: mainScript });
                    }
                });
            }
            else{
                EnvTester.notSupportImpl(EnvTester.customNotSupportImpl);
            }
        }

    });

}