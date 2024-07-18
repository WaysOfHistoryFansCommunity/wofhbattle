var Module = typeof Module != "undefined" ? Module : {};
var Module = {
    canvas: document.getElementById("game"),
    locateFile: function (file) 
    {
        if (file === "engine.wasm") return window.ge.scriptPrefix + "js/engine.wasm?" + window.ge.version;
        if (file === "GeWebLauncher.wasm") return window.ge.scriptPrefix + "js/platform/GeWebLauncher.wasm?" + window.ge.version;
        return file;
    },
    arguments: [],
};

console.log(Module);

if (window.ge.httpReqHelper === undefined) window.ge.httpReqHelper = new HttpReqHelper();
window.ge.r_parsingTextures = [];
window.ge.fonts = [];
console.log(window.ge.namedConst.extPlat);
Module["arguments"].push(window.ge.namedConst.extPlat);
console.log(window.ge.namedConst.extAcc);
Module["arguments"].push(window.ge.namedConst.extAcc);
console.log(window.ge.namedConst.extSig);
Module["arguments"].push(btoa(window.ge.namedConst.extSig));
var moduleOverrides = Object.assign({}, Module);
var arguments_ = [];
var thisProgram = "./this.program";
var quit_ = (status, toThrow) => {
    throw toThrow;
};
var ENVIRONMENT_IS_WEB = typeof window == "object";
var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
var scriptDirectory = "";
function locateFile(path) 
{
    if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
    }
    return scriptDirectory + path;
}

var read_, readAsync, readBinary, setWindowTitle;
function logExceptionOnExit(e) 
{
    if (e instanceof ExitStatus) return;
    let toLog = e;
    console.warn("exiting due to exception: " + toLog);
}

    scriptDirectory = __dirname + "/";

    console.log(scriptDirectory);
{
    read_ = (url) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET",scriptDirectory + url, false);
        xhr.send(null);
        return xhr.responseText;
    };
    if (ENVIRONMENT_IS_WORKER) {
        readBinary = (url) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET",scriptDirectory + url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response);
        };
    }
    readAsync = (url, onload, onerror) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET",scriptDirectory + url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = () => {
            if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
                onload(xhr.response);
                return;
            }
            onerror();
        };
        xhr.onerror = onerror;
        xhr.send(null);
    };
}
setWindowTitle = (title) => (document.title = title);

var out = console.log.bind(console);
var err = console.warn.bind(console);
Object.assign(Module, moduleOverrides);
moduleOverrides = null;
if (Module["arguments"]) arguments_ = Module["arguments"];
if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
if (Module["quit"]) quit_ = Module["quit"];
var wasmBinary;
if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
var noExitRuntime = Module["noExitRuntime"] || false;
if (typeof WebAssembly != "object") 
{
    abort("no native wasm support detected");
}

var wasmMemory;
var ABORT = false;
var EXITSTATUS;
function assert(condition, text) 
{
    if (!condition) {
        abort(text);
    }
}

var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;
function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) 
{
    var endIdx = idx + maxBytesToRead;
    var endPtr = idx;
    while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
    if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
    }
    var str = "";
    while (idx < endPtr) 
    {
        var u0 = heapOrArray[idx++];
        if (!(u0 & 128))
        {
            str += String.fromCharCode(u0);
            continue;
        }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 224) == 192) 
        {
            str += String.fromCharCode(((u0 & 31) << 6) | u1);
            continue;
        }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 240) == 224) 
        {
            u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        }
        else 
        {
            u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
        if (u0 < 65536) {
            str += String.fromCharCode(u0);
        } else {
            var ch = u0 - 65536;
            str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
        }
    }
    return str;
}
function UTF8ToString(ptr, maxBytesToRead) 
{
    return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
}

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) 
{
    if (!(maxBytesToWrite > 0)) return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i = 0; i < str.length; ++i) 
    {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) 
        {
            var u1 = str.charCodeAt(++i);
            u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
        }
        if(u <= 127) 
        {
            if (outIdx >= endIdx) break;
            heap[outIdx++] = u;
        } 
        else if(u <= 2047) 
        {
            if (outIdx + 1 >= endIdx) break;
            heap[outIdx++] = 192 | (u >> 6);
            heap[outIdx++] = 128 | (u & 63);
        } 
        else if(u <= 65535) 
        {
            if (outIdx + 2 >= endIdx) break;
            heap[outIdx++] = 224 | (u >> 12);
            heap[outIdx++] = 128 | ((u >> 6) & 63);
            heap[outIdx++] = 128 | (u & 63);
        } 
        else 
        {
            if (outIdx + 3 >= endIdx) break;
            heap[outIdx++] = 240 | (u >> 18);
            heap[outIdx++] = 128 | ((u >> 12) & 63);
            heap[outIdx++] = 128 | ((u >> 6) & 63);
            heap[outIdx++] = 128 | (u & 63);
        }
    }
    heap[outIdx] = 0;
    return outIdx - startIdx;
}
function stringToUTF8(str, outPtr, maxBytesToWrite) {
    return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}
function lengthBytesUTF8(str) {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i);
        if (c <= 127) {
            len++;
        } else if (c <= 2047) {
            len += 2;
        } else if (c >= 55296 && c <= 57343) {
            len += 4;
            ++i;
        } else {
            len += 3;
        }
    }
    return len;
}
var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
function updateGlobalBufferAndViews(buf) {
    buffer = buf;
    Module["HEAP8"] = HEAP8 = new Int8Array(buf);
    Module["HEAP16"] = HEAP16 = new Int16Array(buf);
    Module["HEAP32"] = HEAP32 = new Int32Array(buf);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
    Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
    Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
    Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
    Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
}





var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 33554432;
var wasmTable;
var __ATPRERUN__ = [];
var __ATINIT__ = [];
var __ATMAIN__ = [];
var __ATEXIT__ = [];
var __ATPOSTRUN__ = [];
var runtimeInitialized = false;
var runtimeExited = false;
var runtimeKeepaliveCounter = 0;
function keepRuntimeAlive() {
    return noExitRuntime || runtimeKeepaliveCounter > 0;
}
function preRun() 
{
    if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
            addOnPreRun(Module["preRun"].shift());
        }
    }
    callRuntimeCallbacks(__ATPRERUN__);
}
function initRuntime() 
{
    runtimeInitialized = true;
    callRuntimeCallbacks(__ATINIT__);
}
function preMain() 
{
    callRuntimeCallbacks(__ATMAIN__);
}
function exitRuntime() 
{
    ___funcs_on_exit();
    callRuntimeCallbacks(__ATEXIT__);
    flush_NO_FILESYSTEM();
    runtimeExited = true;
}
function postRun() 
{
    if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
            addOnPostRun(Module["postRun"].shift());
        }
    }
    callRuntimeCallbacks(__ATPOSTRUN__);
}
function addOnPreRun(cb) 
{
    __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) 
{
    __ATINIT__.unshift(cb);
}

function addOnPostRun(cb) 
{
    __ATPOSTRUN__.unshift(cb);
}

var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null;
function addRunDependency(id) 
{
    runDependencies++;
    if (Module["monitorRunDependencies"]) 
    {
        Module["monitorRunDependencies"](runDependencies);
    }
}
function removeRunDependency(id) 
{
    runDependencies--;
    if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
    }
    if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null;
        }
        if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback();
        }
    }
}
function abort(what) 
{
    console.log("ABORT");
    {
        if (Module["onAbort"]) {
            Module["onAbort"](what);
        }
    }
    what = "Aborted(" + what + ")";
    console.warn(what);
    ABORT = true;
    EXITSTATUS = 1;
    what += ". Build with -sASSERTIONS for more info.";
    ___trap();
}
var dataURIPrefix = "data:application/octet-stream;base64,";
function isDataURI(filename) {
    return filename.startsWith(dataURIPrefix);
}
function isFileURI(filename) {
    return filename.startsWith("file://");
}
var wasmBinaryFile;
wasmBinaryFile = "ReplaySimulator.wasm";
if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
}
function getBinary(file) 
{
    try {
        if (file == wasmBinaryFile && wasmBinary) {
            return new Uint8Array(wasmBinary);
        }
        if (readBinary) {
            return readBinary(file);
        }
        throw "both async and sync fetching of the wasm failed";
    } catch (err) {
        abort(err);
    }
}

function getBinaryPromise() 
{
    console.log("TEST BINMR :3");
    if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) 
    {
        if (typeof fetch == "function" && !isFileURI(wasmBinaryFile)) 
        {
            return fetch(wasmBinaryFile, { credentials: "same-origin" })
                .then(function (response) {
                    if (!response["ok"]) {
                        throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
                    }
                    return response["arrayBuffer"]();
                })
                .catch(function () {
                    return getBinary(wasmBinaryFile);
                });
        } 
        else 
        {
            if (readAsync) 
            {
                return new Promise(function (resolve, reject) {
                    readAsync(
                        wasmBinaryFile,
                        function (response) {
                            resolve(new Uint8Array(response));
                        },
                        reject
                    );
                });
            }
        }
    }
    return Promise.resolve().then(function () {
        return getBinary(wasmBinaryFile);
    });
}

