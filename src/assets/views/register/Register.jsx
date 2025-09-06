import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../repositories/firebase/config";

export const Register = () => {
  const [registrationError, setRegistrationError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email requerido"),
    password: yup
      .string()
      .min(8, "Mínimo 8 caracteres")
      .required("Password requerido"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Confirmar contraseña requerido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      setRegistrationSuccess(true);
      setRegistrationError("");
      reset();
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Registration error:", error.message);
      let errorMessage = "Error al registrar el usuario.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Este correo electrónico ya está en uso.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "El correo electrónico no es válido.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "La contraseña es demasiado débil.";
      }
      setRegistrationError(errorMessage);
      setRegistrationSuccess(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registro</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password")}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Registrarse
        </button>
        {registrationError && (
          <div className="alert alert-danger mt-3">{registrationError}</div>
        )}
        {registrationSuccess && (
          <div className="alert alert-success mt-3">
            Registro exitoso. Redirigiendo al login...
          </div>
        )}
      </form>
    </div>
  );
};
