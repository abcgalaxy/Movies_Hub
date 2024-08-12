let types = [{genre:"Animation"},{type:"movie"},{type:"series"}];
let data = {};

async function fetchData() {
  // Create an array of promises for fetch requests
  const fetchPromises = types.map(async (Element) => {
    const params = new URLSearchParams({
      filters: JSON.stringify(Element),
      sort: JSON.stringify({ imdb_rating: -1 }),
      limit: 10
    });

    let response = await fetch(`http://127.0.0.1:5000/api/v1/movies?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

    let result = await response.json();
    let value = Object.values(Element)[0];
    data[value] = result;
  });

  // Wait for all fetch requests to complete
  await Promise.all(fetchPromises);
  // Now you can process the data
  processMovies();
}

function processMovies() {
  let top_imdb_movies = document.querySelector("#title2").nextElementSibling;
  let top_imdb_series = document.querySelector("#title3").nextElementSibling;
  let top_anime = document.querySelector("#title4").nextElementSibling;

  // Assuming you want to process 'movie' data
  if (data.movie) {
    data.movie.forEach(Element => {
      let anchor = document.createElement('a');
      let image = document.createElement("img");
      image.src = `${Element.poster}`;
      top_imdb_movies.append(anchor);
      anchor.href = `http://127.0.0.1:5500/frontend/Movie_details.html?id=${Element.imdb_id}`;
      anchor.append(image);
    });
  }
  if(data.series){
    data.series.forEach(Element => {
        let anchor= document.createElement('a');
        let image = document.createElement("img");
        image.id=Element.imdb_id;
        image.title=Element.title;
        image.src = `${Element.poster}`;
        top_imdb_series.append(anchor);
        anchor.href=`http://127.0.0.1:5500/frontend/Movie_details.html?id=${Element.imdb_id}`;
        anchor.append(image)

      });
  }
  if(data.Animation){
    data.Animation.forEach(Element => {
        let image = document.createElement("img");
        let anchor= document.createElement('a');
        image.id=Element.imdb_id;
        image.title=Element.title;
        image.src = `${Element.poster}`;
        top_anime.append(anchor);
        anchor.href=`http://127.0.0.1:5500/frontend/Movie_details.html?id=${Element.imdb_id}`;
        anchor.append(image)
      });
  }
}

// Call fetchData to start the process
fetchData().catch(error => console.error('Error fetching data:', error));
