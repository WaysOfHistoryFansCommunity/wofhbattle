const { invoke } = window.__TAURI__.tauri;

function getRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

function createSimulationUrl(lang, simulation, replay, project, domain) 
{
    const baseUrl = 'simulator.html';
    const params = new URLSearchParams();

    params.append('lang', lang);
    params.append('simulation', JSON.stringify(simulation));
    params.append('replay', replay);
    params.append('project', project);
    params.append('domain', domain);

    return `${baseUrl}?${params.toString()}`;
}

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
        if(spinbox.dataset.max)
        {
            if(spinboxValue < spinbox.dataset.max)
            {
                spinbox.value = spinboxValue + 1;
            }
            else
            {
                spinbox.value = spinboxValue;
            }
        }
        else
        {
            spinbox.value = spinboxValue + 1;
        }
    }

    checkSimbattleUnitval(spinbox);
}

function onTypeLessClick(event) 
{
    const lessElement = event.target;
    const spinboxWrp = lessElement.parentElement;
    const spinbox = spinboxWrp.querySelector(".spinbox");
    let spinboxValue = parseInt(spinbox.value);

    let spinboxMinValue = 0;
    if(typeof spinbox.dataset.min !== 'undefined') spinboxMinValue = parseInt(spinbox.dataset.min);

    if (spinbox.value.length === 0 || spinboxValue <= spinboxMinValue + 1) 
    {
        if(spinbox.value.length === 0 || spinboxMinValue == 0)
        {
            if(typeof spinbox.dataset.min !== 'undefined')
            {
                spinbox.value = 0;
            }
            else
            {
                spinbox.value = "";
            }
        }
        else
        {
            spinbox.value = spinboxMinValue;
        }
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

const smplSelectSelect = document.querySelector('.selectDefenseBuilding');
const simbattleDefLevelWrp = document.querySelector('.simbattle-defLevel-wrp');
const smplSelectInput = smplSelectSelect.querySelector('.smplSelect-input');
const smplSelectText = smplSelectSelect.querySelector('.smplSelect-text');

const smplSelectInputValues = [0, 3, 19, 38, 57];
const smplSelectTextValues = ['Без укреплений', 'Ров', 'Частокол', 'Стена', 'Укрепрайон'];

let smplSelectSelectCurrentValue = 0;

smplSelectSelect.addEventListener("click", () =>
{
    if(smplSelectSelectCurrentValue < smplSelectTextValues.length - 1)
    {
        smplSelectSelectCurrentValue++;
        smplSelectInput.value = smplSelectInputValues[smplSelectSelectCurrentValue];
        smplSelectText.textContent = smplSelectTextValues[smplSelectSelectCurrentValue];
        simbattleDefLevelWrp.classList.remove('-hidden');
    }
    else
    {
        smplSelectSelectCurrentValue = 0;
        smplSelectInput.value = smplSelectInputValues[smplSelectSelectCurrentValue];
        smplSelectText.textContent = smplSelectTextValues[smplSelectSelectCurrentValue];
        simbattleDefLevelWrp.classList.add('-hidden');
    }
});

const simbattleResetArmy = document.querySelector('.simbattle-resetArmy');
simbattleResetArmy.addEventListener("click", () =>
{
    spinboxWrpElements.forEach((spinboxWrp) =>
    {
        const spinbox = spinboxWrp.querySelector(".spinbox");
        if(spinbox.dataset.min)
        {
            spinbox.value = spinbox.dataset.min;
        }
        else
        {
            spinbox.value = "";
        }

        smplSelectSelectCurrentValue = 0;
        smplSelectInput.value = smplSelectInputValues[smplSelectSelectCurrentValue];
        smplSelectText.textContent = smplSelectTextValues[smplSelectSelectCurrentValue];
        simbattleDefLevelWrp.classList.add('-hidden');

        checkSimbattleUnitval(spinbox);
    });
});

const simbattleRun = document.querySelector('.simbattle-run');

simbattleRun.addEventListener('click', () => 
{
    console.log("Simulator battle run");
    
    const lang = 'ru';
    const simulation = {
        buildings: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        members: 
        {
            "0": 
            {
                army: {"26": 1},
                damageBonus: 100,
                fraction: 0,
                faction: 0
            },
            "1": 
            {
                army: {"14": 1},
                damageBonus: 100,
                fraction: 1,
                faction: 1
            }
        },
        map: 'map1'
    };

    const replay = getRandomInt(999999999);
    const project = 'wofh1_4';
    const domain = 'int22.waysofhistory.com';
    const windowTitle = `Simulation Window ${windowCount}`;
    const windowId = `window_${windowCount}`;
    windowCount++;

    const url = createSimulationUrl(lang, simulation, replay, project, domain);

    invoke('open_new_window', { url: url, title: windowTitle, id: windowId });
});