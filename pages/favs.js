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
            isFavPrint: [],
            id: "",
            isFavorite: false,
        }
    },
    beforeCreate() {
        fetch(url, optionsKey)
        .then(response => response.json())
        .then( data  => {
            this.movies = data.movies
            this.isFavorite = JSON.parse(localStorage.getItem("favoriteMovies")) || []
            this.isFavPrint = this.movies.filter(movie => this.isFavorite.includes(movie.id))
            console.log(this.isFavPrint)
            
        })
        .catch(err => console.log(err))
    },
    methods: {
        addFav(movieId) {
            if(this.isFavorite.includes(movieId)) {
                this.isFavorite.splice(this.isFavorite.indexOf(movieId), 1)
                this.isFavPrint = this.movies.filter(movie => this.isFavorite.includes(movie.id))
            }
            localStorage.setItem("favoriteMovies", JSON.stringify(this.isFavorite))
            
        }
       
    },
}
const app = createApp(options)
app.mount("#app")
