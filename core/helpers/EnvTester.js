class EnvTester {
    checkAll()
    {
        if (this.isCanvasSupported() && this.isWebGLSupported() && this.isWasmSupported()) 
        {
            return true;
        }
        else {
            return false;
        }
    }

    notSupportImpl() 
    {
        /*
        var redirectURL = window.ge.urlParams.get("redirect");
        if (redirectURL !== "" && redirectURL !== null){
            console.log("redirect to URL ", decodeURI(redirectURL));
            window.location.href = decodeURI(redirectURL);
        }
        else {
            if (typeof customFunction === 'function') customFunction();
            else throw "Error! customFunction is not a function";
        }*/
    }

    isCanvasSupported ()
	{
        let canvas = document.createElement('canvas');
        let isSupported = "getContext" in canvas;

        console.log("Canvas supported: ", isSupported);
        return isSupported;
    }

    isWasmSupported ()
	{
        return window.hasOwnProperty("WebAssembly");
    }

    isWebGLSupported ()
    {
        //TODO ПЕРЕПИСАТЬ ЭТО НОРМАЛЬНО
        let canvas = document.createElement('canvas');

        let webGLSupport = false;
        let eWebGLSupport = false;

        try 
        {
            webGLSupport = !!canvas.getContext('webgl');
        }
        catch(e)
        {
            
        }

        try 
        {
            eWebGLSupport = !!canvas.getContext('experimental-webgl');
        }
        catch(e)
        {
        }

        let isSupported = webGLSupport || eWebGLSupport;

        console.log("WebGL supported: ", isSupported);
        return isSupported;
    }
};