export function parseReplay(buffer) 
{
    const view = new DataView(buffer.buffer);
    let offset = 0;

    return {
        id: '',
        player: { id: 0, name: '' },
        city: { id: 0, name: '' },
        country: { id: 0, name: '' },
        domain: '',
        waves: [],
    };
}