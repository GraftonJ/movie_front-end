

document.addEventListener('DOMContentLoaded', () => {
  getMovies()
})
// Use AJAX to get the cryptids and append them to a table in the DOM
function getMovies() {
  console.log('getMovies Function');
  axios.get('http://localhost:3000/all_movies')
  .then((response) => {
    // DOM manipulation, need to create TRs, TDs
    response.data.forEach((movie) => {
      const poster = movie.poster_link
      //console.log('MOVIE IS>>>>', movie.id);
      let tbody = document.querySelector('#list-movies tbody')
      let tr = document.createElement('tr')
      let title = document.createElement('td')
      let director = document.createElement('td')
      let year = document.createElement('td')
      let rating = document.createElement('td')
      let show_td = document.createElement('td')
      let showButton = document.createElement('button')
      let del_td = document.createElement('td')
      let deleteButton = document.createElement('button')
      let edit_td= document.createElement('td')
      let editButton = document.createElement('button')
      title.innerText = movie.title
      director.innerText = movie.director
      year.innerText = movie.year
      rating.innerText = movie.rating
      showButton.innerText =  'Show'
      deleteButton.innerText =  'Delete'
      editButton.innerText = `Edit`

      showButton.setAttribute('data-id', movie.id)
      showButton.setAttribute('class', 'waves-effect waves-light btn')

      deleteButton.setAttribute('data-id', movie.id)
      deleteButton.setAttribute('class', 'waves-effect waves-light btn')

      editButton.setAttribute('data-id', movie.id)
      editButton.setAttribute('class', 'waves-effect waves-light btn')

      deleteButton.addEventListener('click', (ev) => {
        let movieId = ev.target.getAttribute('data-id')

        // DELETE THIS RECORD!
        axios.delete(`http://localhost:3000/all_movies/${movieId}`)
        .then((response) => {
          del_td.parentElement.remove()
        })
        .catch((err) => {
          //console.log(err)
        })
      })

      //SHOW MOVIE LISTED IN THE table
      showButton.addEventListener('click', (ev) => {
        //Get the ID of the movie for which the edit button was clicked
        let movieId = ev.target.getAttribute('data-id')
        //Hide the movie table
        const pageContainer = document.getElementsByClassName('page-container')[0]
        const movieTable = document.getElementsByClassName('movie-table-container')[0]
        movieTable.style.visibility = 'hidden'
        //Add movie title clicked
        let title = document.createElement('h1')
        title.innerText = movie.title
        pageContainer.insertBefore(title, movieTable)
        //add movie image
        let posterImage = document.createElement('img')
        posterImage.setAttribute('src', movie.poster_link)
        posterImage.setAttribute('class', 'center')
        pageContainer.insertBefore(posterImage, movieTable)
        //add data about movies
        let content = document.createElement('div')
        content.innerHTML = `
          <h3>Title: ${movie.title}</h3>
          <h3>Director: ${movie.director}</h3>
          <h3>Year: ${movie.year}</h3>
          <h3>Rating: ${movie.rating}</h3>
        `
        pageContainer.insertBefore(content, movieTable)




      })
      //EDIT A MOVIE LISTED IN THE TABLE
      editButton.addEventListener('click', (ev) => {
        //Get the ID of the movie for which the edit button was clicked
        let movieId = ev.target.getAttribute('data-id')
        //Hide the movie table
        const pageContainer = document.getElementsByClassName('page-container')[0]
        const movieTable = document.getElementsByClassName('movie-table-container')[0]
        movieTable.style.visibility = 'hidden'
        //Place Poster Image Above the form
        console.log('POSTER>>>', movie.poster_link);
        let posterImage = document.createElement('img')
        posterImage.setAttribute('src', movie.poster_link)
        posterImage.setAttribute('class', 'center')
        pageContainer.insertBefore(posterImage, movieTable)
        //Create a form with the fields prefield from
        let editForm = document.createElement('form')
        editForm.setAttribute('id', 'edit-movie')
        editForm.innerHTML = `<form>
            <label for="title">Title</label>
            <input type="text" name="title" id="title"><br>
            <label for="director">Director</label>
            <input type="text" name="director" id="director"><br>
            <label for="year">Year</label>
            <input type="number" name="year" id="year"><br>
            <label for="rating">Rating</label>
            <input type="number" name="rating" id="rating"><br>
            <label for="poster_link">Poster Link</label>
            <input type="text" name="poster_link" id="poster_link"><br>
            <br>
          <input class="waves-effect waves-light btn" type="submit" value="Submit" id="submit-form">
        </form>`

        //Append edit form to the page
        console.log('MOVIETABLE', movieTable);
        pageContainer.insertBefore(editForm, movieTable)

        //Pre-fill the from Values with data from the clicked row
        let title = document.getElementById('title')
        title.setAttribute('value', movie.title)
        let year = document.getElementById('year')
        year.setAttribute('value', movie.year)
        let director = document.getElementById('director')
        director.setAttribute('value', movie.director)
        let rating = document.getElementById('rating')
        rating.setAttribute('value', movie.rating)
        let poster_link = document.getElementById('poster_link')
        poster_link.setAttribute('value', poster)
        //On submit, use the patch route to update the movie table and make it visible again. Run the get request to update the table.

          //Handle Form Submit
          let form = document.getElementById('edit-movie')
          form.addEventListener('submit', (ev) => {
            ev.preventDefault()
            // grab all values from the form
            let postData = {}
            let formElements = ev.target.elements

            for (var i = 0; i < formElements.length; i++) {
              let inputName = formElements[i].name
              console.log('INPUT NAME>>>>', inputName);
              if( inputName ) {
                postData[inputName] = formElements[i].value
                console.log('form value>>>', formElements[i].value);
              }
            }

            console.log('postData', postData);

            // axios.post that data to the correct backend route
            axios.patch(`http://localhost:3000/all_movies/${movieId}`, postData)
            .then((response) => {
              removeMessage()
              let success = document.createElement('p')
                  success.setAttribute('id', 'submit-message')
                  success.innerHTML = `Successfully edited ${response.data[0].title}.<a href='movies.html'>See all movies.</a>`
                  form.appendChild(success)
            })
            .catch((error) => {
              console.log(error)
            })
          })
      })

      // append IMG, to the TD, append the TDs to the TR, the TR to the TBODY
      tr.appendChild(title)
      tr.appendChild(director)
      tr.appendChild(year)
      tr.appendChild(rating)
      tr.appendChild(show_td)
      show_td.appendChild(showButton)
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


const removeMessage = () => {
    let message = document.getElementById('submit-message')
    if (message) {
      form.removeChild(message)
      console.log('Remove Message Function');
    }
  }
