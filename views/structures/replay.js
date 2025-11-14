import { compareArrays } from "../../core/helpers/ArrayHelper.js";
import { BinaryReader } from "../../core/helpers/BinaryReaderHelper.js";


const ACTUAL_PROJECT_SIGNATURE = 'wofh1_4';
const ACTUAL_VERSION = 143;
const ACTUAL_UNKNOWN_CHECK_BYTES_1 = new Uint8Array([0x00, 0x00, 0x5a, 0x02, 0x00, 0x00, 0xf7, 0xa7, 0x10, 0x8b, 0xad, 0x59, 0xb2, 0xa0, 0xa5, 0x04, 0x00, 0x00, 0x0d, 0x00, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00]);
const ACTUAL_UNKNOWN_CHECK_BYTES_2 = new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
const ACTUAL_UNKNOWN_CHECK_BYTES_3 = new Uint8Array([0x01, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x40, 0xe2, 0x01, 0x00, 0x01, 0x04, 0x00, 0x00, 0x00]); 
const ACTUAL_PROJECTINFO_FILENAME = '0c400414_18';

export class Replay 
{
    constructor({player = {id: 0, name: 'Noname'}, city = {id: 0, name: 'Noname'}, country = {id: 0, name: 'Noname', flag: '-.gif'}, scene = {defaultGFilepath: 'project/wofh1_4/scenes/defaultG', defaultVFilepath: 'project/wofh1_4/scenes/defaultV'},domain = 'ru69.waysofhistory.com', waves = []})
    {
        this.player = player;
        this.city = city;
        this.country = country;
        this.scene = scene;
        this.domain = domain;
        this.waves = waves;
        this.wavesCount = this.waves.length;
    }

    static async toFile()
    {
        await this.toBinary();
    }

    static async fromFile(filename)
    {
        return this.fromBinary(await window.api.readFileBinary(filename));
    } 

    static async toBinary()
    {
        
    }
    static async fromBinary(buffer)
    {
        const reader = new BinaryReader(buffer);

        // ---- HEADER ----

        const endian = reader.readUint16();
        if (endian === 0x0001)  reader.setEndian(true); //LE
        else if (endian === 0x0100) reader.setEndian(false); //BE
        else throw new Error("Invalid endian marker");
        

        //Check signature
        const SIGNATURE = reader.readString();
        console.log('SIGNATURE: ', SIGNATURE);
        if(SIGNATURE != ACTUAL_PROJECT_SIGNATURE) throw new Error("ERROR process parse replay, signature is mismath.");
        //Check version
        const VERSION = reader.readUint8();
        console.log('VERSION: ', VERSION);
        if(VERSION != ACTUAL_VERSION) throw new Error(`ERROR process parse replay, version ${VERSION} does not supported.`);

        //Skip 1 byte 00
        reader.skip(1);

        //Check unknown bytes 1
        console.log('ACTUAL UNKNOWN CHECK BYTES 1: ', ACTUAL_UNKNOWN_CHECK_BYTES_1, ACTUAL_UNKNOWN_CHECK_BYTES_1.length);
        const UNKNOWN_CHECK_BYTES_1  = reader.readSubBuffer(ACTUAL_UNKNOWN_CHECK_BYTES_1.length);
        console.log('CHECK UNKNOWN BYTES 1: ', UNKNOWN_CHECK_BYTES_1);
        if(!compareArrays(ACTUAL_UNKNOWN_CHECK_BYTES_1, UNKNOWN_CHECK_BYTES_1)) throw new Error("ERROR process parse replay, unknown check bytes 1 is mismath.");
        console.log('CHECK UNKNOWN BYTES 1 PASSED');

        //Check factions and map info file 0c400414_18
        console.log('FACTIONS AND MAP INFO FILENAME LENGTH PEEK', reader.peekSubBuffer(4));
        const factionsMapInfoFilenameLength = reader.readUint32();
        console.log('FACTIONS AND MAP INFO FILENAME LENGTH', factionsMapInfoFilenameLength);
        const factionsMapInfoFilename = reader.readString(factionsMapInfoFilenameLength);
        console.log('FACTIONS AND MAP INFO FILENAME: ', factionsMapInfoFilename);
        if(factionsMapInfoFilename != ACTUAL_PROJECTINFO_FILENAME) throw new Error(`ERROR process parse replay, faction and map info filename ${factionsMapInfoFilename} does not supported.`);
        
        //Check unknown bytes 2
        console.log('ACTUAL UNKNOWN CHECK BYTES 2: ', ACTUAL_UNKNOWN_CHECK_BYTES_2, ACTUAL_UNKNOWN_CHECK_BYTES_2.length);
        const UNKNOWN_CHECK_BYTES_2  = reader.readSubBuffer(ACTUAL_UNKNOWN_CHECK_BYTES_2.length);
        console.log('CHECK UNKNOWN BYTES 2: ', UNKNOWN_CHECK_BYTES_2  );
        if(!compareArrays(ACTUAL_UNKNOWN_CHECK_BYTES_2, UNKNOWN_CHECK_BYTES_2)) throw new Error("ERROR process parse replay, unknown check bytes 2 is mismath.");
        console.log('CHECK UNKNOWN BYTES 2 PASSED');

        //Read scene info
        const defaultGFilepathInfoLength = reader.readUint16();
        const defaultGFilepathInfo = reader.readString(defaultGFilepathInfoLength);
        console.log('DEFAULT_G FILEPATH: ', defaultGFilepathInfo);
        const defaultVFilepathInfoLength = reader.readUint16();
        const defaultVFilepathInfo = reader.readString(defaultVFilepathInfoLength);
        console.log('DEFAULT_V FILEPATH: ', defaultVFilepathInfo);

        //Check unknown bytes 3
        console.log('ACTUAL UNKNOWN CHECK BYTES 3: ', ACTUAL_UNKNOWN_CHECK_BYTES_3, ACTUAL_UNKNOWN_CHECK_BYTES_3.length);
        const UNKNOWN_CHECK_BYTES_3  = reader.readSubBuffer(ACTUAL_UNKNOWN_CHECK_BYTES_3.length);
        console.log('CHECK UNKNOWN BYTES 3: ', UNKNOWN_CHECK_BYTES_3  );
        if(!compareArrays(ACTUAL_UNKNOWN_CHECK_BYTES_3, UNKNOWN_CHECK_BYTES_3)) throw new Error("ERROR process parse replay, unknown check bytes 3 is mismath.");
        console.log('CHECK UNKNOWN BYTES 3 PASSED');

        return new Replay({
            player: {id: 0, name: 'Noname'},
            city: {id: 0, name: 'Noname'}, 
            scene: {defaultGFilepath: defaultGFilepathInfo, defaultVFilepath: defaultVFilepathInfo },
            country: {id: 0, name: 'Noname', flag: '-.gif'},
            domain: 'ru69.waysofhistory.com', 
            waves: []
        });
    }
}