import { PokeInfo, Pokemon, Type, TypeFilter } from "@src/pages/types";

const FETCH_LIMIT = 500;
const BASE_URL = "https://pokeapi.co/api/v2/";

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}pokemon?limit=${FETCH_LIMIT}`
    ).then((response) => response.json());
    return response.results;
  } catch (error) {
    throw new Error("reading data went wrong");
  }
};

export const fetchPokemonsByType = async (
  type: string | null
): Promise<Pokemon[]> => {
  if (type === "all" || type === null) {
    return fetchAllPokemons();
  } else {
    try {
      const response = await fetch(`${BASE_URL}type/${type}`).then((response) =>
        response.json()
      );
      return response.pokemon.map((value: any) => {
        return {
          name: value.pokemon.name,
          url: value.pokemon.url,
        };
      });
    } catch (error) {
      throw new Error("reading data went wrong");
    }
  }
};

export const fetchTypes = async (): Promise<TypeFilter[]> => {
  try {
    const response = await fetch(`${BASE_URL}type`).then((response) =>
      response.json()
    );
    const tmpTypes: TypeFilter[] = response.results.map((value: Type) => {
      return {
        value: value.name,
        label: value.name.charAt(0).toUpperCase() + value.name.slice(1),
      };
    });
    tmpTypes.unshift({
      value: "all",
      label: "All",
    });
    return tmpTypes;
  } catch (error) {
    throw new Error("reading data went wrong");
  }
};

export const fetchPokemonDetails = async (
  pokeName: string
): Promise<PokeInfo> => {
  try {
    return await fetch(`${BASE_URL}pokemon/${pokeName}`).then((res) =>
      res.json()
    );
  } catch (error) {
    throw new Error("reading data went wrong");
  }
};

export const getLink = (pokeName: string): string =>
  `https://en.wikipedia.org/wiki/${pokeName}`;
