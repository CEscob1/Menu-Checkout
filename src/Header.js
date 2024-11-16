import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import shoppingCart from './assets/Shopping_cart.png';
import logout from './assets/logout.png';
import editar from './assets/editar.png'
function Header() {
  const navigate = useNavigate();
  const handleCartClick = () =>{
    navigate('/checkout')
  }

  const handleEditOrdersClick = () => {
    navigate("/editOrder"); 
  };

    return (
        <header>
          <Navbar bg="white" expand="lg">
            <Navbar.Brand>
              <Button 
                variant="outline-danger" 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    outline: 'none', 
                    boxShadow: 'none',
                    marginLeft: '20px' 
                  }}
              >
                <img src={logout} alt="Logout" style={{ width: '65px', height: '65px'}} />
                Salir
              </Button>
            </Navbar.Brand>
            <Nav className="mx-auto"> {/* Botón centrado */}
          <Button
            variant="outline-warning"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              outline: "none",
              boxShadow: "none",
              
            }}
            onClick={handleEditOrdersClick}
          >
            <img src={editar} alt="Editar Órdenes" style={{ width: "65px", height: "65px" }} />
            <span>Editar Órdenes</span>
          </Button>
        </Nav>
            <Nav className="ml-auto" style={{ marginLeft: 'auto' }}> 
              <Button 
                variant="outline-primary"  
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  outline: 'none', 
                  boxShadow: 'none',
                  marginRight: '20px'
                }}
                onFocus={(e) => e.target.blur()} 
                onClick={handleCartClick}
              >
                <img src={shoppingCart} alt="Carrito" style={{ width: '65px', height: '65px' }} /> 
                <span>Ver carrito</span>
              </Button>
            </Nav>
          </Navbar>
          <h2 className="text-center mt-3">Menú</h2>
        </header>
      );
    }

export default Header;
