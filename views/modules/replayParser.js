import { BinaryReader } from "../../core/helpers/BinaryReaderHelper";

export function parseReplay(buffer) 
{
    const reader = new BinaryReader(buffer);

    // ---- HEADER ----

    const endian = reader.readUint16();
    if (endian === 1)
        reader.setEndian(true);
    else if (endian === 0x0100)
        reader.setEndian(false);
    else
        throw new Error("Invalid endian marker");
    console.log(littleEndian);
    const SIGNATURE = reader.readString();
    console.log(SIGNATURE);
    if(SIGNATURE != 'wofh1_4') throw new Error("ERROR process parse replay, signature is mismath.");
    const VERSION = reader.readUint8();
    if(VERSION != 143) throw new Error(`ERROR process parse replay, version ${VERSION} does not supported.`);

    return {
        player: {id: 0, name: 'Noname'},
        city: {id: 0, name: 'Noname'}, 
        country: {id: 0, name: 'Noname', flag: '-.gif'},
        domain: 'ru69.waysofhistory.com', 
        waves: []
    };
}