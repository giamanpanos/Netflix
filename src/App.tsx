import { type FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { MovieProvider, useMovieContext } from "./context/MovieContext";
import { CardProvider, useCardContext } from "./context/CardContext";
import PopUpCard from "./components/PopUpCard";
import { UtilsProvider } from "./context/UtilsContext";
import Modal from "./components/Modal";
import { Toaster } from "react-hot-toast";

const App: FC = () => {
  return (
    <MovieProvider>
      <CardProvider>
        <UtilsProvider>
          <Router>
            <MainContent />
          </Router>
        </UtilsProvider>
      </CardProvider>
    </MovieProvider>
  );
};

export default App;

const MainContent: FC = () => {
  const { cardState } = useCardContext();

  const { selectedMovie, isModalOpen, setIsModalOpen } = useMovieContext();

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <PopUpCard
        isHovered={cardState.isHovered}
        x={cardState.position?.x || 0}
        y={cardState.position?.y || 0}
      />
      {selectedMovie && (
        <Modal
          movieData={selectedMovie}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/watch/:id" element={<Watch />}></Route>
        <Route path="/myList" element={<MyList />}></Route>
        <Route path="/search/:query" element={<Search />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
