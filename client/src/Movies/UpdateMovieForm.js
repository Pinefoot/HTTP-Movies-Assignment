import React, { useState, useEffect } from 'react'
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

const initialMovie ={
    id: '',
    title: '',
    director: '',
    metascore: null,
    stars: []
}

const UpdateMovieForm = props =>{
    const {push} = useHistory();
    const {movie, setMovie} = useState(initialMovie)
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res =>{
            console.log('res from useEffect', res)
            setMovie({
                
                title: res.data.title,
                director: res.data.director,
                metascore: res.data.metascore,
                stars: escape.data.stars
            })
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
            push('/');
        })
    }

    return(
        <form onSubmit={updateMovie}> 
            <input
            type="text"
            name="title"
            placeholder='title'
            value={props.title}
            onChange={changeHandler}/>
            <input/>
            <input/>
            <input/>
        </form>
    )
}

export default UpdateMovieForm;