export interface IPokemonSprite {
  other: {
    home: {
      front_default: string;
    };
  };
}

export interface IResponseSpritePokemon {
  sprites: IPokemonSprite;
}
