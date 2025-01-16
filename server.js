/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Hanson Chieu Student ID: 173632233 Date: January 16, 2025
*  Vercel Link: _______________________________________________________________
*
********************************************************************************/ 


const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const MoviesDB = require("./modules/moviesDB.js")
const db = new MoviesDB();


const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());   

app.get('/', (req, res) => {
    res.json({message:"API Listening"})
});


app.post('/api/movies', (req, res) => {
    db.Movie.create(req.body).then((movie) => {
        res.status(201).json(movie);
    }).catch((err) => {
        res.status(400).json({message:err});
    });
});

app.get('/api/movies', (req, res) => {
    db.Movie.find().then((movies) => {
        res.json(movies);
    }).catch((err) => {
        res.status(400).json({message:err});
    });
});

app.get('/api/movies/:id', (req, res) => {
    db.Movie.findById(req.params.id).then((movie) => {
        res.json(movie);
    }).catch((err) => {
        res.status(400).json({message:err});
    });
}); 

app.put('/api/movies/:id', (req, res) => {
    db.Movie.findByIdAndUpdate(req.params.id, req.body, {new:true}).then((movie) => {
        res.json(movie);
    }).catch((err) => {         
        res.status(400).json({message:err});
    });         
});

app.delete('/api/movies/:id', (req, res) => {
    db.Movie.findByIdAndDelete(req.params.id).then(() => {
        res.json({message:"Movie deleted"});
    }).catch((err) => {
        res.status(400).json({message:err});
    });
});


module.exports = (req, res) => {
    db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
        app.listen(HTTP_PORT, ()=>{
            console.log(`server listening on: ${HTTP_PORT}`);
        });
    }).catch((err)=>{
        console.log("Failed to initialize database:",err);
    });
};