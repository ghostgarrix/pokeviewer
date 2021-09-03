export type Pokemon = {
  name: string;
  url: string;
};

export type Ability = {
  name: string;
};

export type Type = {
  name: string;
};

export type Abilities = {
  ability: Ability;
};

export type Types = {
  type: Type;
};

export type PokeInfo = {
  name: string;
  height: string;
  weight: string;
  abilities: Abilities[];
  types: Types[];
  location_area_encounters: string;
};
