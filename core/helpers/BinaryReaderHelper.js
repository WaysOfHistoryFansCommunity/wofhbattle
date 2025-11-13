export class BinaryReader 
{
    constructor(buffer) 
    {
        if (buffer instanceof Uint8Array) this.buffer = buffer;
        else this.buffer = new Uint8Array(buffer);

        this.view = new DataView(this.buffer.buffer);
        this.offset = 0;
        this.decoder = new TextDecoder("utf-8");
    }

    get position() 
    {
        return this.offset;
    }

    set position(pos) 
    {
        if (pos < 0 || pos > this.buffer.length) throw new RangeError("Position out of bounds");
        this.offset = pos;
    }

    get remaining() 
    {
        return this.buffer.length - this.offset;
    }

    skip(bytes) 
    {
        this.position += bytes;
    }

    back(bytes) 
    {
        this.position -= bytes;
    }

    seek(pos) 
    {
        this.position = pos;
    }

    peekInt8() 
    {
        return this.view.getInt8(this.offset);
    }

    readInt8() 
    {
        const result = this.view.getInt8(this.offset);
        this.offset += 1;
        return result; 
    }

    peekUint8()
    {
        return this.view.getUint8(this.offset);
    }

    readUint8()
    {
        const result = this.view.getUint8(this.offset);
        this.offset += 1;
        return result;
    }

    peekInt16() 
    {
        return this.view.getInt16(this.offset);
    }

    readInt16() 
    {
        const result = this.view.getInt16(this.offset);
        this.offset += 2;
        return result;
    }

    peekUint16()
    {
        return this.view.getUint16(this.offset);
    }

    readUint16()
    {
        const result = this.view.getUint16(this.offset);
        this.offset += 2;
        return result;
    }

    peekInt32() 
    {
        return this.view.getInt32(this.offset);
    }

    readInt32() 
    {
        const result = this.view.getInt32(this.offset);
        this.offset += 4;
        return result;
    }

    peekUint32()
    {
        return this.view.getUint32(this.offset);
    }

    readUint32()
    {
        const result = this.view.getUint32(this.offset);
        this.offset += 4;
        return result;
    }

    peekFloat32() 
    {
        return this.view.getFloat32(this.offset, true);
    }

    readFloat32() 
    {
        const result = this.view.getFloat32(this.offset, true);
        this.offset += 4;
        return result;
    }

    peekString(len)
    {
        if (typeof len === "undefined")
        {
            len = this.readUint8();
        }

        const bytes = this.buffer.subarray(this.offset, this.offset + len);
        const str = this.decoder.decode(bytes);
        return str;
    }

    readString(len) 
    {
        const result = peekString(len);
        this.offset += len;
        return result;
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

    peekSubBytes(len) 
    {
        return this.buffer.subarray(this.offset, this.offset + len);
    }

    readSubBuffer(len) 
    {
        const bytes = this.buffer.subarray(this.offset, this.offset + len);
        this.offset += len;
        return bytes;
    }
}
