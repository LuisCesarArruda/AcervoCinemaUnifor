import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilmGrid from './components/FilmGrid';
import FilmModal from './components/FilmModal';
import Loading from './components/Loading';
import ErrorDisplay from './components/errorDisplay';
import { fetchFilmsFromSheet, getUniqueValues, getUniqueYears, getDurationCategory } from './services/googleSheetsService';

export default function App() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedFilm, setSelectedFilm] = useState(null);

  useEffect(() => {
    loadFilms();
  }, []);

  const loadFilms = async () => {
    try {
      const data = await fetchFilmsFromSheet();
      setFilms(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const genres = getUniqueValues(films, 'Gênero');
  const years = getUniqueYears(films);
  const disciplines = getUniqueValues(films, 'Disciplina');

  const filteredFilms = films.filter(film => {
    const matchesSearch =
      film['Título']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      film['Sinopse']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      film['Palavras-chaves']?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre = !selectedGenre || film['Gênero'] === selectedGenre;
    const matchesYear = !selectedYear || film['Ano'] === selectedYear;
    const matchesDiscipline = !selectedDiscipline || film['Disciplina'] === selectedDiscipline;

    const matchesDuration = !selectedDuration ||
      getDurationCategory(film['Duração']) === selectedDuration;

    return matchesSearch && matchesGenre && matchesYear && matchesDiscipline && matchesDuration;
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        genres={genres}
        years={years}
        disciplines={disciplines}
        selectedGenre={selectedGenre}
        selectedYear={selectedYear}
        selectedDiscipline={selectedDiscipline}
        selectedDuration={selectedDuration}
        onGenreChange={setSelectedGenre}
        onYearChange={setSelectedYear}
        onDisciplineChange={setSelectedDiscipline}
        onDurationChange={setSelectedDuration}
        resultCount={filteredFilms.length}
      />

      <main className="container mx-auto px-4 py-8">
        <FilmGrid
          films={filteredFilms}
          onFilmClick={setSelectedFilm}
        />
      </main>

      <FilmModal
        film={selectedFilm}
        onClose={() => setSelectedFilm(null)}
      />
    </div>
  );
}