async function loadComponentData(url) 
{
    const text = await fetch(url).then(r => r.text());
    const tpl = document.createElement('template');
    tpl.innerHTML = text;
    return tpl;
}

const replayComponentData = await loadComponentData('/ReplayComponent.html');

export class ReplayComponent 
{
    constructor(id, replay, actions = {}) 
    {
        this.replay = replay;
        this.actions = actions;
    }

    render() 
    {
        const el = replayComponentData.content.firstElementChild.cloneNode(true);

        el.querySelector('.js-replay-name').textContent = `${this.replay.account.name} ${this.replay.town.name}`;
        el.querySelector('.js-replay-countryflag-image').src = `https://${this.replay.domain}/gen/flag/-${this.replay.country.flag}.gif`;

        el.addEventListener('click', e => 
        {
            const action = e.target.closest('[data-action]')?.dataset.action;
            if (!action) return;

            if(this.actions[action]) 
            {
                this.actions[action](this.replay, e);
            }
            else if(action == 'hover-replay-info')
            {
                el.classList.toogle('-active');
            }
            else if(action == 'clipboard-replay-name')
            {
                const clipboardText = el.querySelector('js-clipboard-tag');
                console.log(clipboardText);
                window.api.writeClipboardText(clipboardText);
            }
        });

        return (this.element = el);
    }
}