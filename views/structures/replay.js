import { BinaryReader } from "../../core/helpers/BinaryReaderHelper";

export class Replay 
{
    constructor({player = {id: 0, name: 'Noname'}, city = {id: 0, name: 'Noname'}, country = {id: 0, name: 'Noname', flag: '-.gif'}, domain = 'ru69.waysofhistory.com', waves = []})
    {
        this.player = player;
        this.city = city;
        this.country = country;
        this.domain = domain;
        this.waves = waves;
        this.wavesCount = this.waves.length;
    }

    static async toFile(filename)
    {
    }

    static async fromFile(filename)
    {
        return this.fromBinary(await window.api.readFileBinary(filename));
    } 

    static async fromBinary(buffer)
    {
        const reader = new BinaryReader(buffer);

        // ---- HEADER ----

        const endian = reader.readUint16();
        if (endian === 0x0100)  reader.setEndian(true); //LE
        else if (endian === 0x0001) reader.setEndian(false); //BE
        else throw new Error("Invalid endian marker");
        console.log(endian);

        //Check signature
        const SIGNATURE = reader.readString();
        console.log('SIGNATURE: ', SIGNATURE);
        if(SIGNATURE != 'wofh1_4') throw new Error("ERROR process parse replay, signature is mismath.");
        //Check version
        const VERSION = reader.readUint8();
        console.log('VERSION: ', VERSION);
        if(VERSION != 143) throw new Error(`ERROR process parse replay, version ${VERSION} does not supported.`);
        //Skip
        reader.skip(1);
        //Check unknown bytes
        const unknownCheckBytesSequence = new Uint8Array([0x00, 0x00, 0x5a, 0x02, 0x00, 0x00, 0xf7, 0xa7, 0x10, 0x8b, 0xad, 0x59, 0xb2, 0xa0, 0xa5, 0x04, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00]);
        const unknownCheckBytesSequenceLength = unknownCheckBytes.length;

        console.log('CHECK UNKNOWN BYTES NEED: ', { unknownCheckBytesSequence, unknownCheckBytesSequenceLength });

        const unknownCheckBytes = reader.readSubBuffer(unknownCheckBytesSequenceLength);
        console.log('CHECK UNKNOWN BYTES: ', unknownCheckBytes );

        if(unknownCheckBytesSequence != unknownCheckBytes) throw new Error("ERROR process parse replay, unknown check bytes is mismath.");
        console.log('CHECK UNKNOWN BYTES PASSED');
        //Check factions and map settings file 0c400414_18
        

        return Replay({
            player: {id: 0, name: 'Noname'},
            city: {id: 0, name: 'Noname'}, 
            country: {id: 0, name: 'Noname', flag: '-.gif'},
            domain: 'ru69.waysofhistory.com', 
            waves: []
        });
    }
}