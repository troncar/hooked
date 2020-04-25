import React , {useReducer, useEffect} from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';
const  {KEY_API}  = require('./utils/keys');


const MOVIE_API_URL  = `http://www.omdbapi.com/?s=man&apikey=${KEY_API}`;

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch(action.type){
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload
      }
    case 'SEARCH_MOVIES_FAILURE':
      return{
        ...state,
        loading: false,
        errorMessage: action.error
      }
    default: return state;
  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlerError = () => {
    dispatch({
      type: 'SEARCH_MOVIES_FAILURE',
      error: 'Something bad happens' 
    })
  }


  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch(MOVIE_API_URL);
      const data = await response.json();
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: data.Search
      })
    }
    fetchData();
  },[]);
  

  const search = searchValue => {
    const searchData = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=${KEY_API}`);
        if(!!response){
          const data = await response.json();
          if(!!data.Response && !!data.Search){
            dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: data.Search
          });
          }
          else if(!!data.Error){
          	dispatch({
              type: "SEARCH_MOVIES_FAILURE",
              error: data.Error
          });

          }
        }
      } catch (e) {
        handlerError()
      }
    }
    searchData();
  }

  const buildData = (loading, errorMessage,movies) => {
    return (
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ): errorMessage ? (
        <div className="errorMessage">{errorMessage}</div>
        ):(
          movies.map((movie, index) => (
            <Movie key={`${index}--${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
     )
     
  }

  const { movies, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="HOOKED"></Header>
      <Search search={search}></Search>
      <p className="App-intro"> Sharing a few of out favorite movies</p>
      {buildData(loading,errorMessage, movies)}
    </div>
  );
}

export default App;
