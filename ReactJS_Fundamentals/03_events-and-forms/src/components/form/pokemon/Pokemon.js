import React, { Component } from 'react';
import PokemonField from '../formFields/PokemonField';
import PokemonForm from './PokemonForm';

class Pokemon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemons: []
        }
    }

    componentDidMount = () =>
        fetch('http://localhost:5000/pokedex/pokedex', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                return res.json()
            })
            .then(d => {
                this.setState({ pokemons: d.pokemonColection })
            })


    render() {
        return (
            <div>
                <PokemonForm username={this.props.username}/>
                <PokemonField pokemons={this.state.pokemons}/>
            </div>
        );
    }
}

export default Pokemon;
