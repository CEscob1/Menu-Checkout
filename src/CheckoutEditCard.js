import React from "react";
import "./CheckoutCard.css";  // Reutiliza el mismo CSS
import removeIcon from "./assets/Quitting.png";
import increaseItem from './assets/plus.png';
import decreaseItem from './assets/menos.png';

const CheckoutEditCard = ({ item, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="checkout-card">  {/* Se reutiliza la misma clase CSS */}
      <img
        src={item.image}
        alt={`Menu ${item.id}`}
        className="checkout-card-image"
      />
      <div className="checkout-card-content">
        <h3>
          Menu # {item.id}{" "}
          <img
            src={removeIcon}
            alt="Eliminar"
            style={{ width: "25px", cursor: "pointer" }}
            onClick={() => onRemove(item.id)}  // Acción de eliminar
          />
        </h3>
        <p>{item.description}</p>
        <p>
          <strong>Precio: Q {item.price}</strong>
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p style={{ color: "blue" }}>
            <strong>Cantidad:</strong> {item.quantity} 
            <img
              src={decreaseItem}
              alt="Restar"
              style={{ width: "20px", cursor: "pointer" }}
              onClick={() => onDecrease(item.id)}  // Decrease cantidad
            />
            <img
              src={increaseItem}
              alt="Sumar"
              style={{ width: "25px", cursor: "pointer" }}
              onClick={() => onIncrease(item.id)}  // Increase cantidad
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutEditCard;