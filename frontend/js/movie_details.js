const urlParams = new URLSearchParams(window.location.search);
const imdb_id=urlParams.get('id');

const hello=(async(id)=>{
    let response= await fetch(`http://127.0.0.1:5000/api/v1/movies/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
    let data = await response.json();
    data = data[0];
    const img_id = document.querySelector('#movie_img')
    img_id.src=data.poster;
    img_id.alt=data.title;

    let title = document.querySelector('#title')
    let rated = document.querySelector('#rated')
    let languages = document.querySelector('#languages')
    let genre = document.querySelector('#genre')
    let type = document.querySelector('#type')
    let release_date = document.querySelector('#release_date')
    let runtime = document.querySelector('#runtime')
    let actors = document.querySelector('#actors')
    let directors = document.querySelector('#directors')
    let awards = document.querySelector('#awards')
    let plot = document.querySelector('#plot')

    title.append(data.title)
    rated.append(data.rated)
    languages.append(data.language)
    genre.append(data.genre)
    type.append(data.type)
    release_date.append(data.release_date)
    runtime.append(data.runtime)
    actors.append(data.actors)
    directors.append(data.directors)
    awards.append(data.awards)
    plot.append(data.plot)
})

hello(imdb_id);