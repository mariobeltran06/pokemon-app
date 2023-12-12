import { IPokemonFirstGeneration } from 'src/app/core/interfaces/first-generation-pokemon.interface';

export interface IPokemonState {
  pokemons: IPokemonFirstGeneration[];
}
export const pokemonInitialState: IPokemonState = {
  pokemons: [],
};
