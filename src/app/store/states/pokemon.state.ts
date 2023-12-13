import { IPokemonFirstGeneration } from 'src/app/core/interfaces/first-generation-pokemon.interface';

export interface IPokemonState {
  pokemons: IPokemonFirstGeneration[];
  finished: boolean;
}
export const pokemonInitialState: IPokemonState = {
  pokemons: [],
  finished: false,
};
