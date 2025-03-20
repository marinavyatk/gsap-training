import { Route, Routes } from "react-router";
import { pages } from "./routing.tsx";

export const AppRoutes = () => {
  return (
    <Routes>
      {pages.map(({ path, element }) => (
        <Route path={path} element={element} />
      ))}
    </Routes>
  );
};
