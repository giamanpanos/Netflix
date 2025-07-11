import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { useCardContext } from "./CardContext";

interface UtilsContextType {
  addToFavoriteList: (movie: Movie) => void;
  addToMovieLikesList: (movie: Movie) => void;
  movieList: Movie[];
  movieLikesList: Movie[];
  randomDuration: () => string;
}

const UtilsContext = createContext<UtilsContextType | null>(null);

export const UtilsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [movieList, setMovieList] = useState<Movie[]>(
    JSON.parse(localStorage.getItem("movieList") || "[]")
  );
  const [movieLikesList, setMovieLikesList] = useState<Movie[]>(
    JSON.parse(localStorage.getItem("movieLikesList") || "[]")
  );

  const { setCardState } = useCardContext();

  const addToFavoriteList = (movie: Movie) => {
    let list = localStorage.getItem("movieList");

    if (list) {
      try {
        const parsedList = JSON.parse(list) as Movie[];
        setMovieList(parsedList);

        const exists = parsedList.some((item: Movie) => item.id === movie.id);

        if (exists) {
          const newMovieList = parsedList.filter(
            (item: Movie) => item.id !== movie.id
          );
          setMovieList(newMovieList);
          localStorage.setItem("movieList", JSON.stringify(newMovieList));
          // @ts-expect-error: Issue with the type
          setCardState((prev: CardState) => ({
            ...prev,
            isHovered: false,
            item: null,
            cardId: null,
          }));
          return;
        }
      } catch (error) {
        localStorage.removeItem("movieList");
        setMovieList([]);
      }
    }

    const newMovieList = [...movieList, movie];
    setMovieList(newMovieList);

    try {
      localStorage.setItem("movieList", JSON.stringify(newMovieList));
    } catch (error) {
      console.error("Error Saving to Local Storage:", error);
    }
  };

  const addToMovieLikesList = (movie: Movie) => {
    let Likeslist = localStorage.getItem("movieLikesList");

    if (Likeslist) {
      try {
        const parsedList = JSON.parse(Likeslist) as Movie[];
        setMovieLikesList(parsedList);

        const exists = parsedList.some((item: Movie) => item.id === movie.id);

        if (exists) {
          const newMovieLikesList = parsedList.filter(
            (item: Movie) => item.id !== movie.id
          );
          setMovieList(newMovieLikesList);
          localStorage.setItem(
            "movieLikesList",
            JSON.stringify(newMovieLikesList)
          );
          // @ts-expect-error: Issue with the type
          setCardState((prev: CardState) => ({
            ...prev,
            isHovered: false,
            item: null,
            cardId: null,
          }));
          return;
        }
      } catch (error) {
        localStorage.removeItem("newMovieLikesList");
        setMovieLikesList([]);
      }
    }

    const newMovieLikesList = [...movieLikesList, movie];
    setMovieList(newMovieLikesList);

    try {
      localStorage.setItem("movieLikesList", JSON.stringify(newMovieLikesList));
    } catch (error) {
      console.error("Error Saving to Local Storage:", error);
    }
  };

  const randomDuration = () => {
    const randomMins = Math.floor(Math.random() * (200 - 60 + 1) + 60);

    const hrs = Math.floor(randomMins / 60);
    const mins = randomMins % 60;

    return `${hrs}h ${mins}m`;
  };

  return (
    <UtilsContext.Provider
      value={{
        addToFavoriteList,
        movieList,
        randomDuration,
        addToMovieLikesList,
        movieLikesList,
      }}
    >
      {children}
    </UtilsContext.Provider>
  );
};

export const useUtilsContext = (): UtilsContextType => {
  const context = useContext(UtilsContext);

  if (!context) {
    throw new Error("useUtilsContext must be useed within the UtilsProvider");
  }

  return context;
};
