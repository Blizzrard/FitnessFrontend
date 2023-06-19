import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  if (localStorage.getItem("isLoggedIn") && localStorage.getItem("token")) {
    return (
      <div className="navBar">
        <div className="title">
          <h1>Fitnesstrac.kr</h1>
        </div>
        <div className="navLinks">
          <Link to={"/"}>Home</Link>
          <Link to={"/routines"}>Routines</Link>
          <Link to={"/activities"}>Activities</Link>
          <Link to={"/users/myroutines"}>My Routines</Link>
          <button
            title="Logout"
            id="logout"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("username");
              navigate("/");
            }}
          >
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="navBar">
      <div className="title">
        <h1>Fitnesstrack.r</h1>
      </div>
      <div className="navLinks">
        <Link to={"/"}>Home</Link>
        <Link to={"/routines"}>Routines</Link>
        <Link to={"/activities"}>Activities</Link>
        <Link to={"/users/login"}>Login/Register</Link>
      </div>
    </div>
  );
}
