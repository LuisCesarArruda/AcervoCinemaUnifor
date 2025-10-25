import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FilmRows from './components/FilmRows';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    loadFilms();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    const matchesDuration = !selectedDuration || getDurationCategory(film['Duração']) === selectedDuration;

    return matchesSearch && matchesGenre && matchesYear && matchesDiscipline && matchesDuration;
  });

  // Agrupar filmes por gênero
  const filmsByGenre = {};
  filteredFilms.forEach(film => {
    const genre = film['Gênero'] || 'Outros';
    if (!filmsByGenre[genre]) {
      filmsByGenre[genre] = [];
    }
    filmsByGenre[genre].push(film);
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }
  const randomIndex = Math.floor(Math.random() * filteredFilms.length);
  const featuredFilm = filteredFilms[randomIndex]


  // Verifica se tem filtros ativos
  const hasActiveFilters = searchTerm || selectedGenre || selectedYear || selectedDiscipline || selectedDuration;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        scrolled={scrolled}
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
      />

      {featuredFilm && !hasActiveFilters && (
        <HeroSection
          film={featuredFilm}
          onPlayClick={() => setSelectedFilm(featuredFilm)}
        />
      )}

      <div className={hasActiveFilters ? 'pt-50' : ''}>
        <FilmRows
          filmsByGenre={filmsByGenre}
          onFilmClick={setSelectedFilm}
        />
      </div>

      <FilmModal
        film={selectedFilm}
        onClose={() => setSelectedFilm(null)}
      />
    </div>
  );
}