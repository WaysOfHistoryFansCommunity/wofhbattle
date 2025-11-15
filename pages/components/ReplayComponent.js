async function loadComponent(url) 
{
    const text = await fetch(url).then(r => r.text());
    const tpl = document.createElement('template');
    tpl.innerHTML = text;
    return tpl;
}

const replayTpl = await loadComponentData('/templates/replay.html');

export class ReplayComponent 
{
    constructor(replay, actions = {}) 
    {
        this.replay = replay;
        this.actions = actions;
    }

    render() 
    {
        const el = replayTpl.content.firstElementChild.cloneNode(true);

        el.querySelector('.js-replay-name').textContent = `${this.replay.account.name} ${this.replay.town.name}`;
        el.querySelector('.js-replay-countryflag-image').src = `https://${this.replay.domain}/gen/flag/-${this.replay.country.flag}.gif`;

        div.addEventListener('click', e => 
        {
            const action = e.target.closest('[data-action]')?.dataset.action;
            if (!action) return;

            if (this.actions[action]) 
            {
                this.actions[action](this.replay, e);
            }
        });

        return (this.element = div);
    }
}