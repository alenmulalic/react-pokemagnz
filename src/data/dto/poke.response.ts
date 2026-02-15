export interface PokeSprites {
  front_default: string;
  front_shiny: string;
}

export interface PokeTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokeStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokeResponse {
  name: string;
  id: number;
  sprites: PokeSprites;
  types: PokeTypes[];
  stats: PokeStats[];
}
