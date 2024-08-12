const Movie=require('../Data_collectors/models/movies');

exports.getmovies = async(req,res,next)=>{

    let num_movies=req.query.limit*1;
    let filters= JSON.parse(req.query.filters);
    let sorting=JSON.parse(req.query.sort);
    console.log(num_movies,filters,sorting);
    let movies = await Movie.find(filters).limit(num_movies).sort(sorting);
    console.log(movies)
    res.status(200).json(movies);
}

exports.getmovie = async(req,res,next)=>{
    let id = req.params.id;
    let movie = await Movie.find({imdb_id:id});
    console.log(movie);
    res.status(200).json(movie);
}