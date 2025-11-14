export class ReplayComponent 
{
    constructor(replay) 
    {
        this.replay = replay;
        this.element = null;
    }

    render() 
    {
        const div = document.createElement('div');
        div.className = "view-replays-listItem view-replays-common -com-bg -com-rounded -com-shadow -com-shadowEffect";
        div.dataset.id = this.replay.id;

        div.innerHTML = `
        <div class="view-replays-listItemNameText">${this.replay.account.name} ${this.replay.town.name} <img src="${this.replay.domain}/gen/flag/-${this.replay.country.flag}.gif" alt="FLAG"> </div>
        <span class="view-replays-listItemRules">Волн: 0</span>
        <button class="js-playBattle">Воспроизвести</button>
        `;
        //${this.replay.wavesCount}
        div.addEventListener('click', () => 
        {
            div.classList.toggle(-active);
        });

        div.querySelector('.js-playBattle').addEventListener('click', () => 
        {
            console.log('Запуск реплея:', this.replay.account.name);
            
        });

        this.element = div;
        return div;
    }
}