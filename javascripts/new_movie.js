console.log('Connected to new_movie.js');
document.addEventListener('DOMContentLoaded', () => {
  handleFormSubmit()
})
function handleFormSubmit() {
  let form = document.getElementById('create-movie')
  form.addEventListener('submit', (ev) => {
    console.log('Submitted');
    ev.preventDefault()
    console.log(('EVENT TARGET>>>', event.target.elements[0].name));
    // grab all values from the form
    let postData = {}
    let formElements = ev.target.elements

    for (var i = 0; i < formElements.length; i++) {
      let inputName = formElements[i].name
      if( inputName ) {
        postData[inputName] = formElements[i].value
      }
    }

    console.log('postData', postData);

    // axios.post that data to the correct backend route
    axios.post('http://localhost:3000/all_movies', postData)
    .then((response) => {
      console.log(response)
      getReports()  //call this once again
    })
    .catch((error) => {
      console.log(error)
    })
  })
}
