import React, { Component } from 'react';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';
import './css/search.css';

class App extends Component {

  state = {
      value: '',
      loaded: false,
      peopleBase: [],
    };

  // changeUrl = (name, genre, rating, sort) => {
  //   const { pathname } = this.props.location;
  //   const newUrl = `${pathname}?name=${name}&genre=${genre}&rating=${rating}&sort=${sort}&lang=${this.lang}`;
  //   this.props.history.push(newUrl);
  // }

  getUrl = page => {
    return `https://swapi.co/api/people/?page=${page}`
  }

  async componentDidMount() {
    const url = this.getUrl(1);
    const { data: { count } } = await axios.get(url);
    const last = count / 10 + 1;
    let peopleBase = [];
    for (let i = 1; i < last; i++) {
      let { data: { results } } = await axios.get(this.getUrl(i));
      peopleBase.push.apply(peopleBase, results);
    }
    this.setState({ peopleBase, loaded: true });
  }

  search = event => {
    const { peopleBase } = this.state;
    // this.changeUrl(name, genre, rating, sort);
    const value = event.target.value;
    this.setState({ value });
    console.log(peopleBase);
    const test = peopleBase.filter(character => {
      if (character.name.includes(value)) {
        return character;
      }
    })
    console.log(test);

  }

  // filter = (text, value) => {
  //   const {
  //     source,
  //     name,
  //   } = this.state;
  //   const genre = (text === 'genre') ? value : this.state.genre;
  //   const rating = (text === 'rating') ? value : this.state.rating;
  //   const sort = (text === 'sort') ? value : this.state.sort;
  //   source.cancel('Request canceled by reloading.');
  //   this.changeUrl(name, genre, rating, sort);
  //   this.setState({
  //     [name]: value,
  //     movies: [],
  //     loadStarted: true,
  //     hasMoreItems: true,
  //     nextHref: null,
  //     source: CancelToken.source(),
  //   });
  // }

  render() {
    // if (!this.state.loaded) return <div>Loading...</div>;
    return (
      <div className="app-container">
        <div className="app-title">Search a Star Wars character name:</div>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          onChange={this.search}
          className="search-bar"
        />
      </div>
    );
  }
}

export default App;
