import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { pokemonFeature } from './pokemon.reducers';
import { profileFeature } from './profile.reducers';

export const appReducers: ActionReducerMap<IAppState> = {
  profile: profileFeature.reducer,
  pokemon: pokemonFeature.reducer,
};
