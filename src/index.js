import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import logo from "./images/logo.png";

import CharacterCard from "./components/CharacterCard";

class App extends React.Component {

  state = {
    loading: true,
    error: null,
    data: {
      info: {},
      results: []
    },
    nextPage: 1
  };

  componentDidMount() {
    this.fetchCharacters()
        .then((result) => {
          console.log("The result of this promise is : ", result);
        })
        .catch((error) =>{
          console.log("The error of this promise is : ", error);
        });
  }

  fetchCharacters = async () => {

    this.setState({ loading: true, error: null });

    try {

      const request = await fetch(`https://rickandmortyapi.com/api/character/?page=${this.state.nextPage}`);

      const result = await request.json();

      console.log(result);

      this.setState({
        loading: false,
        data: {
          info: result.info,
          results: [].concat(this.state.data.results, result.results)
        },
        nextPage: this.state.nextPage + 1
      });

    }catch (err) {
      this.setState({ loading: false, error: err });
    }

  };

  render() {
    if (this.state.error) {
      return `Error : ${this.state.error.message}`;
    }

    return (
      <div className="container">
        <div className="App">
          <img className="Logo" src={logo} alt="Rick y Morty" />

          <ul className="row">
            {this.state.data.results.map(character => (
              <li className="col-6 col-md-3" key={character.id}>
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>

          {this.state.loading && <p className="text-center">Loading...</p>}

          {!this.state.loading && this.state.data.info.next && (
            <button onClick={() => this.fetchCharacters()}>Load More</button>
          )}

        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
