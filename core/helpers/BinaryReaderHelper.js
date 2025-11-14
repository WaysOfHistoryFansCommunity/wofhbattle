export class BinaryReader 
{
    constructor(buffer) 
    {
        if (buffer instanceof Uint8Array) this.buffer = buffer;
        else this.buffer = new Uint8Array(buffer);

        this.view = new DataView(this.buffer.buffer);
        this.offset = 0;
        this.decoder = new TextDecoder("utf-8");
        this.endian = true; // LE
    }

    setEndian(endian = true) 
    {
        this.endian = endian;
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
        if (this.offset + 1 > this.buffer.length) throw new RangeError("EOF");
        return this.view.getInt8(this.offset);
    }

    readInt8() 
    {
        if (this.offset + 1 > this.buffer.length) throw new RangeError("EOF");
        const result = this.view.getInt8(this.offset);
        this.offset += 1;
        return result; 
    }

    peekUint8()
    {
        if (this.offset + 1 > this.buffer.length) throw new RangeError("EOF");
        return this.view.getUint8(this.offset);
    }

    readUint8()
    {
        if (this.offset + 1 > this.buffer.length) throw new RangeError("EOF");
        const result = this.view.getUint8(this.offset);
        this.offset += 1;
        return result;
    }

    peekInt16() 
    {
        if (this.offset + 2 > this.buffer.length) throw new RangeError("EOF");
        return this.view.getInt16(this.offset, endian, this.endian);
    }

    readInt16() 
    {
        if (this.offset + 2 > this.buffer.length) throw new RangeError("EOF");
        const result = this.view.getInt16(this.offset, endian, this.endian);
        this.offset += 2;
        return result;
    }

    peekUint16()
    {
        if (this.offset + 2 > this.buffer.length) throw new RangeError("EOF");
        return this.view.getUint16(this.offset, this.endian);
    }

    readUint16()
    {
        if (this.offset + 2 > this.buffer.length) throw new RangeError("EOF");
        const result = this.view.getUint16(this.offset, this.endian);
        this.offset += 2;
        return result;
    }

    peekInt32() 
    {
        if (this.offset + 4 > this.buffer.length) throw new RangeError("EOF");
        return this.view.getInt32(this.offset, this.endian);
    }

    readInt32() 
    {
        if (this.offset + 4 > this.buffer.length) throw new RangeError("EOF");
        const result = this.view.getInt32(this.offset, this.endian);
        this.offset += 4;
        return result;
    }

    peekUint32()
    {
        if (this.offset + 4 > this.buffer.length) throw new RangeError("EOF");
        return this.view.getUint32(this.offset, this.endian);
    }

    readUint32()
    {
        if (this.offset + 4 > this.buffer.length) throw new RangeError("EOF");
        const result = this.view.getUint32(this.offset, this.endian);
        this.offset += 4;
        return result;
    }

    peekFloat32() 
    {
        if (this.offset + 4 > this.buffer.length) throw new RangeError("EOF");
        return this.view.getFloat32(this.offset, this.endian);
    }

    readFloat32() 
    {
        if (this.offset + 4 > this.buffer.length) throw new RangeError("EOF");
        const result = this.view.getFloat32(this.offset, this.endian);
        this.offset += 4;
        return result;
    }

    peekString(len)
    {
        if (typeof len === "undefined")
        {
            len = this.peekUint8();
        }
        if (this.offset + len > this.buffer.length) throw new RangeError("EOF");
        const bytes = this.buffer.subarray(this.offset + 1, this.offset + 1 + len);
        const str = this.decoder.decode(bytes);
        return str;
    }

    readString(len) 
    {
        if (typeof len === "undefined")
        {
            len = this.readUint8();
        }
        if (this.offset + len > this.buffer.length) throw new RangeError("EOF");
        const bytes = this.buffer.subarray(this.offset, this.offset + len);
        const str = this.decoder.decode(bytes);
        this.offset += len;
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

    peekSubBytes(len) 
    {
        if (this.offset + len > this.buffer.length) throw new RangeError("EOF");
        return this.buffer.subarray(this.offset, this.offset + len);
    }

    readSubBuffer(len) 
    {
        if (this.offset + len > this.buffer.length) throw new RangeError("EOF");
        const bytes = this.buffer.subarray(this.offset, this.offset + len);
        this.offset += len;
        return bytes;
    }
}
