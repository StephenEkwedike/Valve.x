import { NavLink } from "react-router-dom";

export const Logo = () => {
  return (
    <NavLink className="flex items-center justify-center app__logo" to="/">
      <p className="text-lg font-bold">VALV</p>
    </NavLink>
  );
};
