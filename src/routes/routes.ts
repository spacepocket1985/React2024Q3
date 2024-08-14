import { MainPage } from '../pages/MainPage';
import { Page404 } from '../pages/Page404';

import { RoutePaths } from './routePaths';

export const publicRoutes = [
  {
    path: RoutePaths.MainPage,
    Page: MainPage,
  },

  {
    path: RoutePaths.PAGE404,
    Page: Page404,
  },
];
