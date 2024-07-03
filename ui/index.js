const simbattleUnitvalWrps = document.querySelectorAll('.simbattle-unitval-wrp');

function onSimbattleUnitvalOnInput(event)
{
    const simbattleUnitval = event.target;
    const simbattleUnitvalWrp = simbattleUnitval.parentElement.parentElement;

    const simbattleUnit = simbattleUnitvalWrp.querySelector(".simbattle-unit");

    if(parseInt(simbattleUnitval.value) <= 0 || simbattleUnitval.value.length == 0)
    {
        simbattleUnit.classList.add('-type-empty');
    }
    else
    {
        simbattleUnit.classList.remove('-type-empty');
    }
}
function onSimbattleUnitvalOnKeypress(event) 
{
    const key = event.key;
    if(!/[0-9.]/.test(key))
    {
        event.preventDefault();
    }
}

function onSimbattleLessOnClick(event)
{
    const lessElement = event.target;
}

function onSimbattleMoreOnClick(event)
{
    const moreElement = event.target;
}

simbattleUnitvalWrps.forEach((simbattleUnitvalWrp) => 
{
    const simbattleUnitval = simbattleUnitvalWrp.querySelector('.simbattle-unitval');
    const simbattleLess = simbattleUnitvalWrp.querySelector('.-type-less');
    const simbattleMore = simbattleUnitvalWrp.querySelector('.-type-more');

    simbattleUnitval.addEventListener("input", onSimbattleUnitvalOnInput);
    simbattleUnitval.addEventListener('keypress', onSimbattleUnitvalOnKeypress);
    simbattleLess.addEventListener("click", onSimbattleLessOnClick);
    simbattleMore.addEventListener("click", onSimbattleMoreOnClick);
});