function createWasm() 
{
    console.log("TEST WASM :3");
    var info = { a: asmLibraryArg };
    function receiveInstance(instance, module) 
    {
        var exports = instance.exports;
        Module["asm"] = exports;
        wasmMemory = Module["asm"]["N"];
        updateGlobalBufferAndViews(wasmMemory.buffer);
        wasmTable = Module["asm"]["V"];
        addOnInit(Module["asm"]["O"]);
        removeRunDependency("wasm-instantiate");
    }

    addRunDependency("wasm-instantiate");
    function receiveInstantiationResult(result) 
    {
        receiveInstance(result["instance"]);
    }

    function instantiateArrayBuffer(receiver) 
    {
        return getBinaryPromise()
            .then(function (binary) {
                return WebAssembly.instantiate(binary, info);
            })
            .then(function (instance) {
                return instance;
            })
            .then(receiver, function (reason) {
                console.warn("failed to asynchronously prepare wasm: " + reason);
                abort(reason);
            });
    }

    function instantiateAsync() 
    {
        if (!wasmBinary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && !ENVIRONMENT_IS_NODE && typeof fetch == "function") {
            return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function (response) {
                var result = WebAssembly.instantiateStreaming(response, info);
                return result.then(receiveInstantiationResult, function (reason) {
                    console.warn("wasm streaming compile failed: " + reason);
                    console.warn("falling back to ArrayBuffer instantiation");
                    return instantiateArrayBuffer(receiveInstantiationResult);
                });
            });
        } else {
            return instantiateArrayBuffer(receiveInstantiationResult);
        }
    }
    if (Module["instantiateWasm"])
    {
        try 
        {
            var exports = Module["instantiateWasm"](info, receiveInstance);
            return exports;
        } 
        catch (e) 
        {
            console.warn("Module.instantiateWasm callback failed with error: " + e);
            return false;
        }
    }
    instantiateAsync();
    return {};
}
var ASM_CONSTS = {
    42496: ($0, $1, $2, $3, $4) => {
        console.error(UTF8ToString($0) + " " + UTF8ToString($1) + ":" + $2 + ":" + UTF8ToString($3) + " with " + UTF8ToString($4));
    },
};

function ExitStatus(status) 
{
    this.name = "ExitStatus";
    this.message = "Program terminated with exit(" + status + ")";
    this.status = status;
}

function callRuntimeCallbacks(callbacks) 
{
    while (callbacks.length > 0) {
        callbacks.shift()(Module);
    }
}
function _Helper_Persistent_get(fileNamePtr, fileNameSize, valPtr, valSize) 
{
    var fileName = UTF8ToString(fileNamePtr, fileNameSize);
    var value = localStorage.getItem(fileName);
    if (value !== null) {
        console.assert(value.toString());
        stringToUTF8(value.toString(), valPtr, valSize);
    } 
    else stringToUTF8("", valPtr, valSize);
}

function _Helper_Persistent_getSize(fileNamePtr, fileNameSize) 
{
    var fileName = UTF8ToString(fileNamePtr, fileNameSize);
    var value = localStorage.getItem(fileName);
    if (value !== null) return value.length + 1;
    return 3;
}

function _Helper_Persistent_store(fileNamePtr, fileNameSize, valPtr, valSize) 
{
    var fileName = UTF8ToString(fileNamePtr, fileNameSize);
    var value = UTF8ToString(valPtr, valSize);
    localStorage.setItem(fileName, value);
    window.ge.httpReqHelper.cacheFile(fileName, valPtr, valSize);
}

function _Helper_Requester_getData(handle, dataPtr, sizePtr) 
{
    window.ge.httpReqHelper.getData(handle, dataPtr, sizePtr);
}

function _Helper_Requester_getProgress(handle) 
{
    return window.ge.httpReqHelper.getProgress(handle);
}

function _Helper_Requester_getStatus(handle) 
{
    return window.ge.httpReqHelper.getStatus(handle);
}

function _Helper_Requester_isDone(handle) 
{
    return window.ge.httpReqHelper.isDone(handle);
}

function _Helper_Requester_isSuccess(handle) 
{
    return window.ge.httpReqHelper.isSuccess(handle);
}

function _Helper_Requester_makeRequest(urlPtr, urlSize, postPtr, postSize, contentTypePtr, contentTypeSize) 
{
    var url = UTF8ToString(urlPtr, urlSize);
    var post = UTF8ToString(postPtr, postSize);
    var contentType = UTF8ToString(contentTypePtr, contentTypeSize);
    return window.ge.httpReqHelper.makeRequest(url, post, contentType);
}

function _Helper_Requester_releaseRequester(handle) 
{
    window.ge.httpReqHelper.releaseRequester(handle);
}

function _Helper_getHost(pointer, size) 
{
    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf("/")) + "/";
    console.assert(dir);
    stringToUTF8(dir, pointer, size);
}

function _Helper_getNamedConst(pointer, size, constName, nameSize) 
{
    const name = UTF8ToString(constName, nameSize);
    const val = window.ge.namedConst[name];
    const result = val === undefined || val === null ? "" : val;
    stringToUTF8(result.toString(), pointer, size);
}

function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {}
function getShiftFromSize(size) 
{
    switch (size) {
        case 1:
            return 0;
        case 2:
            return 1;
        case 4:
            return 2;
        case 8:
            return 3;
        default:
            throw new TypeError("Unknown type size: " + size);
    }
}
function embind_init_charCodes() 
{
    var codes = new Array(256);
    for (var i = 0; i < 256; ++i) {
        codes[i] = String.fromCharCode(i);
    }
    embind_charCodes = codes;
}

var embind_charCodes = undefined;
function readLatin1String(ptr) 
{
    var ret = "";
    var c = ptr;
    while (HEAPU8[c]) {
        ret += embind_charCodes[HEAPU8[c++]];
    }
    return ret;
}

var awaitingDependencies = {};
var registeredTypes = {};
var typeDependencies = {};
var char_0 = 48;
var char_9 = 57;
function makeLegalFunctionName(name) 
{
    if (undefined === name) {
        return "_unknown";
    }
    name = name.replace(/[^a-zA-Z0-9_]/g, "$");
    var f = name.charCodeAt(0);
    if (f >= char_0 && f <= char_9) {
        return "_" + name;
    }
    return name;
}

function createNamedFunction(name, body) 
{
    name = makeLegalFunctionName(name);
    return new Function("body", "return function " + name + "() {\n" + '    "use strict";' + "    return body.apply(this, arguments);\n" + "};\n")(body);
}

function extendError(baseErrorType, errorName) 
{
    var errorClass = createNamedFunction(errorName, function (message) 
    {
        this.name = errorName;
        this.message = message;
        var stack = new Error(message).stack;
        if (stack !== undefined) {
            this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
        }
    });

    errorClass.prototype = Object.create(baseErrorType.prototype);
    errorClass.prototype.constructor = errorClass;
    errorClass.prototype.toString = function () {
        if (this.message === undefined) 
        {
            return this.name;
        } 
        else 
        {
            return this.name + ": " + this.message;
        }
    };
    return errorClass;
}

var BindingError = undefined;
function throwBindingError(message) {
    throw new BindingError(message);
}

var InternalError = undefined;
function registerType(rawType, registeredInstance, options = {}) {
    if (!("argPackAdvance" in registeredInstance)) {
        throw new TypeError("registerType registeredInstance requires argPackAdvance");
    }
    var name = registeredInstance.name;
    if (!rawType) {
        throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
    }
    if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
            return;
        } else {
            throwBindingError("Cannot register type '" + name + "' twice");
        }
    }
    registeredTypes[rawType] = registeredInstance;
    delete typeDependencies[rawType];
    if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach((cb) => cb());
    }
}

function __embind_register_bool(rawType, name, size, trueValue, falseValue) 
{
    var shift = getShiftFromSize(size);
    name = readLatin1String(name);
    registerType(rawType, 
    {
        name: name,
        fromWireType: function (wt) 
        {
            return !!wt;
        },
        toWireType: function (destructors, o) 
        {
            return o ? trueValue : falseValue;
        },
        argPackAdvance: 8,
        readValueFromPointer: function (pointer) 
        {
            var heap;
            if (size === 1) 
            {
                heap = HEAP8;
            } 
            else if (size === 2) 
            {
                heap = HEAP16;
            } 
            else if (size === 4) 
            {
                heap = HEAP32;
            } 
            else 
            {
                throw new TypeError("Unknown boolean type size: " + name);
            }
            return this["fromWireType"](heap[pointer >> shift]);
        },
        destructorFunction: null,
    });
}

var emval_free_list = [];
var emval_handle_array = [{}, { value: undefined }, { value: null }, { value: true }, { value: false }];
function __emval_decref(handle) 
{
    if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
        emval_handle_array[handle] = undefined;
        emval_free_list.push(handle);
    }
}

