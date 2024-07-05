import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutePaths } from './routePaths';
import { publicRoutes } from './routes';

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={RoutePaths.SEARCHPAGE} replace />}
      />

      {publicRoutes.map(({ path, Page }) => (
        <Route path={path} key={path} element={<Page />} />
      ))}
    </Routes>
  );
};
