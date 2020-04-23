import React, { useState, useEffect } from 'react'
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import MovieList from './MovieList';



const UpdateMovieForm = props =>{
    const initialMovie ={
        id: '',
        title: '',
        director: null,
        metascore: null,
        stars: []
    }
    const {push} = useHistory();
    const [movie, setMovie] = useState(initialMovie)
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res =>{
            console.log('res from useEffect', res)
            setMovie(
            res.data)
        }).catch(err=>
            console.log(err))
    }, [id])

    const changeHandler = e => {
        e.persist();
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const updateMovie = e =>{
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then( res =>{
            push(`/`);
        })
    }

    const star = index => e => {
        setMovie({
            ...movie,
            stars: movie.stars.map((star, starIndex)=>{
                return starIndex === index ? e.target.value : star;
            })
        })
    }

    const addStar = e => {
        e.preventDefault();
        setMovie({...movie, stars: [movie.stars, '']})
    }



    return(
        <form onSubmit={updateMovie}> 
            <input
            type="text"
            name="title"
            placeholder='Edit Title'
            value={movie.title}
            onChange={changeHandler}/>

            <input
            type='text'
            name="director"
            placeholder= 'Edit Director'
            value={movie.director}
            onChange={changeHandler}
            />
            <input
            type='text'
            name='metascore'
            value={movie.metascore}
            onChange={changeHandler}
            />

            {movie.stars.map((starName, index)=>{
                return(
                    <input 
                    type='text'
                    name='stars'
                    placeholder='Add a new star here'
                    value={starName}
                    onChange={star(index)}
                    
                    />
                    
                   
                )
              
            })}
            <button onClick={addStar}>Add Star</button>
            <button>Update Movie Info!</button>
        </form>
    )
}

export default UpdateMovieForm;