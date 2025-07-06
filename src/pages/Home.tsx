import { useEffect, useState, type FC } from "react";
import { tmdbApi } from "../tmdbApi";
import { useMovieContext } from "../context/MovieContext";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";

const Home: FC = () => {
  const [genresWithMovies, setGenresWithMovies] = useState<
    GenreWithMovie[] | null
  >(null);

  const {
    setSelectedMovie,
    popularMovies,
    setPopularMovies,
    topRatedMovies,
    setTopRatedMovies,
    trendingMovies,
    setTrendingMovies,
  } = useMovieContext();

  useEffect(() => {
    const loadMovies = async () => {
      const [
        popularMoviesResult,
        topRatedMoviesResult,
        trendingMoviesResult,
        allGenres,
      ] = await Promise.all([
        tmdbApi.fetchPopularMovies(),
        tmdbApi.fetchTopRatedMovies(),
        tmdbApi.fetchTrendingMovies(),
        tmdbApi.getGenres(),
      ]);

      if (allGenres.error) {
        console.log(allGenres.error);
        setGenresWithMovies([]);
      } else if (allGenres.data) {
        const allGenresWithMovies = await Promise.all(
          allGenres.data?.genres.map(async (genre) => {
            const movies = await tmdbApi.getMoviesByGenre(genre.id);
            return {
              id: genre.id,
              name: genre.name,
              movies: movies?.data?.results,
            };
          })
        );
        // @ts-expect-error: Issue with the type
        setGenresWithMovies(allGenresWithMovies);
      }

      if (popularMoviesResult.error) {
        // set popular movies to an empty array
        // errors are handling in tmdbApi file
        setPopularMovies([]);
      } else if (popularMoviesResult.data) {
        const randomIndex = Math.floor(
          Math.random() * popularMoviesResult.data?.results.length
        );

        const randomMovie = popularMoviesResult.data?.results[randomIndex];

        setSelectedMovie(randomMovie);
        setPopularMovies(popularMoviesResult.data.results);
      }

      if (topRatedMoviesResult.error) {
        // set popular movies to an empty array
        // errors are handling in tmdbApi file
        setTopRatedMovies([]);
      } else if (topRatedMoviesResult.data) {
        setTopRatedMovies(topRatedMoviesResult.data.results);
      }

      if (trendingMoviesResult.error) {
        // set popular movies to an empty array
        // errors are handling in tmdbApi file
        setTrendingMovies([]);
      } else if (trendingMoviesResult.data) {
        setTrendingMovies(trendingMoviesResult.data.results);
      }
    };

    loadMovies();
  }, []);

  return (
    <div>
      <Hero />
      <div className="absolute w-full top-[31vh] i-pad:top-[37.5vh] i-pad-mini:top-[42.5vh] md:top-[65vh] lg:top-[85vh] pl-10 flex flex-col space-y-4">
        {popularMovies && (
          <Carousel title="Popular Movies" items={popularMovies} />
        )}
        {trendingMovies && (
          <Carousel title="Trending Movies" items={trendingMovies} />
        )}
        {topRatedMovies && (
          <Carousel title="Top-Rated Movies" items={topRatedMovies} />
        )}
        {genresWithMovies &&
          genresWithMovies.map((movieList) => (
            <Carousel
              key={movieList.id}
              title={`${movieList.name} Movies`}
              items={movieList.movies}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
