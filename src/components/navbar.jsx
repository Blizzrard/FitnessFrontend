import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navBar">
      <div className="title">
        <h1>Fitnesstrack.r</h1>
      </div>
      <div className="navLinks">
        <Link to={"/"}>Home</Link>
        <Link to={"/routines"}>Routines</Link>
        <Link to={"/activities"}>Activities</Link>
        <Link to={"/routine_activities"}>Routine Activities</Link>
        <Link to={"/users/login"}>Login/Register</Link>
      </div>
    </div>
  );
}