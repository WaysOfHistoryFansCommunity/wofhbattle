
var EnvTester = {
    checkAll: function() {
        "use strict";
        if (this.isCanvasSupported() && this.isWebGLSupported() && this.isWasmSupported()) {
            return true;
        }
        else {
            return false;
        }
    },

    notSupportImpl: function(customFunction){
        "use strict";

        var redirectURL = window.ge.urlParams.get("redirect");
        if (redirectURL !== "" && redirectURL !== null){
            console.log("redirect to URL ", decodeURI(redirectURL));
            window.location.href = decodeURI(redirectURL);
        }
        else {
            if (typeof customFunction === 'function') customFunction();
            else throw "Error! customFunction is not a function";
        }

    },
    notEnoughMemory: function(error){
		window.location.href = "errors/noMemory.html";
	},

    customNotSupportImpl: function()
	{
        "use strict";
        console.log("Redirect to error pages");
        if (!EnvTester.isCanvasSupported()) window.document.location.href = "errors/noCanvas.html";
        if (!EnvTester.isWebGLSupported()) window.document.location.href = "errors/noWebgl.html";
        if (!EnvTester.isWasmSupported()) window.document.location.href = "errors/noWasm.html";
        if (EnvTester.isEdge()) window.document.location.href = "errors/edge.html";
    },

    isCanvasSupported: function()
	{
        "use strict";
        var canvas = document.createElement('canvas');
        var isSupported = "getContext" in canvas;

        console.log("Canvas supported: ", isSupported);
        return isSupported;
    },

    isWasmSupported: function()
	{
        "use strict";
        return window.hasOwnProperty("WebAssembly");
    },

    isEdge: function()
	{
        "use strict";
        return window.navigator.userAgent.indexOf("Edge") > -1;
    },

    isWebGLSupported: function(){
        "use strict";
        var canvas = document.createElement('canvas');

        var webGLSupport = false;
        var eWebGLSupport = false;

        try {
            webGLSupport = !!canvas.getContext('webgl');
        }
        catch(e){
        }

        try {
            eWebGLSupport = !!canvas.getContext('experimental-webgl');
        }
        catch(e){
        }

        var isSupported = webGLSupport || eWebGLSupport;

        console.log("WebGL supported: ", isSupported);
        return isSupported;
    }
};