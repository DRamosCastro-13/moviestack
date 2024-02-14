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
            filteredMovies: [],
            selectedGenre: "all",
            searchTitle: "",
            id: "",
            isFavorite: false,
        }
    },
    beforeCreate() {
        fetch(url, optionsKey)
        .then(response => response.json())
        .then( data  => {
            this.movies = data.movies
            this.genres = [...new Set (this.movies.map(movie => movie.genres).flat().sort())]
            this.filteredMovies = this.movies
            this.id = this.movies.find(movie => movie.id)
            this.isFavorite = JSON.parse(localStorage.getItem("favoriteMovies")) || []
      
            
        })
        .catch(err => console.log(err))
    },
    methods: {
        addFav(movieId) {
            if(this.isFavorite.includes(movieId)) {
                this.isFavorite.splice(this.isFavorite.indexOf(movieId), 1)
            } else{
                this.isFavorite.push(movieId)
            }
            localStorage.setItem("favoriteMovies", JSON.stringify(this.isFavorite))
         
        }
       
    },
    computed: {
        filterMovies() {
            const aux = this.movies.filter(movie => movie.title.toLowerCase().startsWith(this.searchTitle.toLowerCase()) && (this.selectedGenre == "all" || movie.genres.includes(this.selectedGenre)))
            this.filteredMovies = aux
        }
    }
}
const app = createApp(options)
app.mount("#app")
