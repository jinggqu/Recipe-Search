import React from 'react';
import { Link } from 'react-router-dom';

const api_key = "973a94c4455f43d38dfc5f0702e88d80";

class Recipe extends React.Component {
    state = {
        activeRecipe: []
    }

    componentDidMount = async () => {
        const id = this.props.location.state.id;

        const req = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${api_key}`);
        const res = await req.json();
        this.setState({ activeRecipe: res });
        console.log(this.state.activeRecipe);
    }

    render() {
        const recipe = this.state.activeRecipe;
        return (
            <div className="container">
                {this.state.activeRecipe.length !== 0 &&
                    <div className="active-recipe">
                        <img
                            className="active-recipe__img"
                            src={recipe.image}
                            alt={recipe.title}
                        />
                        <h3 className="active-recipe__title">{recipe.title}</h3>
                        <h4 className="active-recipe__publisher">
                            SourceName: <span>{recipe.sourceName}</span>
                        </h4>
                        <p className="active-recipe__text">{recipe.instructions}</p>
                        <p className="active-recipe__website">
                            Website: <span><a href={recipe.sourceUrl}>{recipe.sourceUrl}</a></span>
                        </p>
                        <button className="active-recipe__button">
                            <Link to="/">Go Home</Link>
                    </button>
                    </div>
                }
            </div>

        );
    }
};

export default Recipe;