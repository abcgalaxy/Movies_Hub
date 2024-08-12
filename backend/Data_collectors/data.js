const fs=require('fs')
const Movie=require('./models/movies');
const mongoose=require('mongoose')

//reading the titles of movies from json file

let movies_titles = fs.readFileSync('./backend/Data_collectors/movies_titles.json','utf-8');
movies_titles = JSON.parse(movies_titles);

//required functions to upload data
function check(value,data){

    if(value) return value.replace(/[\[\]']+/g, '').split(',');
    else console.log(data);
    return undefined;
}
const get_data=async (url)=>{
    let response = await fetch(url);  //fetch data from omdb api
    const data=await response.json();
    return data;
}

const upload =async(data)=>{
    let movie_data={
        title:data.Title,
        year:data.Year,
        genre:check(data.Genre,data),
        language:check(data.Language,data),
        directors:check(data.Director,data),
        writers:check(data.Writer,data),
        actors:check(data.Actors,data),
        plot:data.Plot,
        poster:data.Poster,
        rated:data.Rated,
        ratings:data.Ratings,
        type:data.Type,
        imdb_id:data.imdbID,
        runtime:data.Runtime,
        awards:data.Awards,
        release_date:data.Released,
        imdb_rating:data.imdbRating
    }
    await Movie.create(movie_data).catch(err=>{
        console.log(data.Title);
        console.log(err);
    }); //creating the file in movies collection
}


const upload_data=async(url)=>{
    const data=await get_data(url);
    await upload(data);
}

//connecting to database

mongoose.connect('mongodb://localhost:27017/movies_hub',{useNewUrlParser:true}).then((conn)=>{
    console.log("connected to database");
    let count=0;
    let keys= Object.keys(movies_titles);
    keys.forEach(key=>{
        const values=movies_titles[key];
        values.forEach(value=>{
            count++;
            if(count>0){
                let url=`http://www.omdbapi.com/?apikey=c6996a39&t=${value}&plot=full`;
                upload_data(url);
            }
        })
    })
    console.log(count)
}).catch(err=>{
    console.log("An error occured while connecting to database")
    console.log(err.data)
})

