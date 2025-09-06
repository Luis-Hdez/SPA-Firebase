import { Link } from "react-router"
import { LogOutComponent } from "./LogOutComponent"
import { useAuth } from "../contexts/AuthContext"

export const NavbarComponent = () => {
  const { user } = useAuth()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link to="/" className="navbar-brand">
          MiApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Entrar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Registrarse
                  </Link>
                </li>
              </>
            ) : (
              // 
              <>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">
                    Productos
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <span className="navbar-text me-3">Hola, {user.email}</span>
                </li> */}
                <li className="nav-item">
                  <LogOutComponent />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
