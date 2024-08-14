import { MainPage } from '../pages/MainPage';
import { Page404 } from '../pages/Page404';
import { ReactFrom } from '../pages/ReactFrom';
import { SimpleFrom } from '../pages/SimpleFrom';

import { RoutePaths } from './routePaths';

export const publicRoutes = [
  {
    path: RoutePaths.MainPage,
    Page: MainPage,
  },
  {
    path: RoutePaths.ReactFrom,
    Page: ReactFrom,
  },
  {
    path: RoutePaths.SimpleForm,
    Page: SimpleFrom,
  },

  {
    path: RoutePaths.PAGE404,
    Page: Page404,
  },
];
