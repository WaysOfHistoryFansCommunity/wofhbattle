import { BinaryReader } from "../../core/helpers/BinaryReaderHelper";

export function parseReplay(buffer) 
{
    const reader = new BinaryReader(buffer);

    const littleEndian = reader.readUint16();
    console.log(littleEndian);
    const SIGNATURE = reader.readString(); 
    

    return {
        player: {id: 0, name: 'Noname'},
        city: {id: 0, name: 'Noname'}, 
        country: {id: 0, name: 'Noname', flag: '-.gif'},
        domain: 'ru69.waysofhistory.com', 
        waves: []
    };
}