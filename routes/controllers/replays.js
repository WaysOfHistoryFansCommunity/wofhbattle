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

class ReplayInstancesManager
{
    constructor(replaysContainer = '.mainReplaysContainer')
    {
        this._replaysInstances = {};
        this._currentReplayInstance = null;
        this._selectedReplayInstance = null;

        this._replaysContainer = document.querySelector(replaysContainer);
        if (!this._replaysContainer)
        {
            throw new Error('ReplaysController ReplayInstancesManager instance: Replays container not set.');
        }
    }
    async loadFromDir(dirname)
    {
        this._replayIds = await window.api.readDir(dirname);
        
    }

    get replaysContainer()
    {
        return this._replaysContainer;
    }

    set replaysContainer(replaysContainer)
    {
        this._replaysContainer = replaysContainer;
    }

    async render()
    {
        if(!this._replayIds) throw new Error("ReplaysController ReplayInstancesManager render replayIds is empty.");
        
        for (const id of await this._replayIds) 
        {
            try 
            {
                const replayInstance = new ReplayInstance(id, this);
                await replayInstance.load();
                this._replaysInstances[id] = replayInstance;
                await replayInstance.render(this._replaysContainer);
            } 
            catch (error) 
            {
                console.error(`Failed to load replay ${id}:`, error);
            }
        }
    }
    deleteInstanceCallback(id)
    {
        delete this._replaysInstances[id];
    }

    destroy() 
    {
        Object.values(this._replaysInstances).forEach(instance => instance.destroy());
        this._replaysInstances = {};
        this._currentReplayInstance = null;
        this._selectedReplayInstance = null;
    }
}

class ReplayInstance 
{
    constructor(id, replayInstancesManager) 
    {
        this._id = id;
        this._data = {};
        this._component = null;
        this._replayInstancesManager = replayInstancesManager;
    }

    async load()
    {
        this._data = await Replay.fromFile('replays/' + this._id);
        this._component = new ReplayComponent(this._id, this._data, 
        {
            'play-replay': () => this.onPlay(),
            'edit-replay': () => this.onEdit(),
            'delete-replay': () => this.onDestroy()
        });
    }

    async render() 
    {
        if (this._replayInstancesManager.replaysContainer && this._component) 
        {
            this._replayInstancesManager.replaysContainer.appendChild(await this._component.render());
        }
    }

    onPlay()
    {

    }

    onEdit() 
    {
        
    }

    onDestroy() 
    {
        this.destroy();
    }

    destroy()
    {
        this._component?.destroy();
        this._data = null;
        this._replayInstancesManager?.deleteInstanceCallback(this._id);
    }
}

const mainReplayInstancesManager = new ReplayInstancesManager();

await mainReplayInstancesManager.loadFromDir('replays/');
await mainReplayInstancesManager.render();