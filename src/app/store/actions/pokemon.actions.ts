import { IPokemonFirstGeneration } from 'src/app/core/interfaces/first-generation-pokemon.interface';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PokemonActions = createActionGroup({
  source: 'pokemon',
  events: {
    'Save Pokemons': props<{ pokemons: IPokemonFirstGeneration[] }>(),
    Finished: emptyProps(),
  },
});
