import { useEffect, useState, type FC } from "react";
import Card from "../components/Card";
import { tmdbApi } from "../tmdbApi";

const NewMovies: FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await tmdbApi.fetchTopRatedMovies();

      if (response.error) {
        setMovies([]);
      } else if (response.data) {
        setMovies(response.data.results);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="absolute top-36 flex flex-wrap px-12 pb-32 justify-around gap-4">
      {movies.length > 0 ? (
        movies.map((movie: Movie) => <Card item={movie} key={movie.id} />)
      ) : (
        <p className="text-white text-xl">No Movies Found...</p>
      )}
    </div>
  );
};

export default NewMovies;
