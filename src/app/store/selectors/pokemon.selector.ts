import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { IPokemonState } from '../states/pokemon.state';

export const selectPokemon = (state: IAppState) => state.pokemon;

export const selectPokemons = createSelector(
  selectPokemon,
  (state: IPokemonState) => state.pokemons
);

export const selectFinishState = createSelector(
  selectPokemon,
  (state: IPokemonState) => state.finished
);
