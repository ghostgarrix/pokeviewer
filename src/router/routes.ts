export enum AppStackRoutes {
  Home = 'Pokemons',
  Details = 'Details'
}

export type AppStackParamList = {
  [AppStackRoutes.Home]: {};
  [AppStackRoutes.Details]: { pokeName: string };
};
