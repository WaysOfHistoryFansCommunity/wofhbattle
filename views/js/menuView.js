document.querySelector('.button-run-playbattle').addEventListener('click', async () => 
{
    const clipboardText = await window.api.readClipboardText();
    console.log('Из буфера:', clipboardText);
    /*window.api.createWindow(
    {
        url: 'views/replays.html',
        title: 'Пути Истории Список Повторов',
        width: 1200,
        height: 900,
        favicon: 'faviconBattle.ico'
    });*/
});

document.querySelector('.button-run-replays').addEventListener('click', () => 
{
    window.api.createWindow(
    {
        url: 'views/replays.html',
        title: 'Список Повторов',
        width: 980,
        height: 800,
        resizable: false, 
        minimizable: false, 
        maximizable: false
    });
});

document.querySelector('.button-run-simulator').addEventListener('click', () => 
{
    window.api.createWindow(
    {
        url: 'views/simulator.html',
        title: 'Симулятор боя (АЛЬФА)',
        width: 995,
        height: 750,
        resizable: false, 
        minimizable: false, 
        maximizable: false
    });
});

document.querySelector('.button-run-settings').addEventListener('click', () => 
{
    window.api.createWindow(
    {
        url: 'views/settings.html',
        title: 'Настройки',
        width: 800,
        height: 600,
        resizable: false, 
        minimizable: false, 
        maximizable: false
    });
});