import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Input from '../formFields/Input'

class AddPokemon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            image: '',
            info: '',
        }

        this.createPokemon = this.createPokemon.bind(this)
    }

    createPokemon(e) {
        e.preventDefault();
        let payload = {
            name: this.state.name,
            image: this.state.image,
            info: this.state.info
        }
        this.create(payload)
    }

    create(payload) {
        fetch('http://localhost:5000/pokedex/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                return res.json()
            })
            .then(d => {
                if (d.success) {
                    window.location.reload()
                }
            })
    }

    logout() {
        localStorage.clear()
    }

    loginValidationFunc(name, image, info) {
        let validName = (() => {
            if (name !== '') {
                return true
            }
            return false
        })()

        let validImage = (() => {
            if (image !== '') {
                return true
            }
            return false
        })()

        let validInfo = (() => {
            if (info !== '') {
                return true
            }
            return false
        })()

        return {
            validName,
            validImage,
            validInfo
        }
    }

    render() {
        let validObj = this.loginValidationFunc(
            this.state.name,
            this.state.image,
            this.state.info
        )

        return (
            <div>
                <form onSubmit={this.createPokemon}>
                    <fieldset className='App'>
                        <div style={{ display: 'inline-grid' }}>
                            <Link to='/' className='logout' onClick={this.logout}>Logout</Link>
                            <h1>Welcome {this.props.username}!</h1>
                            <Input
                                type='text'
                                data='pokemonName'
                                name='Pokemon Name'
                                func={e => {
                                    this.setState({ name: e.target.value })
                                }}
                                valid={validObj.validName}
                            />

                            <Input
                                type='text'
                                data='pokemonImage'
                                name='Pokemon Image'
                                func={e => {
                                    this.setState({ image: e.target.value })
                                }}
                                valid={validObj.validImage}
                            />

                            <Input
                                type='text'
                                data='pokemonInfo'
                                name='Pokemon Info'
                                func={e => {
                                    this.setState({ info: e.target.value })
                                }}
                                valid={validObj.validInfo}
                            />

                            <input
                                type='submit'
                                value='Create Pokemon'
                            />
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default AddPokemon;
