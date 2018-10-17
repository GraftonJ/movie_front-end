

document.addEventListener('DOMContentLoaded', () => {
console.log('Connected to all_movies.js')
getMovies()
// Use AJAX to get the cryptids and append them to a table in the DOM
function getMovies() {
  console.log('getMovies Function');
  axios.get('http://localhost:3000/all_movies')
  .then((response) => {
    // handle success
    console.log(response);

    // DOM manipulation, need to create TRs, TDs
    response.data.forEach((movie) => {
      console.log(movie);
      let tbody = document.querySelector('#list-movies tbody')
      let tr = document.createElement('tr')
      let title = document.createElement('td')
      let director = document.createElement('td')
      let year = document.createElement('td')
      let rating = document.createElement('td')
      let deleteButton = document.createElement('td')
      let editButton = document.createElement('td')
      title.innerText = movie.title
      director.innerText = movie.director
      year.innerText = movie.year
      rating.innerText = movie.rating
      deleteButton.innerHTML =  `<a class="waves-effect waves-light btn" id='delete-button'>Delete</a>`
      editButton.innerHTML = `<a class="waves-effect waves-light btn" id='edit-button'>Edit</a>`

      // append IMG, to the TD, append the TDs to the TR, the TR to the TBODY
      tr.appendChild(title)
      tr.appendChild(director)
      tr.appendChild(year)
      tr.appendChild(rating)
      tr.appendChild(deleteButton)
      tr.appendChild(editButton)
      tbody.appendChild(tr)
    })

  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
}

})
