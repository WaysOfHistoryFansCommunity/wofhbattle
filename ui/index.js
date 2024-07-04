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
        spinbox.value = spinboxValue++;
    }

    checkSimbattleUnitval(spinbox);
}

function onTypeLessClick(event) 
{
    const lessElement = event.target;
    const spinboxWrp = lessElement.parentElement;
    const spinbox = spinboxWrp.querySelector(".spinbox");
    let spinboxValue = parseInt(spinbox.value);

    if (spinbox.value.length === 0 || spinboxValue <= 1) 
    {
        spinbox.value = "";
    } 
    else 
    {
        spinbox.value = spinboxValue--;
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

const defenseArmy = document.querySelector('.defense-army');
const attackArmy = document.querySelector('.attack-army');

const simbattleSimheadWarBonusDefense = document.querySelector('.simbattle-simhead-warBonusDefense');
const simbattleSimheadWarBonusAttack = document.querySelector('.simbattle-simhead-warBonusAttack');

const simbattleСhangeArmy = document.querySelector('.simbattle-changeArmy');

simbattleСhangeArmy.addEventListener("click", () =>
{
    const units = defenseArmy.querySelectorAll('.-sim-army-defense');
    
    units.forEach((defenseUnit) =>
    {
        const defenseUnitId = defenseUnit.dataset.id;
        const defenseUnitValue = defenseUnit.value;

        if(defenseUnitId)
        {
            const attackUnit = attackArmy.querySelector(".-sim-army-attack[data-id='"+ defenseUnitId +"']");
            if(attackUnit)
            {
                const attackUnitValue = attackUnit.value;
                attackUnit.value = defenseUnitValue;
                defenseUnit.value = attackUnitValue;
                
                checkSimbattleUnitval(attackUnit);
                checkSimbattleUnitval(defenseUnit);
            }
            else
            {
                defenseUnit.value = "";
                checkSimbattleUnitval(defenseUnit);
            }
        }
        else
        {
            defenseUnit.value = "";
            checkSimbattleUnitval(defenseUnit);
        }
    });

    
    const simbattleSimheadWarBonusDefenseValue = simbattleSimheadWarBonusDefense.value;
    const simbattleSimheadWarBonusAttackValue = simbattleSimheadWarBonusAttack.value;
    
    simbattleSimheadWarBonusDefense.value = simbattleSimheadWarBonusAttackValue;
    simbattleSimheadWarBonusAttack.value = simbattleSimheadWarBonusDefenseValue;
});

const reportBattleView = document.querySelector('.report-battleView');
const simbattleSimhead = document.querySelector('.simbattle-simhead');
const simbattleArmyWrp = document.querySelector('.simbattle-army-wrp');

reportBattleView.addEventListener("change", () => 
{
    if(reportBattleView.checked)
    {
        simbattleSimhead.classList.add('reverse');
        simbattleArmyWrp.classList.add('reverse');
    }
    else
    {
        simbattleSimhead.classList.remove('reverse');
        simbattleArmyWrp.classList.remove('reverse');
    }
});

const smplSelectInput = document.querySelector('.smplSelect');
const smplSelectText = smplSelectInput.querySelector('.smplSelect-text');

const smplSelectInputValues = [0, 3, 19, 38, 57];
const smplSelectInputStrValues = ['Без укреплений', 'Ров', 'Частокол', 'Стена', 'Укрепрайон'];

const smplSelectInputCurrentValue = 0;

smplSelectInput.addEventListener("click", () =>
{
    console.log(smplSelectInputCurrentValue);
    if(smplSelectInputCurrentValue < smplSelectInputValues.length)
    {
        smplSelectInputCurrentValue++;
        smplSelectInput.value = smplSelectInputStrValues[smplSelectInputCurrentValue];

    }
    else
    {
        smplSelectInputCurrentValue = 0;
        smplSelectInput.value = smplSelectInputStrValues[smplSelectInputCurrentValue];
    }
});