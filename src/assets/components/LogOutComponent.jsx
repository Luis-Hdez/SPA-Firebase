import { getAuth, signOut } from "firebase/auth";

  const auth = getAuth();
  const handleSignOut = async () => {
    if (window.confirm("¿Estás seguro que deseas cerrar sesión?")) {
      try {
        await signOut(auth);
        setSubmitStatus({
          message: "Sesión cerrada correctamente.",
          type: "success",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        setSubmitStatus({
          message: "Error al cerrar sesión.",
          type: "error",
        });
      }
    }
  };

export const LogOutComponent = () => {
  return (
    <button className="btn btn-danger mb-4" onClick={handleSignOut}>
      Cerrar Sesión
    </button>
  );
};