function count_emval_handles()
{
    var count = 0;
    for (var i = 5; i < emval_handle_array.length; ++i) {
        if (emval_handle_array[i] !== undefined) {
            ++count;
        }
    }
    return count;
}

function get_first_emval()
{
    for (var i = 5; i < emval_handle_array.length; ++i) {
        if (emval_handle_array[i] !== undefined) {
            return emval_handle_array[i];
        }
    }
    return null;
}

function init_emval()
{
    Module["count_emval_handles"] = count_emval_handles;
    Module["get_first_emval"] = get_first_emval;
}

var Emval = {
    toValue: (handle) => {
        if (!handle) {
            throwBindingError("Cannot use deleted val. handle = " + handle);
        }
        return emval_handle_array[handle].value;
    },
    toHandle: (value) => {
        switch (value) {
            case undefined:
                return 1;
            case null:
                return 2;
            case true:
                return 3;
            case false:
                return 4;
            default: {
                var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
                emval_handle_array[handle] = { refcount: 1, value: value };
                return handle;
            }
        }
    },
};

function simpleReadValueFromPointer(pointer)
{
    return this["fromWireType"](HEAP32[pointer >> 2]);
}

function __embind_register_emval(rawType, name)
{
    name = readLatin1String(name);
    registerType(rawType, {
        name: name,
        fromWireType: function (handle) {
            var rv = Emval.toValue(handle);
            __emval_decref(handle);
            return rv;
        },
        toWireType: function (destructors, value) {
            return Emval.toHandle(value);
        },
        argPackAdvance: 8,
        readValueFromPointer: simpleReadValueFromPointer,
        destructorFunction: null,
    });
}

function floatReadValueFromPointer(name, shift)
{
    switch (shift) {
        case 2:
            return function (pointer) {
                return this["fromWireType"](HEAPF32[pointer >> 2]);
            };
        case 3:
            return function (pointer) {
                return this["fromWireType"](HEAPF64[pointer >> 3]);
            };
        default:
            throw new TypeError("Unknown float type: " + name);
    }
}

function __embind_register_float(rawType, name, size)
{
    var shift = getShiftFromSize(size);
    name = readLatin1String(name);
    registerType(rawType, {
        name: name,
        fromWireType: function (value) {
            return value;
        },
        toWireType: function (destructors, value) {
            return value;
        },
        argPackAdvance: 8,
        readValueFromPointer: floatReadValueFromPointer(name, shift),
        destructorFunction: null,
    });
}

function integerReadValueFromPointer(name, shift, signed) 
{
    switch (shift)
    {
        case 0:
            return signed
                ? function readS8FromPointer(pointer) {
                      return HEAP8[pointer];
                  }
                : function readU8FromPointer(pointer) {
                      return HEAPU8[pointer];
                  };
        case 1:
            return signed
                ? function readS16FromPointer(pointer) {
                      return HEAP16[pointer >> 1];
                  }
                : function readU16FromPointer(pointer) {
                      return HEAPU16[pointer >> 1];
                  };
        case 2:
            return signed
                ? function readS32FromPointer(pointer) {
                      return HEAP32[pointer >> 2];
                  }
                : function readU32FromPointer(pointer) {
                      return HEAPU32[pointer >> 2];
                  };
        default:
            throw new TypeError("Unknown integer type: " + name);
    }
}

function __embind_register_integer(primitiveType, name, size, minRange, maxRange)
{
    name = readLatin1String(name);
    if (maxRange === -1) {
        maxRange = 4294967295;
    }
    var shift = getShiftFromSize(size);
    var fromWireType = (value) => value;
    if (minRange === 0) {
        var bitshift = 32 - 8 * size;
        fromWireType = (value) => (value << bitshift) >>> bitshift;
    }
    var isUnsignedType = name.includes("unsigned");
    var checkAssertions = (value, toTypeName) => {};
    var toWireType;
    if (isUnsignedType) {
        toWireType = function (destructors, value) {
            checkAssertions(value, this.name);
            return value >>> 0;
        };
    } else {
        toWireType = function (destructors, value) {
            checkAssertions(value, this.name);
            return value;
        };
    }
    registerType(primitiveType, { name: name, fromWireType: fromWireType, toWireType: toWireType, argPackAdvance: 8, readValueFromPointer: integerReadValueFromPointer(name, shift, minRange !== 0), destructorFunction: null });
}

function __embind_register_memory_view(rawType, dataTypeIndex, name)
{
    var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
    var TA = typeMapping[dataTypeIndex];
    function decodeMemoryView(handle) {
        handle = handle >> 2;
        var heap = HEAPU32;
        var size = heap[handle];
        var data = heap[handle + 1];
        return new TA(buffer, data, size);
    }
    name = readLatin1String(name);
    registerType(rawType, { name: name, fromWireType: decodeMemoryView, argPackAdvance: 8, readValueFromPointer: decodeMemoryView }, { ignoreDuplicateRegistrations: true });
}

function __embind_register_std_string(rawType, name) 
{
    name = readLatin1String(name);
    var stdStringIsUTF8 = name === "std::string";
    registerType(rawType, {
        name: name,
        fromWireType: function (value) {
            var length = HEAPU32[value >> 2];
            var payload = value + 4;
            var str;
            if (stdStringIsUTF8) 
            {
                var decodeStartPtr = payload;
                for (var i = 0; i <= length; ++i) 
                {
                    var currentBytePtr = payload + i;
                    if (i == length || HEAPU8[currentBytePtr] == 0) 
                    {
                        var maxRead = currentBytePtr - decodeStartPtr;
                        var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                        if (str === undefined) 
                        {
                            str = stringSegment;
                        } 
                        else 
                        {
                            str += String.fromCharCode(0);
                            str += stringSegment;
                        }
                        decodeStartPtr = currentBytePtr + 1;
                    }
                }
            } else {
                var a = new Array(length);
                for (var i = 0; i < length; ++i) {
                    a[i] = String.fromCharCode(HEAPU8[payload + i]);
                }
                str = a.join("");
            }
            _free(value);
            return str;
        },
        toWireType: function (destructors, value) 
        {
            if (value instanceof ArrayBuffer) 
            {
                value = new Uint8Array(value);
            }

            var length;
            var valueIsOfTypeString = typeof value == "string";
            if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) 
            {
                throwBindingError("Cannot pass non-string to std::string");
            }
            if (stdStringIsUTF8 && valueIsOfTypeString) 
            {
                length = lengthBytesUTF8(value);
            } 
            else 
            {
                length = value.length;
            }
            var base = _malloc(4 + length + 1);
            var ptr = base + 4;
            HEAPU32[base >> 2] = length;
            if (stdStringIsUTF8 && valueIsOfTypeString) 
            {
                stringToUTF8(value, ptr, length + 1);
            } 
            else 
            {
                if (valueIsOfTypeString) 
                {
                    for (var i = 0; i < length; ++i) 
                    {
                        var charCode = value.charCodeAt(i);
                        if (charCode > 255) {
                            _free(ptr);
                            throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
                        }
                        HEAPU8[ptr + i] = charCode;
                    }
                } 
                else 
                {
                    for (var i = 0; i < length; ++i) {
                        HEAPU8[ptr + i] = value[i];
                    }
                }
            }
            if (destructors !== null) {
                destructors.push(_free, base);
            }
            return base;
        },
        argPackAdvance: 8,
        readValueFromPointer: simpleReadValueFromPointer,
        destructorFunction: function (ptr) {
            _free(ptr);
        },
    });
}
var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : undefined;

function UTF16ToString(ptr, maxBytesToRead)
{
    var endPtr = ptr;
    var idx = endPtr >> 1;
    var maxIdx = idx + maxBytesToRead / 2;
    while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
    endPtr = idx << 1;
    if (endPtr - ptr > 32 && UTF16Decoder) return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
    var str = "";
    for (var i = 0; !(i >= maxBytesToRead / 2); ++i) 
    {
        var codeUnit = HEAP16[(ptr + i * 2) >> 1];
        if (codeUnit == 0) break;
        str += String.fromCharCode(codeUnit);
    }
    return str;
}

function stringToUTF16(str, outPtr, maxBytesToWrite)
{
    if (maxBytesToWrite === undefined) 
    {
        maxBytesToWrite = 2147483647;
    }
    if (maxBytesToWrite < 2) return 0;
    maxBytesToWrite -= 2;
    var startPtr = outPtr;
    var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
    for (var i = 0; i < numCharsToWrite; ++i) 
    {
        var codeUnit = str.charCodeAt(i);
        HEAP16[outPtr >> 1] = codeUnit;
        outPtr += 2;
    }
    HEAP16[outPtr >> 1] = 0;
    return outPtr - startPtr;
}

function lengthBytesUTF16(str)
{
    return str.length * 2;
}

