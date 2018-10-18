

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
      //console.log('MOVIE IS>>>>', movie.id);
      let tbody = document.querySelector('#list-movies tbody')
      let tr = document.createElement('tr')
      let title = document.createElement('td')
      let director = document.createElement('td')
      let year = document.createElement('td')
      let rating = document.createElement('td')
      let del_td = document.createElement('td')
      let deleteButton = document.createElement('button')
      let edit_td= document.createElement('td')
      let editButton = document.createElement('button')
      title.innerText = movie.title
      director.innerText = movie.director
      year.innerText = movie.year
      rating.innerText = movie.rating
      deleteButton.innerText =  'Delete'
      editButton.innerText = `Edit`

      deleteButton.setAttribute('data-id', movie.id)
      deleteButton.setAttribute('class', 'waves-effect waves-light btn')

      editButton.setAttribute('data-id', movie.id)
      editButton.setAttribute('class', 'waves-effect waves-light btn')

      deleteButton.addEventListener('click', (ev) => {
        console.log('THE EVENT TARGET>>>>', event.target);
        let movieId = ev.target.getAttribute('data-id')
        console.log('id', movieId)

        // DELETE THIS RECORD!
        axios.delete(`http://localhost:3000/all_movies/${movieId}`)
        .then((response) => {
          del_td.parentElement.remove()
        })
        .catch((err) => {
          //console.log(err)
        })
      })

      //EDIT A MOVIE LISTED IN THE TABLE
      editButton.addEventListener('click', (ev) => {
        console.log('MOVIE IN EDIT', movie.title);
        //Get the ID of the movie for which the edit button was clicked
        let movieId = ev.target.getAttribute('data-id')
        //Hide the movie table
        const pageContainer = document.getElementsByClassName('page-container')[0]
        const movieTable = document.getElementsByClassName('movie-table-container')[0]
        movieTable.style.visibility = 'hidden'
        //Create a form with the fields prefield from
        let editForm = document.createElement('form')
        editForm.innerHTML = `<form id="create-movie">
          <div class='input-field'>
            <label for="title">Title</label>
            <input type="text" name="title" id="title"><br>
          </div>
          <div class='input-field'>
            <label for="director">Director</label>
            <input type="text" name="director" id="director"><br>
          </div>
          <div class='input-field'>
            <label for="year">Year</label>
            <input type="number" name="year" id="year"><br>
          </div>
          <div class='input-field'>
            <label for="rating">Rating</label>
            <input type="number" name="rating" id="rating"><br>
          </div>
          <div class='input-field'>
            <label for="poster_url">Poster URL</label>
            <input type="text" name="poster_url" id="poster_url"><br>
            <br>
          <div class='input-field'>
          <input class="waves-effect waves-light btn" type="submit" value="Submit" id="submit-form">
        </form>`
        pageContainer.appendChild(editForm)
        let director = document.getElementById('director')
        console.log('DIRECTOR IS>>>', director);
        director.setAttribute('value', `${movie.director}`)



        //On submit, use the patch route to update the movie table and make it visible again. Run the get request to update the table.

      })

      // append IMG, to the TD, append the TDs to the TR, the TR to the TBODY
      tr.appendChild(title)
      tr.appendChild(director)
      tr.appendChild(year)
      tr.appendChild(rating)
      tr.appendChild(del_td)
      del_td.appendChild(deleteButton)
      tr.appendChild(edit_td)
      edit_td.appendChild(editButton)
      tbody.appendChild(tr)


    })

  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
}
