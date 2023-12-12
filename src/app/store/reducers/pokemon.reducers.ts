import { createFeature, createReducer, on } from '@ngrx/store';
import { PokemonActions } from '../actions/pokemon.actions';
import { pokemonInitialState } from '../states/pokemon.state';

export const pokemonFeature = createFeature({
  name: 'pokemons',
  reducer: createReducer(
    pokemonInitialState,
    on(PokemonActions.savePokemons, (state, { pokemons }) => ({
      ...state,
      pokemons,
    }))
  ),
});
