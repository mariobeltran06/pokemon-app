export interface IPokemonSpecie {
  name: string;
  url: string;
}

export interface IPokemonFirstGeneration {
  name: string;
  id: number;
}

export interface IResponseFisrtGeneration {
  pokemon_species: IPokemonSpecie[];
}
