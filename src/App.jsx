import { BrowserRouter, Route, Routes } from "react-router"
import "./App.css"
import LoginComponent from "./assets/views/login/LoginComponent"
import { Products } from "./assets/views/products/Products"
import { NavbarComponent } from "./assets/components/NavbarComponent"
import { Register } from "./assets/views/register/Register"
import { LogOutComponent } from "./assets/components/LogOutComponent"
import { ProtectedRoute } from "./assets/components/ProtectedRoute"
import { AuthProvider } from "./assets/contexts/AuthContext"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<LogOutComponent />} />
          <Route path="/" element={<LoginComponent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
