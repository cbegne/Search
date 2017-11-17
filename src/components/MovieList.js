import React, { Component } from 'react';

class MovieList extends Component {

  render() {
    const { movies, hasMoreItems, user } = this.props;
    if (movies.length === 0 && hasMoreItems === false) {
      const noMovie = "no movie"; //text
      return (
        <div className="no-movie">{noMovie}</div>
      );
    }

    const Cards = movies
    .filter(movie => movie.idImdb)
    .map(movie => <Card key={movie.idImdb} movie={movie} user={user} />);

    return (
      <div className="movie-list-container">
        {Cards}
      </div>
    );
  }
}

export default MovieList;