function UTF32ToString(ptr, maxBytesToRead)
{
    var i = 0;
    var str = "";
    while (!(i >= maxBytesToRead / 4)) 
    {
        var utf32 = HEAP32[(ptr + i * 4) >> 2];
        if (utf32 == 0) break;
        ++i;

        if (utf32 >= 65536) 
        {
            var ch = utf32 - 65536;
            str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
        } 
        else 
        {
            str += String.fromCharCode(utf32);
        }
    }
    return str;
}

function stringToUTF32(str, outPtr, maxBytesToWrite)
{
    if (maxBytesToWrite === undefined) 
    {
        maxBytesToWrite = 2147483647;
    }
    if (maxBytesToWrite < 4) return 0;
    var startPtr = outPtr;
    var endPtr = startPtr + maxBytesToWrite - 4;
    for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 55296 && codeUnit <= 57343) {
            var trailSurrogate = str.charCodeAt(++i);
            codeUnit = (65536 + ((codeUnit & 1023) << 10)) | (trailSurrogate & 1023);
        }
        HEAP32[outPtr >> 2] = codeUnit;
        outPtr += 4;
        if (outPtr + 4 > endPtr) break;
    }
    HEAP32[outPtr >> 2] = 0;
    return outPtr - startPtr;
}

function lengthBytesUTF32(str) 
{
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
        len += 4;
    }
    return len;
}

function __embind_register_std_wstring(rawType, charSize, name) 
{
    name = readLatin1String(name);
    var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
    if (charSize === 2) 
    {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;
        getHeap = () => HEAPU16;
        shift = 1;
    } 
    else if (charSize === 4) 
    {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;
        getHeap = () => HEAPU32;
        shift = 2;
    }
    registerType(rawType, 
    {
        name: name,
        fromWireType: function (value) 
        {
            var length = HEAPU32[value >> 2];
            var HEAP = getHeap();
            var str;
            var decodeStartPtr = value + 4;
            for (var i = 0; i <= length; ++i) 
            {
                var currentBytePtr = value + 4 + i * charSize;
                if (i == length || HEAP[currentBytePtr >> shift] == 0) 
                {
                    var maxReadBytes = currentBytePtr - decodeStartPtr;
                    var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
                    if (str === undefined) 
                    {
                        str = stringSegment;
                    } 
                    else 
                    {
                        str += String.fromCharCode(0);
                        str += stringSegment;
                    }
                    decodeStartPtr = currentBytePtr + charSize;
                }
            }
            _free(value);
            return str;
        },
        toWireType: function (destructors, value) 
        {
            if (!(typeof value == "string")) {
                throwBindingError("Cannot pass non-string to C++ string type " + name);
            }
            var length = lengthBytesUTF(value);
            var ptr = _malloc(4 + length + charSize);
            HEAPU32[ptr >> 2] = length >> shift;
            encodeString(value, ptr + 4, length + charSize);
            if (destructors !== null) {
                destructors.push(_free, ptr);
            }
            return ptr;
        },
        argPackAdvance: 8,
        readValueFromPointer: simpleReadValueFromPointer,
        destructorFunction: function (ptr) {
            _free(ptr);
        },
    });
}

function __embind_register_void(rawType, name) 
{
    name = readLatin1String(name);
    registerType(rawType, {
        isVoid: true,
        name: name,
        argPackAdvance: 0,
        fromWireType: function () {
            return undefined;
        },
        toWireType: function (destructors, o) {
            return undefined;
        },
    });
}

var nowIsMonotonic = true;
function __emscripten_get_now_is_monotonic() 
{
    return nowIsMonotonic;
}

function _abort() 
{
    abort("");
}

var readAsmConstArgsArray = [];
function readAsmConstArgs(sigPtr, buf) 
{
    readAsmConstArgsArray.length = 0;
    var ch;
    buf >>= 2;
    while ((ch = HEAPU8[sigPtr++])) {
        buf += (ch != 105) & buf;
        readAsmConstArgsArray.push(ch == 105 ? HEAP32[buf] : HEAPF64[buf++ >> 1]);
        ++buf;
    }
    return readAsmConstArgsArray;
}

function _emscripten_asm_const_int(code, sigPtr, argbuf) 
{
    var args = readAsmConstArgs(sigPtr, argbuf);
    return ASM_CONSTS[code].apply(null, args);
}

function runtimeKeepalivePush() 
{
    runtimeKeepaliveCounter += 1;
}

function _emscripten_set_main_loop_timing(mode, value) 
{
    Browser.mainLoop.timingMode = mode;
    Browser.mainLoop.timingValue = value;
    if (!Browser.mainLoop.func) 
    {
        return 1;
    }
    if (!Browser.mainLoop.running) 
    {
        runtimeKeepalivePush();
        Browser.mainLoop.running = true;
    }
    if (mode == 0) 
    {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
            var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
            setTimeout(Browser.mainLoop.runner, timeUntilNextTick);
        };
        Browser.mainLoop.method = "timeout";
    } 
    else if (mode == 1) 
    {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
            Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = "rAF";
    } 
    else if (mode == 2) 
    {
        if (typeof setImmediate == "undefined") {
            var setImmediates = [];
            var emscriptenMainLoopMessageId = "setimmediate";
            var Browser_setImmediate_messageHandler = (event) => {
                if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                    event.stopPropagation();
                    setImmediates.shift()();
                }
            };
            addEventListener("message", Browser_setImmediate_messageHandler, true);
            setImmediate = function Browser_emulated_setImmediate(func) {
                setImmediates.push(func);
                if (ENVIRONMENT_IS_WORKER) {
                    if (Module["setImmediates"] === undefined) Module["setImmediates"] = [];
                    Module["setImmediates"].push(func);
                    postMessage({ target: emscriptenMainLoopMessageId });
                } else postMessage(emscriptenMainLoopMessageId, "*");
            };
        }
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
            setImmediate(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = "immediate";
    }
    return 0;
}
var _emscripten_get_now;
if (ENVIRONMENT_IS_NODE) 
{
    _emscripten_get_now = () => {
        var t = process["hrtime"]();
        return t[0] * 1e3 + t[1] / 1e6;
    };
} 
else _emscripten_get_now = () => performance.now();

var SYSCALLS = 
{
    varargs: undefined,
    get: function () {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2];
        return ret;
    },
    getStr: function (ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
    },
};

function _proc_exit(code) 
{
    EXITSTATUS = code;
    if (!keepRuntimeAlive()) {
        if (Module["onExit"]) Module["onExit"](code);
        ABORT = true;
    }
    quit_(code, new ExitStatus(code));
}

function exitJS(status, implicit) 
{
    EXITSTATUS = status;
    if (!keepRuntimeAlive())
    {
        exitRuntime();
    }
    _proc_exit(status);
}

var _exit = exitJS;
function handleException(e) 
{
    if (e instanceof ExitStatus || e == "unwind") 
    {
        return EXITSTATUS;
    }
    quit_(1, e);
}

function maybeExit() 
{
    if (!keepRuntimeAlive()) 
    {
        try 
        {
            _exit(EXITSTATUS);
        } 
        catch (e) 
        {
            handleException(e);
        }
    }
}

function runtimeKeepalivePop() 
{
    runtimeKeepaliveCounter -= 1;
}

function setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) 
{
    assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
    Browser.mainLoop.func = browserIterationFunc;
    Browser.mainLoop.arg = arg;
    var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
    function checkIsRunning() 
    {
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) 
        {
            runtimeKeepalivePop();
            maybeExit();
            return false;
        }
        return true;
    }
    Browser.mainLoop.running = false;
    Browser.mainLoop.runner = function Browser_mainLoop_runner() 
    {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
            var start = Date.now();
            var blocker = Browser.mainLoop.queue.shift();
            blocker.func(blocker.arg);
            if (Browser.mainLoop.remainingBlockers) {
                var remaining = Browser.mainLoop.remainingBlockers;
                var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
                if (blocker.counted) {
                    Browser.mainLoop.remainingBlockers = next;
                } else {
                    next = next + 0.5;
                    Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9;
                }
            }
            out('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + " ms");
            Browser.mainLoop.updateStatus();
            if (!checkIsRunning()) return;
            setTimeout(Browser.mainLoop.runner, 0);
            return;
        }
        if (!checkIsRunning()) return;
        Browser.mainLoop.currentFrameNumber = (Browser.mainLoop.currentFrameNumber + 1) | 0;
        if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) 
        {
            Browser.mainLoop.scheduler();
            return;
        } 
        else if (Browser.mainLoop.timingMode == 0) 
        {
            Browser.mainLoop.tickStartTime = _emscripten_get_now();
        }
        Browser.mainLoop.runIter(browserIterationFunc);
        if (!checkIsRunning()) return;
        if (typeof SDL == "object" && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
        Browser.mainLoop.scheduler();
    };
    if (!noSetTiming)
    {
        if (fps && fps > 0) _emscripten_set_main_loop_timing(0, 1e3 / fps);
        else _emscripten_set_main_loop_timing(1, 1);
        Browser.mainLoop.scheduler();
    }
    if (simulateInfiniteLoop) {
        throw "unwind";
    }
}

