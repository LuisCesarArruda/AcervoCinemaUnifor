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

        const range = 'A:AL';
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