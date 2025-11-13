/*
function playReplay(replay) 
{
    const baseUrl = 'engine.html';
    const params = new URLSearchParams();

    params.append('lang', lang);
    params.append('project', project);
    params.append('domain', domain);
    params.append('type', 'replay');
    params.append('replay', replay);

    return `${baseUrl}?${params.toString()}`;
}*/

import { ReplayComponent } from '../components/replayComponent.js';
import { Replay } from '../structures/Replay.js';

let replayFiles = await window.api.readDir('replays/');
let replays = {};
let currentReplay = null;
let selectedReplay = null;

function reloadReplaysFromFiles() 
{

}

function createNewReplay()
{

}

function loadNewReplay()
{

}

function reloadComponents()
{

}


console.log(replayFiles);

for (const replayId of replayFiles) 
{
    const replay = await Replay.fromFile(replayId);
    replays[replayId] = replay;

    //const replayComponent = new ReplayComponent(replay);
    //replayComponent.render();
}