import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './EditOrder.css';
import regresar from './assets/Regresar.png';

function EditOrders() {
  const confirmedOrders = useSelector((state) => state.cart.confirmedOrders);
  const [activeOrders, setActiveOrders] = useState([]);
  const navigate = useNavigate();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    // Actualiza las órdenes con su estado de actividad
    const updatedOrders = confirmedOrders.map((order) => {
      const orderTime = new Date(order.fechaHora).getTime();
      const currentTime = Date.now();
      const timeDiff = currentTime - orderTime;
      const isActive = timeDiff < 5 * 60 * 1000; // 5 minutos

      return { ...order, isActive };
    });

    // Ordena las órdenes de forma descendente (más recientes primero)
    setActiveOrders(updatedOrders.reverse());
  }, [confirmedOrders]);

  useEffect(() => {
    // Lleva el scroll automáticamente al inicio
    const container = document.querySelector('.order-list');
    if (container) {
      container.scrollTop = 0;
    }
  }, [activeOrders]);

  const handleEditOrder = (orderID) => {
    console.log("Editando la orden con ID:", orderID);
    navigate(`/checkout/edit/${orderID}`); // Navega a la pantalla de edición específica
  };

  const handleBack = () => {
    navigate('/'); // Cambia la ruta según sea necesario
  };

  return (
    <>
      <header>
        <Button
          className="back-button"
          variant="outline-danger"
          onClick={handleBack}
        >
          <img
            src={regresar}
            alt="Regresar"
            style={{ width: "50px", height: "50px" }}
          />
          Regresar
        </Button>
        <h2 style={{ fontWeight: "bold", marginTop: "20px" }}>
          Órdenes Confirmadas
        </h2>
      </header>
      <div className="edit-order-container">
        {activeOrders.length > 0 ? (
          <div className="order-list">
            {activeOrders.map((order) => (
              <div key={order.orderID} className="order-card">
                <div className="order-header">
                  <h4>Orden #{order.orderID}</h4>
                  <button
                    className={`edit-button ${!order.isActive ? 'inactive' : ''}`}
                    disabled={!order.isActive}
                    onClick={() => handleEditOrder(order.orderID)}
                  >
                    {order.isActive ? 'Editar Orden' : 'Tiempo Expirado'}
                  </button>
                </div>
                <p>
                  Descripción:{' '}
                  {order.detallePedido
                    .map((item) => `${item.description} (x${item.quantity})`)
                    .join(", ")}
                </p>
                <p>Total a Pagar: Q{order.precioTotal}</p>
                <p>Fecha y Hora: {formatDate(order.fechaHora)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay órdenes confirmadas.</p>
        )}
      </div>
    </>
  );
}

export default EditOrders;