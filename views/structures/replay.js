import { parseReplay } from "../modules/ReplayParser";

export class Replay 
{
    constructor({id = 0, player = {id: 0, name: ''}, city = {id: 0, name: ''}, country = {id: 0, name: '', flag: '-.gif'}, domain = 'ru69.waysofhistory.com', waves = []})
    {
        this.id = id;
        this.player = player;
        this.city = city;
        this.country = country;
        this.domain = domain;
        this.waves = waves;
        this.wavesCount = this.waves.length;
    }

    static fromFile(filename)
    {
        
    } 

    static fromBinary(buffer)
    {
        const data = parseReplay(buffer);
        return new Replay(data);
    }
}