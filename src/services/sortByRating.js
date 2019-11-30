const sortByRating = movies => {
    return [].concat(movies).sort((a, b) => 
        a.imdbRating > b.imdbRating ? -1 : 1
    );
}

export default sortByRating;