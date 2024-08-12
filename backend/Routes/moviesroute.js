const express = require('express')
const movieControllers=require('../controllers/moviecontrollers');
const { route } = require('../project');

let router=express.Router();

router.route('/').get(movieControllers.getmovies)
router.route('/:id').get(movieControllers.getmovie)

module.exports=router;