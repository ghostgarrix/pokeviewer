export enum AppStackRoutes {
  Home = 'Home',
  Details = 'Details'
}

export type AppStackParamList = {
  [AppStackRoutes.Home]: undefined;
  [AppStackRoutes.Details]: { pokeName: string };
};
