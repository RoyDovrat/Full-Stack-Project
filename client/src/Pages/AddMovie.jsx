import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MOVIES_URL = 'http://localhost:8000/movies';
const CREATE_MOVIE_PERMISSION = "Create Movies";

function AddMovie() {
  const [newMovie, setNewMovie] = useState({
    name: '',
    genres: '',
    image: '',
    premiered: '',
  });
  const currUser = useSelector((state) => state.currUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addMovie = async () => {
    try {
      const { data } = await axios.post(MOVIES_URL, newMovie);
      dispatch({ type: 'ADD_MOVIE', payload: data });
      console.log(`Movie added successfully. ID: ${data._id}, Name: ${data.name}`);
      alert(`Movie "${data.name}" added successfully.`);
      navigate('/main/movies-management/all-movies')
    } catch (error) {
      console.error('Error adding movie:', error.response?.data || error.message);
    }
  };


  return (
    <>
      <h2>Add New Movie: </h2>
     {currUser?.permissions?.includes(CREATE_MOVIE_PERMISSION) && <div className="movie-container">
        <span className="movie-info-label">Name:</span>
        <input type="text" onChange={(e) => { setNewMovie({ ...newMovie, name: e.target.value }); }} />
        <br /> <br />
        <span className="movie-info-label">Genres:</span>
        <input type="text" onChange={(e) => { setNewMovie({ ...newMovie, genres: e.target.value }); }} />
        <br /> <br />
        <span className="movie-info-label">Image Url:</span>
        <input type="text" onChange={(e) => { setNewMovie({ ...newMovie, image: e.target.value }); }} />
        <br /> <br />
        <span className="movie-info-label">Premiered</span>
        <input type="date" min={1} onChange={(e) => { setNewMovie({ ...newMovie, premiered: e.target.value }); }} />
        <br /> <br />
        <button onClick={addMovie}>Save</button>
        <button onClick={() => navigate('/main/movies-management/all-movies')}>Cancel</button>
      </div>}
    </>
  );
}

export default AddMovie;
