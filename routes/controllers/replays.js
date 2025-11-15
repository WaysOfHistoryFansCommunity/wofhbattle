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

let replaysContainer = document.querySelector('.replaysContainer');
let replayFiles = await window.api.readDir('replays/');
console.log(replayFiles);

let replaysInstances = {};
let currentReplay = null;
let selectedReplay = null;

class ReplayInstance 
{
    constructor(id) 
    {
        this.id = id;
    }

    async load()
    {
        this.data = await Replay.fromFile('replays/' + filename);
        this.component = new ReplayComponent(this.data, 
        {
            'play-replay': this.onPlay,
            'edit-replay': this.onEdit,
            'delete-replay': this.onDestroy
        });
        
        replayComponents[filename] = replayComponent;

        
    }

    render(parent) 
    {
        replaysContainer.appendChild(replayComponent.render());
    }

    onPlay()
    {

    }

    onEdit() 
    {
        
    }

    onDestroy() 
    {
        this.component.destroy();
        this.data = null;
    }
}

for (const filename of replayFiles) 
{
    const replayInstance = new ReplayInstance(filename);
    await replayInstance.load();
    replaysInstances[filename] = replayInstance;
    replayInstance.render();
}