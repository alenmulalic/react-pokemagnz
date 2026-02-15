import type { PokeResponse, PokeSprites, PokeTypes } from "./poke.response";

export class Pokemon {
  id: number;
  name: string;
  sprites: PokeSprites;
  types: PokeTypes[];
  hp: number = 0;
  attack: number = 0;
  defense: number = 0;
  special_attack: number = 0;
  special_defense: number = 0;
  speed: number = 0;

  constructor(pokeResponse: PokeResponse) {
    this.id = pokeResponse.id;
    this.name =
      pokeResponse.name.charAt(0).toUpperCase() + pokeResponse.name.slice(1);

    this.sprites = pokeResponse.sprites;
    this.types = pokeResponse.types;

    for (const stat of pokeResponse.stats) {
      switch (stat.stat.name) {
        case "hp":
          this.hp = stat.base_stat;
          break;
        case "attack":
          this.attack = stat.base_stat;
          break;
        case "defense":
          this.defense = stat.base_stat;
          break;
        case "special-attack":
          this.special_attack = stat.base_stat;
          break;
        case "special-defense":
          this.special_defense = stat.base_stat;
          break;
        case "speed":
          this.speed = stat.base_stat;
          break;
      }
    }
  }
}
