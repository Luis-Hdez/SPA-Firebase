import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../repositories/firebase/config";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CardProduct } from "../../components/CardProduct";

// Esquema de validación con Yup
const productSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  price: yup
    .number()
    .typeError("El precio debe ser un número")
    .positive("El precio debe ser positivo")
    .required("El precio es requerido"),
  stock: yup
    .number()
    .typeError("El stock debe ser un número")
    .integer("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo")
    .required("El stock es requerido"),
  image: yup
    .string()
    .url("Debe ser una URL válida")
    .required("La imagen es requerida"),
});

export const Products = () => {
  const [submitStatus, setSubmitStatus] = useState({ message: "", type: "" });

  // Configurar react-hook-form con el resolver de Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const addProducts = async (product) => {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: product.name,
        price: parseFloat(product.price),
        stock: parseInt(product.stock),
        image: product.image,
      });

      console.log("Document written with ID: ", docRef.id);
      setSubmitStatus({
        message: "Producto agregado correctamente!",
        type: "success",
      });
      reset(); // Limpiar el formulario después de enviar
    } catch (error) {
      console.error("Error adding document: ", error);
      setSubmitStatus({
        message: "Error al agregar el producto",
        type: "error",
      });
    }
  };

  // Ocultar el mensaje de estado después de 3 segundos
  useEffect(() => {
    if (submitStatus.message) {
      const timer = setTimeout(() => {
        setSubmitStatus({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  

  return (
    <div className="container my-4">
      
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">
                <i className="fas fa-box me-2"></i>
                Administrar Productos
              </h3>
            </div>
            <div className="card-body p-5">
              {/* Mostrar mensaje de estado */}
              {submitStatus.message && (
                <div
                  className={`alert ${
                    submitStatus.type === "success"
                      ? "alert-success"
                      : "alert-danger"
                  } alert-dismissible fade show`}
                  role="alert"
                >
                  {submitStatus.message}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSubmitStatus({ message: "", type: "" })}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit(addProducts)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    placeholder="Ingresa el nombre"
                    {...register("name")}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Precio
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className={`form-control ${
                        errors.price ? "is-invalid" : ""
                      }`}
                      id="price"
                      placeholder="Ingresa el precio"
                      step="0.01"
                      min="0"
                      {...register("price")}
                    />
                  </div>
                  {errors.price && (
                    <div className="invalid-feedback">
                      {errors.price.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="stock" className="form-label">
                    Stock
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.stock ? "is-invalid" : ""
                    }`}
                    id="stock"
                    placeholder="Ingresa la cantidad en stock"
                    min="0"
                    step="1"
                    {...register("stock")}
                  />
                  {errors.stock && (
                    <div className="invalid-feedback">
                      {errors.stock.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    URL de la Imagen
                  </label>
                  <input
                    type="url"
                    className={`form-control ${
                      errors.image ? "is-invalid" : ""
                    }`}
                    id="image"
                    placeholder="Ingresa URL de la imagen"
                    {...register("image")}
                  />
                  {errors.image && (
                    <div className="invalid-feedback">
                      {errors.image.message}
                    </div>
                  )}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save me-2"></i>
                    Guardar Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Traemos las cards de los los productos */}
        <CardProduct />
      </div>
    </div>
  );
};
