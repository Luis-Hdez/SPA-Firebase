import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../repositories/firebase/config"
import { useAuth } from "../../contexts/AuthContext"

const LoginComponent = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const { user } = useAuth()

  const navigateToDashboard = () => {
    navigate("/products")
  }

  useEffect(() => {
    if (user) {
      navigateToDashboard()
    }
  }, [user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)

        alert("Inicio de sesión válido")
        navigateToDashboard()
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage)
        console.log(errorCode)
        setErrorMessage(errorMessage)
      })
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ minWidth: "350px" }}>
        <h3 className="mb-4 text-center">Iniciar Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Muestra el mensaje de error */}
          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginComponent
