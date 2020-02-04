import React, { Component } from 'react';
import './App.css';

import Form from './components/Form';
import Recipes from './components/Recipes';

const api_key = "973a94c4455f43d38dfc5f0702e88d80";

class App extends Component {
  state = {
    recipes: []
  }

  getRecipe = async e => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();

    const api_call = await fetch(`https://api.spoonacular.com/recipes/search?query=${recipeName}&apiKey=${api_key}`);
    const data = await api_call.json();
    this.setState({ recipes: data.results });
  }

  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    if (json != null) {
      const recipes = JSON.parse(json);
      this.setState({ recipes: recipes });
    }
  }

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;