import fs from 'fs';
import path from 'path';

console.oldLog = console.log;

console.oldConsoleWarning = console.warn;
console.oldConsoleError = console.error;

export class DebugCollector 
{
    constructor({ echo = true, logFile = 'main' } = {}) 
	{
        this.echo = echo;
        this.logs = [];
        this.logFile = path.join('logs', `${logFile}.log`);
    }

    log(msg) 
	{
		console.oldLog(msg);
		this._add('LOG', msg);
	}
    warn(msg) 
	{
		console.oldConsoleWarning(msg);
		this._add('WARN', msg); 
	}
    error(msg) 
	{ 
		console.oldConsoleError('ERROR'+msg);
		this._add('ERROR', msg); 
	}

    _add(level, msg) 
	{
        const line = `[${new Date().toISOString()}] ${level}: ${msg}`;
        this.logs.push(line);
        if (this.echo) console[level.toLowerCase()]?.(msg);
    }

    save() 
	{
        fs.mkdirSync(path.dirname(this.logFile), { recursive: true });
        fs.writeFileSync(this.logFile, this.logs.join('\n'));
    }
}

// создаём один синглтон
export const debugCollector = new DebugCollector();

// переопределяем консоль
console.log = (msg) => debugCollector.log(msg);
console.warn = (msg) => debugCollector.warn(msg);
console.error = (msg) => 
{
    debugCollector.error(msg);
    debugCollector.save();
};

// глобальная обработка ошибок
window.onerror = (errorMsg, url, lineNumber) => 
{
    debugCollector.error(errorMsg);
    debugCollector.save();
    return false;
};