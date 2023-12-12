export interface IStatsLabel {
  hp: string;
  attack: string;
  defense: string;
  'special-attack': string;
  'special-defense': string;
  speed: string;
  [key: string]: string;
}

export interface IStatsMax {
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
  [key: string]: number;
}

export interface IStat {
  name: string;
  count: number;
  countMax: number;
}
