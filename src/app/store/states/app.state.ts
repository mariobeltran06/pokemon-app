import { IPokemonState } from './pokemon.state';
import { IInfoProfileState } from './profile.state';

export interface IAppState {
  profile: IInfoProfileState;
  pokemon: IPokemonState;
}
