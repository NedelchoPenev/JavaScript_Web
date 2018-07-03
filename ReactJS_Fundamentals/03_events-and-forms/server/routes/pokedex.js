const express = require('express')

const router = new express.Router()

const pokemons = require('./../data/pokemons')

function validateAddPokemonForm(payload) {
    const errors = {}
    let isFormValid = true
    let message = ''

    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
        isFormValid = false
        errors.name = 'Please enter pokemon name.'
    }

    if (!payload || typeof payload.info !== 'string' || payload.info.trim().length === 0) {
        isFormValid = false
        errors.info = 'Please enter pokemon info.'
    }

    if (!payload || typeof payload.image !== 'string' || payload.image.trim().length === 0) {
        isFormValid = false
        errors.image = 'Please enter valid pokemon url.'
    }

    if (!isFormValid) {
        message = 'Check the form for errors.'
    }

    return {
        success: isFormValid,
        message,
        errors
    }
}

router.post('/create', (req, res, next) => {
    const validationResult = validateAddPokemonForm(req.body)
    if (!validationResult.success) {
        return res.status(200).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    }

    pokemons.addPokem((req.body))
    return res.status(200).json({
        success: true,
        message: 'You have successfully add a pokemon!'
      })
})

router.get('/pokedex', (req, res, next) => {
    console.log('geting')
    console.log(pokemons.retrivePokemons())
    let pokemonColection = (pokemons.retrivePokemons())
    return res.status(200).json({
        pokemonColection
    })
})

module.exports = router