function callUserCallback(func)
{
    if (runtimeExited || ABORT) {
        return;
    }
    try {
        func();
        maybeExit();
    } catch (e) {
        handleException(e);
    }
}

function safeSetTimeout(func, timeout)
{
    runtimeKeepalivePush();
    return setTimeout(function () 
    {
        runtimeKeepalivePop();
        callUserCallback(func);
    }, timeout);
}

function warnOnce(text) 
{
    if (!warnOnce.shown) warnOnce.shown = {};
    if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = "warning: " + text;
        console.warn(text);
    }
}

var Browser = {
    mainLoop: {
        running: false,
        scheduler: null,
        method: "",
        currentlyRunningMainloop: 0,
        func: null,
        arg: 0,
        timingMode: 0,
        timingValue: 0,
        currentFrameNumber: 0,
        queue: [],
        pause: function () {
            Browser.mainLoop.scheduler = null;
            Browser.mainLoop.currentlyRunningMainloop++;
        },
        resume: function () {
            Browser.mainLoop.currentlyRunningMainloop++;
            var timingMode = Browser.mainLoop.timingMode;
            var timingValue = Browser.mainLoop.timingValue;
            var func = Browser.mainLoop.func;
            Browser.mainLoop.func = null;
            setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
            _emscripten_set_main_loop_timing(timingMode, timingValue);
            Browser.mainLoop.scheduler();
        },
        updateStatus: function () {
            if (Module["setStatus"]) {
                var message = Module["statusMessage"] || "Please wait...";
                var remaining = Browser.mainLoop.remainingBlockers;
                var expected = Browser.mainLoop.expectedBlockers;
                if (remaining) {
                    if (remaining < expected) {
                        Module["setStatus"](message + " (" + (expected - remaining) + "/" + expected + ")");
                    } else {
                        Module["setStatus"](message);
                    }
                } else {
                    Module["setStatus"]("");
                }
            }
        },
        runIter: function (func) {
            if (ABORT) return;
            if (Module["preMainLoop"]) {
                var preRet = Module["preMainLoop"]();
                if (preRet === false) {
                    return;
                }
            }
            callUserCallback(func);
            if (Module["postMainLoop"]) Module["postMainLoop"]();
        },
    },
    isFullscreen: false,
    pointerLock: false,
    moduleContextCreatedCallbacks: [],
    workers: [],
    init: function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = [];
        if (Browser.initted) return;
        Browser.initted = true;
        try {
            new Blob();
            Browser.hasBlobConstructor = true;
        } catch (e) {
            Browser.hasBlobConstructor = false;
            console.warn("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : !Browser.hasBlobConstructor ? console.warn("warning: no BlobBuilder") : null;
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject == "undefined") {
            console.warn("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
            Module.noImageDecoding = true;
        }
        var imagePlugin = {};
        imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
            return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
            var b = null;
            if (Browser.hasBlobConstructor) {
                try {
                    b = new Blob([byteArray], { type: Browser.getMimetype(name) });
                    if (b.size !== byteArray.length) {
                        b = new Blob([new Uint8Array(byteArray).buffer], { type: Browser.getMimetype(name) });
                    }
                } catch (e) {
                    warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder");
                }
            }
            if (!b) {
                var bb = new Browser.BlobBuilder();
                bb.append(new Uint8Array(byteArray).buffer);
                b = bb.getBlob();
            }
            var url = Browser.URLObject.createObjectURL(b);
            var img = new Image();
            img.onload = () => {
                assert(img.complete, "Image " + name + " could not be decoded");
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                preloadedImages[name] = canvas;
                Browser.URLObject.revokeObjectURL(url);
                if (onload) onload(byteArray);
            };
            img.onerror = (event) => {
                out("Image " + url + " could not be decoded");
                if (onerror) onerror();
            };
            img.src = url;
        };
        Module["preloadPlugins"].push(imagePlugin);
        var audioPlugin = {};
        audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
            return !Module.noAudioDecoding && name.substr(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 };
        };
        audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
            var done = false;
            function finish(audio) {
                if (done) return;
                done = true;
                preloadedAudios[name] = audio;
                if (onload) onload(byteArray);
            }
            function fail() {
                if (done) return;
                done = true;
                preloadedAudios[name] = new Audio();
                if (onerror) onerror();
            }
            if (Browser.hasBlobConstructor) {
                try {
                    var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
                } catch (e) {
                    return fail();
                }
                var url = Browser.URLObject.createObjectURL(b);
                var audio = new Audio();
                audio.addEventListener("canplaythrough", () => finish(audio), false);
                audio.onerror = function audio_onerror(event) {
                    if (done) return;
                    console.warn("warning: browser could not fully decode audio " + name + ", trying slower base64 approach");
                    function encode64(data) {
                        var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                        var PAD = "=";
                        var ret = "";
                        var leftchar = 0;
                        var leftbits = 0;
                        for (var i = 0; i < data.length; i++) {
                            leftchar = (leftchar << 8) | data[i];
                            leftbits += 8;
                            while (leftbits >= 6) {
                                var curr = (leftchar >> (leftbits - 6)) & 63;
                                leftbits -= 6;
                                ret += BASE[curr];
                            }
                        }
                        if (leftbits == 2) {
                            ret += BASE[(leftchar & 3) << 4];
                            ret += PAD + PAD;
                        } else if (leftbits == 4) {
                            ret += BASE[(leftchar & 15) << 2];
                            ret += PAD;
                        }
                        return ret;
                    }
                    audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
                    finish(audio);
                };
                audio.src = url;
                safeSetTimeout(function () {
                    finish(audio);
                }, 1e4);
            } else {
                return fail();
            }
        };
        Module["preloadPlugins"].push(audioPlugin);
        function pointerLockChange() {
            Browser.pointerLock =
                document["pointerLockElement"] === Module["canvas"] ||
                document["mozPointerLockElement"] === Module["canvas"] ||
                document["webkitPointerLockElement"] === Module["canvas"] ||
                document["msPointerLockElement"] === Module["canvas"];
        }
        var canvas = Module["canvas"];
        if (canvas) {
            canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || (() => {});
            canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || (() => {});
            canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
            document.addEventListener("pointerlockchange", pointerLockChange, false);
            document.addEventListener("mozpointerlockchange", pointerLockChange, false);
            document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
            document.addEventListener("mspointerlockchange", pointerLockChange, false);
            if (Module["elementPointerLock"]) {
                canvas.addEventListener(
                    "click",
                    (ev) => {
                        if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
                            Module["canvas"].requestPointerLock();
                            ev.preventDefault();
                        }
                    },
                    false
                );
            }
        }
    },
    handledByPreloadPlugin: function (byteArray, fullname, finish, onerror) {
        Browser.init();
        var handled = false;
        Module["preloadPlugins"].forEach(function (plugin) {
            if (handled) return;
            if (plugin["canHandle"](fullname)) {
                plugin["handle"](byteArray, fullname, finish, onerror);
                handled = true;
            }
        });
        return handled;
    },
    createContext: function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
        var ctx;
        var contextHandle;
        if (useWebGL) {
            var contextAttributes = { antialias: false, alpha: false, majorVersion: 1 };
            if (webGLContextAttributes) {
                for (var attribute in webGLContextAttributes) {
                    contextAttributes[attribute] = webGLContextAttributes[attribute];
                }
            }
            if (typeof GL != "undefined") {
                contextHandle = GL.createContext(canvas, contextAttributes);
                if (contextHandle) {
                    ctx = GL.getContext(contextHandle).GLctx;
                }
            }
        } else {
            ctx = canvas.getContext("2d");
        }
        if (!ctx) return null;
        if (setInModule) {
            if (!useWebGL) assert(typeof GLctx == "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
            Module.ctx = ctx;
            if (useWebGL) GL.makeContextCurrent(contextHandle);
            Module.useWebGL = useWebGL;
            Browser.moduleContextCreatedCallbacks.forEach(function (callback) {
                callback();
            });
            Browser.init();
        }
        return ctx;
    },
    destroyContext: function (canvas, useWebGL, setInModule) {},
    fullscreenHandlersInstalled: false,
    lockPointer: undefined,
    resizeCanvas: undefined,
    requestFullscreen: function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer == "undefined") Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas == "undefined") Browser.resizeCanvas = false;
        var canvas = Module["canvas"];
        function fullscreenChange() {
            Browser.isFullscreen = false;
            var canvasContainer = canvas.parentNode;
            if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
                canvas.exitFullscreen = Browser.exitFullscreen;
                if (Browser.lockPointer) canvas.requestPointerLock();
                Browser.isFullscreen = true;
                if (Browser.resizeCanvas) {
                    Browser.setFullscreenCanvasSize();
                } else {
                    Browser.updateCanvasDimensions(canvas);
                }
            } else {
                canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
                canvasContainer.parentNode.removeChild(canvasContainer);
                if (Browser.resizeCanvas) {
                    Browser.setWindowedCanvasSize();
                } else {
                    Browser.updateCanvasDimensions(canvas);
                }
            }
            if (Module["onFullScreen"]) Module["onFullScreen"](Browser.isFullscreen);
            if (Module["onFullscreen"]) Module["onFullscreen"](Browser.isFullscreen);
        }
        if (!Browser.fullscreenHandlersInstalled) {
            Browser.fullscreenHandlersInstalled = true;
            document.addEventListener("fullscreenchange", fullscreenChange, false);
            document.addEventListener("mozfullscreenchange", fullscreenChange, false);
            document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
            document.addEventListener("MSFullscreenChange", fullscreenChange, false);
        }
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
        canvasContainer.requestFullscreen =
            canvasContainer["requestFullscreen"] ||
            canvasContainer["mozRequestFullScreen"] ||
            canvasContainer["msRequestFullscreen"] ||
            (canvasContainer["webkitRequestFullscreen"] ? () => canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null) ||
            (canvasContainer["webkitRequestFullScreen"] ? () => canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null);
        canvasContainer.requestFullscreen();
    },
    exitFullscreen: function () {
        if (!Browser.isFullscreen) {
            return false;
        }
        var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || function () {};
        CFS.apply(document, []);
        return true;
    },
    nextRAF: 0,
    fakeRequestAnimationFrame: function (func) {
        var now = Date.now();
        if (Browser.nextRAF === 0) {
            Browser.nextRAF = now + 1e3 / 60;
        } else {
            while (now + 2 >= Browser.nextRAF) {
                Browser.nextRAF += 1e3 / 60;
            }
        }
        var delay = Math.max(Browser.nextRAF - now, 0);
        setTimeout(func, delay);
    },
    requestAnimationFrame: function (func) {
        if (typeof requestAnimationFrame == "function") {
            requestAnimationFrame(func);
            return;
        }
        var RAF = Browser.fakeRequestAnimationFrame;
        RAF(func);
    },
    safeSetTimeout: function (func, timeout) {
        return safeSetTimeout(func, timeout);
    },
    safeRequestAnimationFrame: function (func) {
        runtimeKeepalivePush();
        return Browser.requestAnimationFrame(function () {
            runtimeKeepalivePop();
            callUserCallback(func);
        });
    },
    getMimetype: function (name) {
        return { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", bmp: "image/bmp", ogg: "audio/ogg", wav: "audio/wav", mp3: "audio/mpeg" }[name.substr(name.lastIndexOf(".") + 1)];
    },
    getUserMedia: function (func) {
        if (!window.getUserMedia) {
            window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"];
        }
        window.getUserMedia(func);
    },
    getMovementX: function (event) {
        return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
    },
    getMovementY: function (event) {
        return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
    },
    getMouseWheelDelta: function (event) {
        var delta = 0;
        switch (event.type) {
            case "DOMMouseScroll":
                delta = event.detail / 3;
                break;
            case "mousewheel":
                delta = event.wheelDelta / 120;
                break;
            case "wheel":
                delta = event.deltaY;
                switch (event.deltaMode) {
                    case 0:
                        delta /= 100;
                        break;
                    case 1:
                        delta /= 3;
                        break;
                    case 2:
                        delta *= 80;
                        break;
                    default:
                        throw "unrecognized mouse wheel delta mode: " + event.deltaMode;
                }
                break;
            default:
                throw "unrecognized mouse wheel event: " + event.type;
        }
        return delta;
    },
    mouseX: 0,
    mouseY: 0,
    mouseMovementX: 0,
    mouseMovementY: 0,
    touches: {},
    lastTouches: {},
    calculateMouseEvent: function (event) {
        if (Browser.pointerLock) {
            if (event.type != "mousemove" && "mozMovementX" in event) {
                Browser.mouseMovementX = Browser.mouseMovementY = 0;
            } else {
                Browser.mouseMovementX = Browser.getMovementX(event);
                Browser.mouseMovementY = Browser.getMovementY(event);
            }
            if (typeof SDL != "undefined") {
                Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
                Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
            } else {
                Browser.mouseX += Browser.mouseMovementX;
                Browser.mouseY += Browser.mouseMovementY;
            }
        } else {
            var rect = Module["canvas"].getBoundingClientRect();
            var cw = Module["canvas"].width;
            var ch = Module["canvas"].height;
            var scrollX = typeof window.scrollX != "undefined" ? window.scrollX : window.pageXOffset;
            var scrollY = typeof window.scrollY != "undefined" ? window.scrollY : window.pageYOffset;
            if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
                var touch = event.touch;
                if (touch === undefined) {
                    return;
                }
                var adjustedX = touch.pageX - (scrollX + rect.left);
                var adjustedY = touch.pageY - (scrollY + rect.top);
                adjustedX = adjustedX * (cw / rect.width);
                adjustedY = adjustedY * (ch / rect.height);
                var coords = { x: adjustedX, y: adjustedY };
                if (event.type === "touchstart") {
                    Browser.lastTouches[touch.identifier] = coords;
                    Browser.touches[touch.identifier] = coords;
                } else if (event.type === "touchend" || event.type === "touchmove") {
                    var last = Browser.touches[touch.identifier];
                    if (!last) last = coords;
                    Browser.lastTouches[touch.identifier] = last;
                    Browser.touches[touch.identifier] = coords;
                }
                return;
            }
            var x = event.pageX - (scrollX + rect.left);
            var y = event.pageY - (scrollY + rect.top);
            x = x * (cw / rect.width);
            y = y * (ch / rect.height);
            Browser.mouseMovementX = x - Browser.mouseX;
            Browser.mouseMovementY = y - Browser.mouseY;
            Browser.mouseX = x;
            Browser.mouseY = y;
        }
    },
    resizeListeners: [],
    updateResizeListeners: function () {
        var canvas = Module["canvas"];
        Browser.resizeListeners.forEach(function (listener) {
            listener(canvas.width, canvas.height);
        });
    },
    setCanvasSize: function (width, height, noUpdates) {
        var canvas = Module["canvas"];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
    },
    windowedWidth: 0,
    windowedHeight: 0,
    setFullscreenCanvasSize: function () {
        if (typeof SDL != "undefined") {
            var flags = HEAPU32[SDL.screen >> 2];
            flags = flags | 8388608;
            HEAP32[SDL.screen >> 2] = flags;
        }
        Browser.updateCanvasDimensions(Module["canvas"]);
        Browser.updateResizeListeners();
    },
    setWindowedCanvasSize: function () {
        if (typeof SDL != "undefined") {
            var flags = HEAPU32[SDL.screen >> 2];
            flags = flags & ~8388608;
            HEAP32[SDL.screen >> 2] = flags;
        }
        Browser.updateCanvasDimensions(Module["canvas"]);
        Browser.updateResizeListeners();
    },
    updateCanvasDimensions: function (canvas, wNative, hNative) {
        if (wNative && hNative) {
            canvas.widthNative = wNative;
            canvas.heightNative = hNative;
        } else {
            wNative = canvas.widthNative;
            hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
            if (w / h < Module["forcedAspectRatio"]) {
                w = Math.round(h * Module["forcedAspectRatio"]);
            } else {
                h = Math.round(w / Module["forcedAspectRatio"]);
            }
        }
        if (
            (document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode &&
            typeof screen != "undefined"
        ) {
            var factor = Math.min(screen.width / w, screen.height / h);
            w = Math.round(w * factor);
            h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
            if (canvas.width != w) canvas.width = w;
            if (canvas.height != h) canvas.height = h;
            if (typeof canvas.style != "undefined") {
                canvas.style.removeProperty("width");
                canvas.style.removeProperty("height");
            }
        } else {
            if (canvas.width != wNative) canvas.width = wNative;
            if (canvas.height != hNative) canvas.height = hNative;
            if (typeof canvas.style != "undefined") {
                if (w != wNative || h != hNative) {
                    canvas.style.setProperty("width", w + "px", "important");
                    canvas.style.setProperty("height", h + "px", "important");
                } else {
                    canvas.style.removeProperty("width");
                    canvas.style.removeProperty("height");
                }
            }
        }
    },
};
function _emscripten_cancel_main_loop() {
    Browser.mainLoop.pause();
    Browser.mainLoop.func = null;
}
function _emscripten_date_now() {
    return Date.now();
}
function _emscripten_force_exit(status) {
    noExitRuntime = false;
    runtimeKeepaliveCounter = 0;
    _exit(status);
}
function _emscripten_memcpy_big(dest, src, num) {
    HEAPU8.copyWithin(dest, src, src + num);
}
function _emscripten_resize_heap(requestedSize) {
    var oldSize = HEAPU8.length;
    requestedSize = requestedSize >>> 0;
    return false;
}
function _emscripten_run_script(ptr) {
    eval(UTF8ToString(ptr));
}
var wasmTableMirror = [];
function getWasmTableEntry(funcPtr) {
    var func = wasmTableMirror[funcPtr];
    if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
    }
    return func;
}
function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop) {
    var browserIterationFunc = getWasmTableEntry(func);
    setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop);
}
var ENV = {};
function getExecutableName() {
    return thisProgram || "./this.program";
}
function getEnvStrings() {
    if (!getEnvStrings.strings) {
        var lang = ((typeof navigator == "object" && navigator.languages && navigator.languages[0]) || "C").replace("-", "_") + ".UTF-8";
        var env = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: lang, _: getExecutableName() };
        for (var x in ENV) {
            if (ENV[x] === undefined) delete env[x];
            else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
            strings.push(x + "=" + env[x]);
        }
        getEnvStrings.strings = strings;
    }
    return getEnvStrings.strings;
}
function writeAsciiToMemory(str, buffer, dontAddNull) {
    for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++ >> 0] = str.charCodeAt(i);
    }
    if (!dontAddNull) HEAP8[buffer >> 0] = 0;
}
function _environ_get(__environ, environ_buf) {
    var bufSize = 0;
    getEnvStrings().forEach(function (string, i) {
        var ptr = environ_buf + bufSize;
        HEAPU32[(__environ + i * 4) >> 2] = ptr;
        writeAsciiToMemory(string, ptr);
        bufSize += string.length + 1;
    });
    return 0;
}
function _environ_sizes_get(penviron_count, penviron_buf_size) {
    var strings = getEnvStrings();
    HEAPU32[penviron_count >> 2] = strings.length;
    var bufSize = 0;
    strings.forEach(function (string) {
        bufSize += string.length + 1;
    });
    HEAPU32[penviron_buf_size >> 2] = bufSize;
    return 0;
}
function _fd_close(fd) {
    return 52;
}
function _fd_read(fd, iov, iovcnt, pnum) {
    return 52;
}
function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
    return 70;
}
var printCharBuffers = [null, [], []];
function printChar(stream, curr) 
{
    var buffer = printCharBuffers[stream];
    if (curr === 0 || curr === 10) {
        (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
        buffer.length = 0;
    } else {
        buffer.push(curr);
    }
}
function flush_NO_FILESYSTEM() {
    _fflush(0);
    if (printCharBuffers[1].length) printChar(1, 10);
    if (printCharBuffers[2].length) printChar(2, 10);
}
function _fd_write(fd, iov, iovcnt, pnum) {
    var num = 0;
    for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[(iov + 4) >> 2];
        iov += 8;
        for (var j = 0; j < len; j++) {
            printChar(fd, HEAPU8[ptr + j]);
        }
        num += len;
    }
    HEAPU32[pnum >> 2] = num;
    return 0;
}
function __isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function __arraySum(array, index) {
    var sum = 0;
    for (var i = 0; i <= index; sum += array[i++]) {}
    return sum;
}
var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function __addDays(date, days) {
    var newDate = new Date(date.getTime());
    while (days > 0) {
        var leap = __isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
        if (days > daysInCurrentMonth - newDate.getDate()) {
            days -= daysInCurrentMonth - newDate.getDate() + 1;
            newDate.setDate(1);
            if (currentMonth < 11) {
                newDate.setMonth(currentMonth + 1);
            } else {
                newDate.setMonth(0);
                newDate.setFullYear(newDate.getFullYear() + 1);
            }
        } else {
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        }
    }
    return newDate;
}
function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
}
function writeArrayToMemory(array, buffer) {
    HEAP8.set(array, buffer);
}
function _strftime(s, maxsize, format, tm) {
    var tm_zone = HEAP32[(tm + 40) >> 2];
    var date = {
        tm_sec: HEAP32[tm >> 2],
        tm_min: HEAP32[(tm + 4) >> 2],
        tm_hour: HEAP32[(tm + 8) >> 2],
        tm_mday: HEAP32[(tm + 12) >> 2],
        tm_mon: HEAP32[(tm + 16) >> 2],
        tm_year: HEAP32[(tm + 20) >> 2],
        tm_wday: HEAP32[(tm + 24) >> 2],
        tm_yday: HEAP32[(tm + 28) >> 2],
        tm_isdst: HEAP32[(tm + 32) >> 2],
        tm_gmtoff: HEAP32[(tm + 36) >> 2],
        tm_zone: tm_zone ? UTF8ToString(tm_zone) : "",
    };
    var pattern = UTF8ToString(format);
    var EXPANSION_RULES_1 = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y",
    };
    for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
    }
    var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    function leadingSomething(value, digits, character) 
    {
        var str = typeof value == "number" ? value.toString() : value || "";
        while (str.length < digits) {
            str = character[0] + str;
        }
        return str;
    }
    function leadingNulls(value, digits) 
    {
        return leadingSomething(value, digits, "0");
    }
    function compareByDay(date1, date2) 
    {
        function sgn(value) {
            return value < 0 ? -1 : value > 0 ? 1 : 0;
        }
        var compare;
        if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
            if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
                compare = sgn(date1.getDate() - date2.getDate());
            }
        }
        return compare;
    }
    function getFirstWeekStartDate(janFourth) {
        switch (janFourth.getDay()) {
            case 0:
                return new Date(janFourth.getFullYear() - 1, 11, 29);
            case 1:
                return janFourth;
            case 2:
                return new Date(janFourth.getFullYear(), 0, 3);
            case 3:
                return new Date(janFourth.getFullYear(), 0, 2);
            case 4:
                return new Date(janFourth.getFullYear(), 0, 1);
            case 5:
                return new Date(janFourth.getFullYear() - 1, 11, 31);
            case 6:
                return new Date(janFourth.getFullYear() - 1, 11, 30);
        }
    }
    function getWeekBasedYear(date) {
        var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
        var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
        var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
        var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
        var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
        if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
                return thisDate.getFullYear() + 1;
            }
            return thisDate.getFullYear();
        }
        return thisDate.getFullYear() - 1;
    }
    var EXPANSION_RULES_2 = {
        "%a": function (date) {
            return WEEKDAYS[date.tm_wday].substring(0, 3);
        },
        "%A": function (date) {
            return WEEKDAYS[date.tm_wday];
        },
        "%b": function (date) {
            return MONTHS[date.tm_mon].substring(0, 3);
        },
        "%B": function (date) {
            return MONTHS[date.tm_mon];
        },
        "%C": function (date) {
            var year = date.tm_year + 1900;
            return leadingNulls((year / 100) | 0, 2);
        },
        "%d": function (date) {
            return leadingNulls(date.tm_mday, 2);
        },
        "%e": function (date) {
            return leadingSomething(date.tm_mday, 2, " ");
        },
        "%g": function (date) {
            return getWeekBasedYear(date).toString().substring(2);
        },
        "%G": function (date) {
            return getWeekBasedYear(date);
        },
        "%H": function (date) {
            return leadingNulls(date.tm_hour, 2);
        },
        "%I": function (date) {
            var twelveHour = date.tm_hour;
            if (twelveHour == 0) twelveHour = 12;
            else if (twelveHour > 12) twelveHour -= 12;
            return leadingNulls(twelveHour, 2);
        },
        "%j": function (date) {
            return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3);
        },
        "%m": function (date) {
            return leadingNulls(date.tm_mon + 1, 2);
        },
        "%M": function (date) {
            return leadingNulls(date.tm_min, 2);
        },
        "%n": function () {
            return "\n";
        },
        "%p": function (date) {
            if (date.tm_hour >= 0 && date.tm_hour < 12) {
                return "AM";
            }
            return "PM";
        },
        "%S": function (date) {
            return leadingNulls(date.tm_sec, 2);
        },
        "%t": function () {
            return "\t";
        },
        "%u": function (date) {
            return date.tm_wday || 7;
        },
        "%U": function (date) {
            var days = date.tm_yday + 7 - date.tm_wday;
            return leadingNulls(Math.floor(days / 7), 2);
        },
        "%V": function (date) {
            var val = Math.floor((date.tm_yday + 7 - ((date.tm_wday + 6) % 7)) / 7);
            if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
                val++;
            }
            if (!val) {
                val = 52;
                var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
                if (dec31 == 4 || (dec31 == 5 && __isLeapYear((date.tm_year % 400) - 1))) {
                    val++;
                }
            } else if (val == 53) {
                var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
                if (jan1 != 4 && (jan1 != 3 || !__isLeapYear(date.tm_year))) val = 1;
            }
            return leadingNulls(val, 2);
        },
        "%w": function (date) {
            return date.tm_wday;
        },
        "%W": function (date) {
            var days = date.tm_yday + 7 - ((date.tm_wday + 6) % 7);
            return leadingNulls(Math.floor(days / 7), 2);
        },
        "%y": function (date) {
            return (date.tm_year + 1900).toString().substring(2);
        },
        "%Y": function (date) {
            return date.tm_year + 1900;
        },
        "%z": function (date) {
            var off = date.tm_gmtoff;
            var ahead = off >= 0;
            off = Math.abs(off) / 60;
            off = (off / 60) * 100 + (off % 60);
            return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
        },
        "%Z": function (date) {
            return date.tm_zone;
        },
        "%%": function () {
            return "%";
        },
    };
    pattern = pattern.replace(/%%/g, "\0\0");
    for (var rule in EXPANSION_RULES_2) {
        if (pattern.includes(rule)) {
            pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
        }
    }
    pattern = pattern.replace(/\0\0/g, "%");
    var bytes = intArrayFromString(pattern, false);
    if (bytes.length > maxsize) {
        return 0;
    }
    writeArrayToMemory(bytes, s);
    return bytes.length - 1;
}
function _strftime_l(s, maxsize, format, tm, loc) {
    return _strftime(s, maxsize, format, tm);
}
function allocateUTF8OnStack(str) {
    var size = lengthBytesUTF8(str) + 1;
    var ret = stackAlloc(size);
    stringToUTF8Array(str, HEAP8, ret, size);
    return ret;
}
function getCFunc(ident) {
    var func = Module["_" + ident];
    return func;
}
function ccall(ident, returnType, argTypes, args, opts) {
    var toC = {
        string: (str) => {
            var ret = 0;
            if (str !== null && str !== undefined && str !== 0) {
                var len = (str.length << 2) + 1;
                ret = stackAlloc(len);
                stringToUTF8(str, ret, len);
            }
            return ret;
        },
        array: (arr) => {
            var ret = stackAlloc(arr.length);
            writeArrayToMemory(arr, ret);
            return ret;
        },
    };
    function convertReturnValue(ret) {
        if (returnType === "string") {
            return UTF8ToString(ret);
        }
        if (returnType === "boolean") return Boolean(ret);
        return ret;
    }
    var func = getCFunc(ident);
    var cArgs = [];
    var stack = 0;
    if (args) {
        for (var i = 0; i < args.length; i++) {
            var converter = toC[argTypes[i]];
            if (converter) {
                if (stack === 0) stack = stackSave();
                cArgs[i] = converter(args[i]);
            } else {
                cArgs[i] = args[i];
            }
        }
    }
    var ret = func.apply(null, cArgs);
    function onDone(ret) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret);
    }
    ret = onDone(ret);
    return ret;
}
function cwrap(ident, returnType, argTypes, opts) {
    argTypes = argTypes || [];
    var numericArgs = argTypes.every((type) => type === "number" || type === "boolean");
    var numericRet = returnType !== "string";
    if (numericRet && numericArgs && !opts) {
        return getCFunc(ident);
    }
    return function () {
        return ccall(ident, returnType, argTypes, arguments, opts);
    };
}
embind_init_charCodes();
BindingError = Module["BindingError"] = extendError(Error, "BindingError");
InternalError = Module["InternalError"] = extendError(Error, "InternalError");
init_emval();
Module["requestFullscreen"] = function Module_requestFullscreen(lockPointer, resizeCanvas) {
    Browser.requestFullscreen(lockPointer, resizeCanvas);
};
Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) {
    Browser.requestAnimationFrame(func);
};
Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) {
    Browser.setCanvasSize(width, height, noUpdates);
};
Module["pauseMainLoop"] = function Module_pauseMainLoop() {
    Browser.mainLoop.pause();
};
Module["resumeMainLoop"] = function Module_resumeMainLoop() {
    Browser.mainLoop.resume();
};
Module["getUserMedia"] = function Module_getUserMedia() {
    Browser.getUserMedia();
};
Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
    return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes);
};
var preloadedImages = {};
var preloadedAudios = {};
var asmLibraryArg = {
    H: _Helper_Persistent_get,
    I: _Helper_Persistent_getSize,
    l: _Helper_Persistent_store,
    h: _Helper_Requester_getData,
    d: _Helper_Requester_getProgress,
    c: _Helper_Requester_getStatus,
    f: _Helper_Requester_isDone,
    e: _Helper_Requester_isSuccess,
    J: _Helper_Requester_makeRequest,
    K: _Helper_Requester_releaseRequester,
    m: _Helper_getHost,
    n: _Helper_getNamedConst,
    q: __embind_register_bigint,
    F: __embind_register_bool,
    D: __embind_register_emval,
    j: __embind_register_float,
    b: __embind_register_integer,
    a: __embind_register_memory_view,
    k: __embind_register_std_string,
    i: __embind_register_std_wstring,
    G: __embind_register_void,
    w: __emscripten_get_now_is_monotonic,
    g: _abort,
    o: _emscripten_asm_const_int,
    L: _emscripten_cancel_main_loop,
    x: _emscripten_date_now,
    E: _emscripten_force_exit,
    C: _emscripten_get_now,
    A: _emscripten_memcpy_big,
    z: _emscripten_resize_heap,
    M: _emscripten_run_script,
    y: _emscripten_set_main_loop,
    s: _environ_get,
    t: _environ_sizes_get,
    u: _fd_close,
    v: _fd_read,
    p: _fd_seek,
    B: _fd_write,
    r: _strftime_l,
};
var asm = createWasm();

