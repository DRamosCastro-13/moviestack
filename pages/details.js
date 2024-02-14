const url = `https://moviestack.onrender.com/api/movies`
const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
const optionsKey = {
    headers: {
        "x-api-key" : apiKey
    }
}

const { createApp } = Vue
const options = {
    data() {
        return {
            movies: [],
            genres: [],
            search: location.search,
            id: "",
            movieDetails: [],
        }
    },
    beforeCreate() {
        fetch(url, optionsKey)
        .then(response => response.json())
        .then( data  => {
            this.movies = data.movies
            this.id = new URLSearchParams(window.location.search).get("id")
            this.movieDetails = this.movies.find(movie => movie.id == this.id)
            this.genres = this.movieDetails.genres.toString()
            console.log(this.genres)
            
        })
        .catch(err => console.log(err))

    },
    
    methods: {

       
    },
}
const app = createApp(options)
app.mount("#app")
