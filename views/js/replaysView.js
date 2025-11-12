function createReplayUrl(replay) 
{
    const baseUrl = 'game.html';
    const params = new URLSearchParams();

    params.append('lang', lang);
    params.append('project', project);
    params.append('domain', domain);
    params.append('type', 'replay');
    params.append('replay', replay);

    return `${baseUrl}?${params.toString()}`;
}
