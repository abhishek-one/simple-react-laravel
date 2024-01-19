

import { useNavigate } from "react-router-dom";

function Header() {
  const redirect = useNavigate();

  function Logout(){
    localStorage.clear();
    return redirect("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <div className="d-flex w-100 justify-content-between">
            <div>
              <a className="navbar-brand" href="/">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  width=""
                  height="60"
                  className="d-inline-block align-top"
                />
              </a>
            </div>
            <div className="navbar-nav d-flex justify-content-center">
              <div className="nav-item d-flex">
                {localStorage.getItem("details") ? (
                  <>
                    <div className="ps-2 nav-link">
                      <button className="btn btn-danger btn-sm" onClick={Logout}>Logout</button>
                    </div>
                  </>
                ) : (
                  <>
                    <a className="ps-2 nav-link" href="/login">
                      <button className="btn btn-primary btn-sm">Login</button>

                    </a>
                    <a className="ps-2 nav-link" href="/register">
                      <button className="btn btn-primary btn-sm">Register</button>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
