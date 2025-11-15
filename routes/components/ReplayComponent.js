export class ReplayComponent 
{
    constructor(id, replay, actions = {}) 
    {
        if (!id || !replay) 
        {
            throw new Error('ReplayComponent: id and replay are required');
        }
        this._id = id;
        this._replay = replay;
        this._actions = actions;
        this._handlers = new Map();
        this._elementsCache = {};
    }

    static _templateCache = new Map();
    
    static async ensureTemplate() 
    {
        if (!this._templateCache.has('default')) 
        {
            try 
            {
                const text = await fetch('./../components/ReplayComponent.html').then(r => 
                {
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    return r.text();
                });
                const tpl = document.createElement('template');
                tpl.innerHTML = text;
                this._templateCache.set('default', tpl);
            } 
            catch (error) 
            {
                console.error('Failed to load component template:', error);
                
                // Fallback template
                const fallbackTpl = document.createElement('template');
                fallbackTpl.innerHTML = '<div>Component template failed to load</div>';
                this._templateCache.set('default', fallbackTpl);
            }
        }
        return this._templateCache.get('default');
    }

    _onHoverReplayInfo()
    {
        this._element.classList.toggle('-active');
    }

    _onClickCopyReplayId() 
    {
        const clipboardElement = this._element.querySelector('.js-clipboard-tag');
        const text = clipboardElement?.textContent || `${this._id}`;
        window.api.writeClipboardText(text);
    }

    async render() 
    {
        if (this._element) return this._element;
        const template = await ReplayComponent.ensureTemplate();
        const element = template.content.firstElementChild.cloneNode(true);

        console.log(element);

        this._elementsCache.name = element.querySelector('.js-replay-name');
        this._elementsCache.flag = element.querySelector('.js-replay-countryflag-image');
        console.log(this._elementsCache.name);
        console.log(this._elementsCache.flag);

        await this.update();

        const clickHandler = e => 
        {
            const action = e.target.closest('[data-click-action]')?.dataset.clickAction;
            if (!action) return;

            if(this._actions[action]) 
            {
                this._actions[action](this._replay, e);
            }
            else if(action == 'open-replay-info')
            {
                this._onHoverReplayInfo();
            }
            else if(action == 'copy-replay-id')
            {
                this._onClickCopyReplayId();
            }
        }
        element.addEventListener('click', clickHandler);
        this._handlers.set('click', clickHandler);

        return (this._element = element);
    }

    async update()
    {
        if (!this._elementsCache || !this._elementsCache.name || !this._elementsCache.flag) throw new Error("Replay Component elements cache not found");

        const { account, town, domain, country } = this._replay;
        this._elementsCache.name.textContent = `${account.name} ${town.name}`;
        this._elementsCache.flag.src = `https://${domain}/gen/flag/-${country.flag}.gif`;
    }

    destroy() 
    {
        if (this._element) 
        {
            this._handlers.forEach((handler, type) => 
            {
                this._element.removeEventListener(type, handler);
            });
            this._element.remove();
            this._element = null;
        }
    }
}