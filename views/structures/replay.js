import { parseReplay } from "../modules/ReplayParser.js";

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

    static async fromFile(filename)
    {
        return this.fromBinary(await window.api.readFileBinary(filename));
    } 

    static async fromBinary(buffer)
    {
        const data = parseReplay(buffer);
        return new Replay(data);
    }
}