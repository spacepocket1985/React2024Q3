import { SearchPage } from '../pages/SearchPage';
import { Page404 } from '../pages/Page404';

import { RoutePaths } from './routePaths';

export const publicRoutes = [
  {
    path: RoutePaths.SEARCHPAGE,
    Page: SearchPage,
  },

  {
    path: RoutePaths.PAGE404,
    Page: Page404,
  },
];
