import { Navigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  return user ? children : <Navigate to="/login" replace />
}
