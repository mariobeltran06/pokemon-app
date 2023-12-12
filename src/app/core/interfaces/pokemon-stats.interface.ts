import { IPokemonSprite } from './sprite-pokemon.interface';

export interface IPokemonStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface IPokemonType {
  type: {
    name: string;
  };
}

export interface IResponsePokemon {
  sprites: IPokemonSprite;
  stats: IPokemonStats[];
  types: IPokemonType[];
}
