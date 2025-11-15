export class BinaryHelper
{
    constructor(buffer = new Uint8Array(0), startOffset = 0, encoding = 'utf-8', maxReadSize = 1024 * 1024) 
    {
        if (buffer instanceof Uint8Array) this._buffer = buffer;
        else this._buffer = new Uint8Array(buffer);

        this._view = new DataView(this._buffer.buffer); //default Uint8Array().length -> 0
        this._offset = startOffset; //default: 0
        this._stringDecoderEncoding = encoding; //default: utf-8
        this._stringDecoder = new TextDecoder(this._stringDecoderEncoding);
        this._endian = true; // true - LE, false - BE default: true
        this._maxReadSize = maxReadSize; //default: 1024 * 1024 = 1MB
    }

    get endian()  
    {
        return this._endian;
    }

    set endian(endian = true) 
    {
        this._endian = endian;
    }

    get stringDecoderEncoding()
    {
        return this._stringDecoderEncoding;
    }

    set stringDecoderEncoding(stringDecoderEncoding = 'utf-8')
    {
        this._stringDecoderEncoding = stringDecoderEncoding;
        this._stringDecoder = new TextDecoder(this._stringDecoderEncoding);
    }

    _validate(bytesNeeded, operation = "operation") 
    {
        //Отрицательные значения
        if (bytesNeeded < 0) 
        {
            throw new RangeError(`${operation}: negative bytes (${bytesNeeded})`);
        }
        
        //Переполнение integer
        if (this._offset + bytesNeeded > Number.MAX_SAFE_INTEGER) 
        {
            throw new RangeError(`${operation}: integer overflow`);
        }
        
        //Доступность данных
        if (this._offset + bytesNeeded > this._buffer.length) 
        {
            const remaining = this._buffer.length - this._offset;
            throw new RangeError(`${operation}: EOF (need ${bytesNeeded}, have ${remaining})`);
        }
        
        //Защита от гигантских размеров
        if (bytesNeeded > this._maxReadSize) 
        {
            throw new RangeError(`${operation}: too large (${bytesNeeded} > ${this._maxReadSize})`);
        }
        
        return true;
    }

    get position() 
    {
        return this._offset;
    }

    set position(pos) 
    {
        //Отрицательные значения
        if (pos < 0) 
        {
            throw new RangeError(`position: negative bytes (${pos})`);
        }
        
        //Переполнение integer
        if (pos > Number.MAX_SAFE_INTEGER) 
        {
            throw new RangeError(`position: integer overflow`);
        }
        
        //Доступность данных
        if (pos > this._buffer.length) 
        {
            const remaining = this._buffer.length - this._offset;
            throw new RangeError(`position: EOF (need ${pos}, have ${remaining})`);
        }
        
        //Защита от гигантских размеров
        if (pos > this._maxReadSize) 
        {
            throw new RangeError(`position: too large (${pos} > ${this._maxReadSize})`);
        }
        this._offset = pos;
    }

    get remaining() 
    {
        return this._buffer.length - this._offset;
    }

    skip(bytes = 1) 
    {
        this.position += bytes;
    }

    back(bytes = 1) 
    {
        this.position -= bytes;
    }

    seek(pos) 
    {
        this.position = pos;
    }

    peekInt8() 
    {
        this._validate(1, 'peekInt8');
        return this._view.getInt8(this._offset);
    }

    readInt8() 
    {
        this._validate(1, 'readInt8');
        const result = this._view.getInt8(this._offset);
        this._offset += 1;
        return result; 
    }

    peekUint8()
    {
        this._validate(1, 'peekUint8');
        return this._view.getUint8(this._offset);
    }

    readUint8()
    {
        this._validate(1, 'readUint8');
        const result = this._view.getUint8(this._offset);
        this._offset += 1;
        return result;
    }

    peekInt16() 
    {
        this._validate(2, 'peekInt16');
        return this._view.getInt16(this._offset, this._endian);
    }

    readInt16() 
    {
        this._validate(2, 'readInt16');
        const result = this._view.getInt16(this._offset, this._endian);
        this._offset += 2;
        return result;
    }

    peekUint16()
    {
        this._validate(2, 'peekUint16');
        return this._view.getUint16(this._offset, this._endian);
    }

    readUint16()
    {
        this._validate(2, 'readUint16');
        const result = this._view.getUint16(this._offset, this._endian);
        this._offset += 2;
        return result;
    }

    peekInt32() 
    {
        this._validate(4, 'peekInt32');
        return this._view.getInt32(this._offset, this._endian);
    }

    readInt32() 
    {
        this._validate(4, 'readInt32');
        const result = this._view.getInt32(this._offset, this._endian);
        this._offset += 4;
        return result;
    }

    peekUint32()
    {
        this._validate(4, 'peekUint32');
        return this._view.getUint32(this._offset, this._endian);
    }

    readUint32()
    {
        this._validate(4, 'readUint32');
        const result = this._view.getUint32(this._offset, this._endian);
        this._offset += 4;
        return result;
    }

    peekFloat32() 
    {
        this._validate(4, 'peekFloat32');
        return this._view.getFloat32(this._offset, this._endian);
    }

    readFloat32() 
    {
        this._validate(4, 'readFloat32');
        const result = this._view.getFloat32(this._offset, this._endian);
        this._offset += 4;
        return result;
    }

    peekString(len)
    {
        this._validate(len, 'peekString');

        const bytes = this._buffer.subarray(this._offset, this._offset + len);
        const str = this._stringDecoder.decode(bytes);
        return str;
    }

    readString(len) 
    {
        this._validate(len, 'readString');

        const bytes = this._buffer.subarray(this._offset, this._offset + len);
        const str = this._stringDecoder.decode(bytes);
        this._offset += len;
        return str;
    }

    peekJson(len)
    {
        const str = this.peekString(len);
        try 
        {
            return JSON.parse(str);
        } 
        catch (e) 
        {
            console.warn("Ошибка парсинга JSON:", e);
            return null;
        }
    }

    readJson(len) 
    {
        const str = this.readString(len);
        try 
        {
            return JSON.parse(str);
        } 
        catch (e) 
        {
            console.warn("Ошибка парсинга JSON:", e);
            return null;
        }
    }

    peekSubBuffer(len) 
    {
        this._validate(len, 'peekSubBuffer');
        return this._buffer.subarray(this._offset, this._offset + len);
    }

    readSubBuffer(len) 
    {
        this._validate(len, 'readSubBuffer');
        const bytes = this._buffer.subarray(this._offset, this._offset + len);
        this._offset += len;
        return bytes;
    }
}