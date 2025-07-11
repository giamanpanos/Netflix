import { useEffect, useState, type FC } from "react";
import Card from "../components/Card";
import { tmdbApi } from "../tmdbApi";

const TrendingMovies: FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await tmdbApi.fetchTrendingMovies();

      if (response.error) {
        setTrendingMovies([]);
      } else if (response.data) {
        setTrendingMovies(response.data.results);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="absolute top-36 flex flex-wrap px-12 pb-32 justify-around gap-4">
      {trendingMovies.length > 0 ? (
        trendingMovies.map((movie: Movie) => (
          <Card item={movie} key={movie.id} />
        ))
      ) : (
        <p className="text-white text-xl">No Movies Found...</p>
      )}
    </div>
  );
};

export default TrendingMovies;
