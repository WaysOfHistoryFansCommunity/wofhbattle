function checkSimbattleUnitval(simbattleUnitval) 
{
    const simbattleUnitvalWrp = simbattleUnitval.parentElement.parentElement;
    const simbattleUnit = simbattleUnitvalWrp.querySelector(".simbattle-unit");

    if(simbattleUnit)
    {
        if (parseInt(simbattleUnitval.value) <= 0 || simbattleUnitval.value.length === 0)
        {
            simbattleUnit.classList.add('-type-empty');
        }
        else 
        {
            simbattleUnit.classList.remove('-type-empty');
        }
    }
}

function onSpinboxInput(event) 
{
    const simbattleUnitval = event.target;
    checkSimbattleUnitval(simbattleUnitval);
}

function onSpinboxKeypress(event) 
{
    const key = event.key;
    if (!/[0-9.]/.test(key)) 
    {
        event.preventDefault();
    }
}

function onTypeMoreClick(event) 
{
    const moreElement = event.target;
    const spinboxWrp = moreElement.parentElement;
    const spinbox = spinboxWrp.querySelector(".spinbox");
    let spinboxValue = parseInt(spinbox.value);

    if (spinbox.value.length === 0) 
    {
        spinbox.value = 1;
    } 
    else 
    {
        spinbox.value = spinboxValue + 1;
    }

    checkSimbattleUnitval(spinbox);
}

function onTypeLessClick(event) 
{
    const lessElement = event.target;
    const spinboxWrp = lessElement.parentElement;
    const spinbox = spinboxWrp.querySelector(".spinbox");
    let spinboxValue = parseInt(spinbox.value);

    if (spinbox.value.length === 0 || spinboxValue == 1) 
    {
        spinbox.value = "";
    } 
    else 
    {
        spinbox.value = spinboxValue - 1;
    }

    checkSimbattleUnitval(spinbox);
}



const spinboxWrpElements = document.querySelectorAll('.spinbox-wrp');

spinboxWrpElements.forEach((spinboxWrp) =>
{
    const spinbox = spinboxWrp.querySelector(".spinbox");
    const typeMore = spinboxWrp.querySelector(".-type-more");
    const typeLess = spinboxWrp.querySelector(".-type-less");
    
    spinbox.addEventListener("input", onSpinboxInput);
    spinbox.addEventListener('keypress', onSpinboxKeypress);

    typeMore.addEventListener("click", onTypeMoreClick);
    typeLess.addEventListener("click", onTypeLessClick);
});

const simbattleResetArmy = document.querySelector('.simbattle-resetArmy');

simbattleResetArmy.addEventListener("click", () =>
{
    spinboxWrpElements.forEach((spinboxWrp) =>
    {
        const spinbox = spinboxWrp.querySelector(".spinbox");
        spinbox.value = "";

        checkSimbattleUnitval(spinbox);
    });
});

const reportBattleView = document.querySelector('.report-battleView');
const simbattleSimhead = document.querySelector('.simbattle-simhead');
const simbattleArmyWrp = document.querySelector('.simbattle-army-wrp');

reportBattleView.addEventListener("change", () => 
{
    if(reportBattleView.checked)
    {
        simbattleSimhead.classList.remove('reverse');
        simbattleArmyWrp.classList.remove('reverse');
    }
    else
    {
        simbattleSimhead.classList.add('reverse');
        simbattleArmyWrp.classList.add('reverse');
    }
});