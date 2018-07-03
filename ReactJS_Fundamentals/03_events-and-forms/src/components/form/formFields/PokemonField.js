import React, { Component } from 'react'

let PokemonField = (props) => {
  const pokemons = props.pokemons.map((p, i) => (
    <div key={i} style={({ display: "inline-block", "width": "200px", "height": "200px", border: "2px solid orange" })}>
      <h1>{p.name}</h1>
      <h1>{p.info}</h1>
      <img style={({ "width": "100px" })} alt='pokemon' src={p.image} />
    </div>
  ))
  return (
    <div>
      {pokemons}
    </div>
  )
}

export default PokemonField
