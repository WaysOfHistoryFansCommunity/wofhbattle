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
import { Replay } from '../../core/structures/Replay.js';

let replayFiles = await window.api.readDir('replays/');
console.log(replayFiles);
let replays = {};
let replayComponents = {};
let currentReplay = null;
let selectedReplay = null;

function reloadReplays() 
{

}

function createNewReplay()
{

}

async function loadNewReplay(filename) {
    const replay = await Replay.fromFile('replays/' + filename);
    replays[filename] = replay;

    const replayComponent = new ReplayComponent(replay, {
        "play-replay": onPlayReplay,
        "delete-replay": onDelete,
        "edit-replay": onEdit
    });
    
    replayComponents[filename] = replayComponent;

    document.querySelector('.replaysContainer').appendChild(replayComponent.render());
}

function reloadComponents()
{

}


for (const filename of replayFiles) 
{
    await loadNewReplay(filename);
}