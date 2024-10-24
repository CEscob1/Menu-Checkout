import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Regresar from "./assets/Regresar.png";
import CheckoutCard from "./CheckoutCard";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "./store";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      name.trim() !== "" && email.trim() !== "" && cartItems.length > 0
    );
  }, [name, email, cartItems]);

  const handleBack = () => {
    navigate("/");
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const itemTotal = item.price * item.quantity || 0;
    return total + itemTotal;
  }, 0);

  const handleConfirmOrder = () => {
    if (!isFormValid) {
      alert(
        "Por favor, complete todos los campos y asegúrese de que haya artículos en el carrito."
      );
      return;
    }

    const orderID = Math.floor(Math.random() * 1000000);
    const timestamp = new Date().toISOString();
    const orderDetails = {
      orderID,
      detallePedido: cartItems,
      precioTotal: totalAmount.toFixed(2),
      fechaHora: timestamp,
      nombre: name,
      email: email,
    };

    // Muestra el JSON en la consola
    console.log("Order JSON:", JSON.stringify(orderDetails, null, 2));

    // Popup con la información de la orden
    alert(`
      No. de Orden: ${orderDetails.orderID}
      Descripción: ${orderDetails.detallePedido
        .map((item) => `${item.description} (x${item.quantity})`)
        .join(", ")}
      Quien recibe: ${orderDetails.nombre}
      Total a Pagar: Q${orderDetails.precioTotal}
    `);

    // Vaciar el carrito después de confirmar la orden
    dispatch(clearCart());
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
        <h2 style={{ fontWeight: "bold", marginTop: "20px" }}>
          Detalle De Orden
        </h2>
      </header>
      <div className="checkout-container">
        <div className="order-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CheckoutCard
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ))
          ) : (
            <p>No hay elementos en el carrito.</p>
          )}
        </div>
        <h3 className="total-amount">
          Total a Pagar: Q{totalAmount.toFixed(2)}
        </h3>
      </div>
      <div className="data-container">
        <h4>
          <strong>Datos personales</strong>
        </h4>
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
              disabled={cartItems.length === 0} // Deshabilitar si no hay elementos
            >
              Cancelar Orden
            </Button>
            <Button
              variant="success"
              onClick={handleConfirmOrder}
              style={{ marginLeft: "20px" }}
              disabled={!isFormValid} // Deshabilitar si el formulario no es válido
            >
              Confirmar Orden
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Checkout;
