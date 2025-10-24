const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;

export const fetchFilmsFromSheet = async () => {
    try {
        if (!API_KEY || API_KEY === 'sua_chave_api_aqui') {
            throw new Error('Configure a VITE_GOOGLE_API_KEY no arquivo .env');
        }

        if (!SPREADSHEET_ID) {
            throw new Error('Configure a VITE_SPREADSHEET_ID no arquivo .env');
        }

        const range = 'A:AO';
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Erro ao carregar filmes');
        }

        const data = await response.json();
        const rows = data.values;

        if (!rows || rows.length < 2) {
            return [];
        }

        const headers = rows[0];
        const filmsData = rows.slice(1).map(row => {
            const film = {};
            headers.forEach((header, index) => {
                film[header] = row[index] || '';
            });
            return film;
        });

        return filmsData;
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        throw error;
    }
};

export const getUniqueValues = (films, field) => {
    return [...new Set(films.map(f => f[field]).filter(Boolean))].sort();
};

export const getUniqueYears = (films) => {
    return [...new Set(films.map(f => f['Ano']).filter(Boolean))].sort().reverse();
};

export const parseDuration = (durationStr) => {
    if (!durationStr) return 0;

    const str = durationStr.trim();


    const apostropheMatch = str.match(/(\d+)'(\d+)''/);
    if (apostropheMatch) {
        const mins = parseInt(apostropheMatch[1]) || 0;
        const secs = parseInt(apostropheMatch[2]) || 0;
        return mins + (secs / 60);
    }


    const minOnlyMatch = str.match(/(\d+)'/);
    if (minOnlyMatch) {
        return parseInt(minOnlyMatch[1]) || 0;
    }

    const hourMinMatch = str.toLowerCase().match(/(\d+)\s*h(?:oras?)?\s*(\d+)?\s*m(?:in)?/);
    if (hourMinMatch) {
        const hours = parseInt(hourMinMatch[1]) || 0;
        const mins = parseInt(hourMinMatch[2]) || 0;
        return hours * 60 + mins;
    }

    const colonMatch = str.match(/(\d+):(\d+)/);
    if (colonMatch) {
        const hours = parseInt(colonMatch[1]) || 0;
        const mins = parseInt(colonMatch[2]) || 0;
        return hours * 60 + mins;
    }


    const minMatch = str.toLowerCase().match(/(\d+)\s*m(?:in)?/);
    if (minMatch) {
        return parseInt(minMatch[1]) || 0;
    }


    const hourMatch = str.toLowerCase().match(/(\d+)\s*h/);
    if (hourMatch) {
        return (parseInt(hourMatch[1]) || 0) * 60;
    }

    const numMatch = str.match(/(\d+)/);
    if (numMatch) {
        return parseInt(numMatch[1]) || 0;
    }

    return 0;
};

export const getDurationCategory = (durationStr) => {
    const minutes = parseDuration(durationStr);

    if (minutes <= 15) return 'curta';
    if (minutes <= 40) return 'media';
    return 'longa';
};