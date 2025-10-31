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
  const [featuredFilm, setFeaturedFilm] = useState(null);
  const [selectedSubGenre, setselectedSubGenre] = useState("")

  useEffect(() => {
    loadFilms();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // useEffect(() => {
  //   if (films.length > 0 && !featuredFilm) {
  //     const randomIndex = Math.floor(Math.random() * films.length);
  //     setFeaturedFilm(films[randomIndex]);
  //   }
  // }, [films, featuredFilm]);

  useEffect(() => {
    if (films.length > 0 && !featuredFilm) {
      const tccFilms = films.filter(film =>
        film['Disciplina']?.toLowerCase().includes('tcc') ||
        film['Categoria']?.toLowerCase().includes('tcc')
      );

      const filmsToChooseFrom = tccFilms.length > 0 ? tccFilms : films;
      const randomIndex = Math.floor(Math.random() * filmsToChooseFrom.length);
      setFeaturedFilm(filmsToChooseFrom[randomIndex]);
    }
  }, [films, featuredFilm]);

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
  const subGenres = getUniqueValues(films, 'Subgênero');
  const years = getUniqueYears(films);
  const disciplines = getUniqueValues(films, 'Disciplina');

  const filteredFilms = films.filter(film => {
    const matchesSearch =
      film['Título']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      film['Sinopse']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      film['Palavras-chaves']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      film['Direção']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      film['Subgênero']?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGenre = !selectedGenre || film['Gênero'] === selectedGenre;
    const matchesSubGenre = !selectedSubGenre || film['Subgênero'] === selectedSubGenre;
    const matchesYear = !selectedYear || film['Ano'] === selectedYear;
    const matchesDiscipline = !selectedDiscipline || film['Disciplina'] === selectedDiscipline;
    const matchesDuration = !selectedDuration || getDurationCategory(film['Duração']) === selectedDuration;

    return matchesSearch && matchesGenre && matchesYear && matchesDiscipline && matchesDuration && matchesSubGenre;
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

  const filmsBySubGenre = {};
  filteredFilms.forEach(film => {
    const subGenre = film['Subgênero'] || 'Outros';
    if (!filmsBySubGenre[subGenre]) {
      filmsBySubGenre[subGenre] = [];
    }
    filmsBySubGenre[subGenre].push(film);
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }



  // Verifica se tem filtros ativos
  const hasActiveFilters = searchTerm || selectedSubGenre || selectedYear || selectedDiscipline || selectedDuration;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        scrolled={scrolled}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        subGenres={subGenres}
        years={years}
        disciplines={disciplines}
        selectedSubGenre={selectedSubGenre}
        selectedYear={selectedYear}
        selectedDiscipline={selectedDiscipline}
        selectedDuration={selectedDuration}
        onSubGenreChange={setselectedSubGenre}
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

      <div className={hasActiveFilters ? 'pt-70' : ''}>
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