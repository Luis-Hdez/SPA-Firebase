import {collection, getDocs, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../repositories/firebase/config";
import { useEffect, useState } from "react";

export const CardProduct = () => {
  const [products, setProducts] = useState([]);

  // const getProducts = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "products"));
  //     const productsData = [];
  //     querySnapshot.forEach((doc) => {
  //       productsData.push({ id: doc.id, ...doc.data() });
  //     });
  //     setProducts(productsData);
  //   } catch (error) {
  //     console.error("Error obteniendo productos:", error);
  //     setSubmitStatus({
  //       message: "Error al obtener productos",
  //       type: "error",
  //     });
  //   }
  // };

  // useEffect(() => {
  //     getProducts();
  //   }, []);

  useEffect(() => {
    // Escuchar la colección en tiempo real
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (querySnapshot) => {
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
      },
      (error) => {
        console.error("Error obteniendo productos:", error);
      }
    );

    // Limpiar listener al desmontar componente
    return () => unsubscribe();
  }, []);

  // eliminar un documento (producto por su id)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro que desea eliminar este producto?"
    );
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  return (
    <div>
      {/* Lista de productos existentes */}
      {products.length > 0 && (
        <div className="mt-5">
          <h4>Productos Existentes</h4>
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top img-fluid rounded mx-auto d-block"
                    style={{
                      height: "15vw",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text mb-1">Precio: ${product.price}</p>
                    <p className="card-text mb-3">Stock: {product.stock}</p>
                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                      <button className="btn btn-primary btn-sm">
                        <i className="bi bi-pencil"></i> Editar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
