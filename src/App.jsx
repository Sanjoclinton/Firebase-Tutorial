import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { addMovie, deleteMovie, getMoviesList } from "./config/firebase";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    releaseDate: "",
    receivedAnOscar: false,
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesList();

        setMovieList(data);
      } catch (err) {
        return err;
      }
    };

    fetchMovies();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmitMovie = async (e) => {
    e.preventDefault();
    try {
      await addMovie(formData);
    } catch (error) {
      console.error(error);
    }

    const data = await getMoviesList();

    setMovieList(data);
  };

  const onDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
    } catch (error) {
      return error;
    }

    const data = await getMoviesList();
    setMovieList(data);
  };

  return (
    <>
      <Auth />
      <form onSubmit={onSubmitMovie} className="p-4">
        {/* <div className="mb-5 flex gap-3 items-center "> */}
        <input
          className="border p-3 rounded-md"
          type="text"
          name="title"
          placeholder="Enter Movie title..."
          onChange={handleChange}
          value={formData.title}
          required
        />
        <input
          className="border p-3 rounded-md"
          type="number"
          name="releaseDate"
          placeholder="Enter release data..."
          onChange={handleChange}
          value={formData.releaseDate}
          required
        />

        <input
          id="oscar"
          type="checkbox"
          name="receivedAnOscar"
          onChange={handleChange}
          checked={formData.receivedAnOscar}
          required
        />
        <label htmlFor="oscar" className="font-bold text-green-700">
          Received an Oscar
        </label>
        {/* </div> */}
        <button className="block p-3 border rounded-md bg-green-600 text-white font-semibold shadow-md mt-5">
          Submit Movie
        </button>
      </form>
      {movieList && (
        <div className="mt-5 ms-5">
          <h1 className="font-bold">MOVIES LIST</h1>
          {movieList.map((movie) => (
            <div key={movie.title}>
              <h1
                style={{ color: movie.receivedAnOscar ? "green" : "red" }}
                key={movie.title}
              >
                {movie.title}
              </h1>
              <h1 key={movie.releaseDate}>{`Date: ${movie.releaseDate}`}</h1>
              <h1 key={movie.receivedAnOscar}>{movie.receivedAnOscar}</h1>
              <button
                onClick={() => onDeleteMovie(movie.id)}
                className="p-2 bg-red-500 rounded-md mt-2 text-white"
              >
                Delete Movie
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
