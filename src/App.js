import { Route, Routes } from 'react-router';

import { Navbar } from './Navbar';
import { NotFound } from './NotFound';
import { routes } from './routes';

export const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {routes.map((route) => (
         <Route
            key={route.path}
            path={route.path}
            Component={route.Component}
         />
        ))}
        <Route path="/*" Component={NotFound} />
      </Routes>
    </>
  );
};
