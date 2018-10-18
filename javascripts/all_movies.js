

document.addEventListener('DOMContentLoaded', () => {
getMovies()
})
// Use AJAX to get the cryptids and append them to a table in the DOM
function getMovies() {
  console.log('getMovies Function');
  axios.get('http://localhost:3000/all_movies')
  .then((response) => {
    // handle success
    console.log(response);

    // DOM manipulation, need to create TRs, TDs
    response.data.forEach((movie) => {
      console.log('MOVIE IS>>>>', movie.id);
      let tbody = document.querySelector('#list-movies tbody')
      let tr = document.createElement('tr')
      let title = document.createElement('td')
      let director = document.createElement('td')
      let year = document.createElement('td')
      let rating = document.createElement('td')
      let del_td = document.createElement('td')
      let deleteButton = document.createElement('button')
      let editButton = document.createElement('td')
      title.innerText = movie.title
      director.innerText = movie.director
      year.innerText = movie.year
      rating.innerText = movie.rating
      deleteButton.innerText =  'X'
      editButton.innerHTML = `<a class="waves-effect waves-light btn" id='edit-button'>Edit</a>`

      deleteButton.setAttribute('data-id', movie.id)

      deleteButton.addEventListener('click', (ev) => {
        console.log('THE EVENT TARGET>>>>', event.target);
        let movieId = ev.target.getAttribute('data-id')
        console.log('id', movieId)

        // DELETE THIS RECORD!
        axios.delete(`http://localhost:3000/all_movies/${movieId}`)
        .then((response) => {
          deleteButton.parentElement.remove()
        })
        .catch((err) => {
          //console.log(err)
        })
      })

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