console.log(asm);

var ___wasm_call_ctors = (Module["___wasm_call_ctors"] = function () {
    return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["O"]).apply(null, arguments);
});
var _main = (Module["_main"] = function () {
    return (_main = Module["_main"] = Module["asm"]["P"]).apply(null, arguments);
});
var _free = (Module["_free"] = function () {
    return (_free = Module["_free"] = Module["asm"]["Q"]).apply(null, arguments);
});
var _malloc = (Module["_malloc"] = function () {
    return (_malloc = Module["_malloc"] = Module["asm"]["R"]).apply(null, arguments);
});
var ___getTypeName = (Module["___getTypeName"] = function () {
    return (___getTypeName = Module["___getTypeName"] = Module["asm"]["S"]).apply(null, arguments);
});
var __embind_initialize_bindings = (Module["__embind_initialize_bindings"] = function () {
    return (__embind_initialize_bindings = Module["__embind_initialize_bindings"] = Module["asm"]["T"]).apply(null, arguments);
});
var ___funcs_on_exit = (Module["___funcs_on_exit"] = function () {
    return (___funcs_on_exit = Module["___funcs_on_exit"] = Module["asm"]["U"]).apply(null, arguments);
});
var _fflush = (Module["_fflush"] = function () {
    return (_fflush = Module["_fflush"] = Module["asm"]["W"]).apply(null, arguments);
});
var ___trap = (Module["___trap"] = function () {
    return (___trap = Module["___trap"] = Module["asm"]["X"]).apply(null, arguments);
});
var stackSave = (Module["stackSave"] = function () {
    return (stackSave = Module["stackSave"] = Module["asm"]["Y"]).apply(null, arguments);
});
var stackRestore = (Module["stackRestore"] = function () {
    return (stackRestore = Module["stackRestore"] = Module["asm"]["Z"]).apply(null, arguments);
});
var stackAlloc = (Module["stackAlloc"] = function () {
    return (stackAlloc = Module["stackAlloc"] = Module["asm"]["_"]).apply(null, arguments);
});
Module["ccall"] = ccall;
Module["cwrap"] = cwrap;
var calledRun;
dependenciesFulfilled = function runCaller() {
    if (!calledRun) run();
    if (!calledRun) dependenciesFulfilled = runCaller;
};
function callMain(args) {
    var entryFunction = Module["_main"];
    args = args || [];
    args.unshift(thisProgram);
    var argc = args.length;
    var argv = stackAlloc((argc + 1) * 4);
    var argv_ptr = argv >> 2;
    args.forEach((arg) => {
        HEAP32[argv_ptr++] = allocateUTF8OnStack(arg);
    });
    HEAP32[argv_ptr] = 0;
    try {
        var ret = entryFunction(argc, argv);
        exitJS(ret, true);
        return ret;
    } catch (e) {
        return handleException(e);
    }
}
function run(args) 
{
    console.log("Runned");
    console.log(Module["setStatus"]);
    console.log(runDependencies);
    args = args || arguments_;
    if (runDependencies > 0) 
    {
        return;
    }
    preRun();
    if (runDependencies > 0) 
    {
        return;
    }
    function doRun() 
    {
        console.log("doRunned");
        if (calledRun) return;
        calledRun = true;
        Module["calledRun"] = true;
        if (ABORT) return;
        initRuntime();
        preMain();
        if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
        if (shouldRunNow) callMain(args);
        postRun();
    }
    if (Module["setStatus"]) 
    {
        Module["setStatus"]("Running...");
        setTimeout(function () {
            setTimeout(function () {
                Module["setStatus"]("");
            }, 1);
            doRun();
        }, 1);
    } else {
        doRun();
    }
}
if (Module["preInit"]) {
    if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
    while (Module["preInit"].length > 0) {
        Module["preInit"].pop()();
    }
}
var shouldRunNow = true;
if (Module["noInitialRun"]) shouldRunNow = false;

console.log(Module);

run();
