import React,{useState} from 'react';
import './Card.css';
import { useDispatch } from 'react-redux';
import { addItem } from './store' 

const Card = ({ id, description, price, image }) => {
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddItem = () => {
        dispatch(addItem({ id, description, price: Number(price), image }));
        setIsAdded(true); 
    };

    return (
        <div className="card">
            <img src={image} alt={`Menu ${id}`} className="card-image" />
            <div className="card-content">
                <h3>Menu # {id}</h3>
                <p>{description}</p>
                <p><strong>Precio: Q.</strong>{Number(price).toFixed(2)}</p>
                <button
                    className={`add-button ${isAdded ? 'added' : ''}`}
                    onClick={handleAddItem}
                >
                    {isAdded ? 'Agregado' : 'Agregar'}
                </button>
            </div>
        </div>
    );
};

export default Card;
