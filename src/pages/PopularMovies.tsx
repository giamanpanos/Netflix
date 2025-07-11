import { useEffect, useState, type FC } from "react";
import Card from "../components/Card";
import { tmdbApi } from "../tmdbApi";

const PopularMovies: FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await tmdbApi.fetchPopularMovies();

      if (response.error) {
        setPopularMovies([]);
      } else if (response.data) {
        setPopularMovies(response.data.results);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="absolute top-36 flex flex-wrap px-12 pb-32 justify-around gap-4">
      {popularMovies.length > 0 ? (
        popularMovies.map((movie: Movie) => (
          <Card item={movie} key={movie.id} />
        ))
      ) : (
        <p className="text-white text-xl">No Movies Found...</p>
      )}
    </div>
  );
};

export default PopularMovies;
