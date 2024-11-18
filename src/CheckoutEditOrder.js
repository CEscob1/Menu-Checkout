import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Regresar from "./assets/Regresar.png";
import CheckoutCardEdit from "./CheckoutEditCard"; // Asegúrate de que este componente esté implementado correctamente
import {
  removeItem,
  increaseQuantityInOrder,
  decreaseQuantityInOrder,
  setCartItems,
  updateOrder,
} from "./store";
import "./Checkout.css";

function CheckoutEditOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderID } = useParams();  // Obtener el orderID desde los parámetros de la URL
  const confirmedOrders = useSelector((state) => state.cart.confirmedOrders);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderToEdit, setOrderToEdit] = useState(null);

  useEffect(() => {
    if (orderID) {
      const order = confirmedOrders.find((order) => order.orderID === parseInt(orderID, 10));
      if (order) {
        setOrderToEdit(order);
        setName(order.nombre);
        setEmail(order.email);
        dispatch(setCartItems(order.detallePedido)); // Aseguramos que cargamos los items correctos
      } else {
        alert("Orden no encontrada.");
        navigate("/editOrder"); // Redirige si no encuentra la orden
      }
    } else {
      alert("ID de orden no válido.");
      navigate("/editOrder"); // Redirige si el ID de la orden no es válido
    }
  }, [orderID, confirmedOrders, dispatch, navigate]);

  // Calculamos el total de la orden
  const totalAmount = orderToEdit
    ? orderToEdit.detallePedido.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    : 0;

  const handleBack = () => navigate("/editOrder");

  const handleUpdateOrder = () => {
    if (!name.trim() || !email.trim() || orderToEdit?.detallePedido.length === 0) {
      alert("Por favor, complete todos los campos y asegúrese de que haya artículos en la orden.");
      return;
    }

    const updatedOrder = {
      orderID: orderID,
      detallePedido: orderToEdit.detallePedido,
      precioTotal: totalAmount.toFixed(2),
      nombre: name,
      email: email,
    };

    dispatch(updateOrder(updatedOrder));
    alert(`Orden #${updatedOrder.orderID} actualizada con éxito.`);
    navigate("/editOrder");
  };

  return (
    <div>
      <header>
        <Button
          className="back-button"
          variant="outline-danger"
          onClick={handleBack}
        >
          <img
            src={Regresar}
            alt="Regresar"
            style={{ width: "50px", height: "50px" }}
          />
          Regresar
        </Button>
        <h2 style={{ fontWeight: "bold", marginTop: "20px" }}>Editar Orden</h2>
        <p>Editando la orden con ID: {orderID}</p>
      </header>
      <div className="checkout-container">
        <div className="order-list">
          {orderToEdit && orderToEdit.detallePedido.length > 0 ? (
            orderToEdit.detallePedido.map((item) => (
              <CheckoutCardEdit
                key={item.id}
                item={item}
                onRemove={(id) => dispatch(removeItem(id))}
                onIncrease={(id) => dispatch(increaseQuantityInOrder({ orderID, itemID: id }))}
                onDecrease={(id) => dispatch(decreaseQuantityInOrder({ orderID, itemID: id }))}
              />
            ))
          ) : (
            <p>No hay elementos en la orden.</p>
          )}
        </div>
        <h3 className="total-amount">
          Total a Pagar: Q{totalAmount.toFixed(2)}
        </h3>
      </div>
      <div className="data-container">
        <h4><strong>Datos personales</strong></h4>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Nombre quien recibe:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Correo Electrónico:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <div className="button-group">
            <Button
              variant="outline-danger"
              onClick={handleBack}
            >
              Cancelar
            </Button>
            <Button
              variant="success"
              onClick={handleUpdateOrder}
              style={{ marginLeft: "20px" }}
            >
              Actualizar Orden
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CheckoutEditOrder;
