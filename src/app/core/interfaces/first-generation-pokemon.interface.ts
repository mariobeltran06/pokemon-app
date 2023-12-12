export interface IPokemonSpecie {
  name: string;
  url: string;
}

export interface IPokemonFirstGeneration {
  name: string;
  id: number;
}

export interface IPokemonMini {
  name: string;
  id: number;
  image: string | null;
}

export interface IResponseFisrtGeneration {
  pokemon_species: IPokemonSpecie[];
}

export interface IResponseSpritePokemon {
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
}
