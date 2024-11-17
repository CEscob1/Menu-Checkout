import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "./store"; // Usamos updateOrder del store
import { useNavigate } from "react-router-dom";

const CheckoutEditOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener los datos actuales de la orden desde el store
  const { confirmedOrders } = useSelector((state) => state.cart);
  const currentOrder = confirmedOrders[confirmedOrders.length - 1]; // Tomamos la última orden confirmada
  const [name, setName] = useState(currentOrder?.nombre || "");
  const [email, setEmail] = useState(currentOrder?.email || "");
  const [cartItems, setCartItems] = useState(currentOrder?.detallePedido || []);

  // Cálculo del total
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  // Función para guardar cambios en la orden
  const handleSaveChanges = () => {
    if (!name.trim() || !email.trim() || cartItems.length === 0) {
      alert("Por favor, complete todos los campos y asegúrese de que haya artículos en el carrito.");
      return;
    }

    const updatedOrder = {
      ...currentOrder,
      nombre: name,
      email: email,
      detallePedido: cartItems,
      precioTotal: totalAmount.toFixed(2),
    };

    dispatch(updateOrder(updatedOrder)); // Actualiza la orden en el store
    alert(`Orden #${currentOrder.orderID} actualizada con éxito.`);
    navigate("/editOrder"); // Redirige a la ruta http://localhost:3000/editOrder
  };

  // Función para cancelar el proceso de edición
  const handleCancelEdit = () => {
    navigate("/editOrder"); // Redirige a la ruta http://localhost:3000/editOrder
  };

  return (
    <div className="checkout-edit-container">
      <button className="btn btn-secondary" onClick={handleCancelEdit}>
        Regresar
      </button>
      <h2>Editar Orden #{currentOrder?.orderID}</h2>
      
      <div className="edit-form">
        <h3>Datos Personales</h3>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Correo Electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <div className="edit-cart">
        <h3>Detalle del Pedido</h3>
        {cartItems.length === 0 ? (
          <p>No hay artículos en el carrito</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={item.id} className="cart-item">
              <span>{item.nombre}</span>
              <span>Precio: Q{item.precio}</span>
              <span>Cantidad: {item.cantidad}</span>
              <button
                className="btn btn-danger"
                onClick={() =>
                  setCartItems((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>

      <div className="total-section">
        <h3>Total a pagar: <span style={{ color: "green" }}>Q{totalAmount.toFixed(2)}</span></h3>
      </div>

      <div className="edit-actions">
        <button className="btn btn-success" onClick={handleSaveChanges}>
          Guardar Cambios
        </button>
        <button className="btn btn-danger" onClick={handleCancelEdit}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CheckoutEditOrder;