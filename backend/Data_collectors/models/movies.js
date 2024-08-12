const mongoose=require('mongoose');
const { type } = require('os');
const { object } = require('webidl-conversions');

const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please enter the movie name"],
    },
    year:{
        type:String,
        required:[false]
    },
    genre:{
        type:Object
        // required:[true,"please enter the genre of the movie"]
    },
    language:{
        type:Object
    },
    directors:{
        type:Object
    },
    writers:{
        type:Object
    },
    actors:{
        type:Object
    },
    plot:{
        type:String
        
    },
    poster:{
        type:String,
        // required:[true,'poster is not uploaded']
    },
    rated:{
        type:String
    },
    ratings:{
        type:Object
    },
    type:{
        type:String
    },
    imdb_id:{
        type:String,
        unique:true
    },
    runtime:{
        type:String
    },
    awards:{
        type:String
    },
    release_date:{
        type:String
    },
    imdb_rating:{
        type:String
    }
});

const Movie=mongoose.model('Movie',movieSchema);
module.exports=Movie