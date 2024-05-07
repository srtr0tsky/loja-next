import React from 'react';
import './App.css';
import {} from './controle/ControleEditora';
import {} from './controle/ControleLivros';
import {LivroLista} from "./LivroLista";
import {LivroDados} from './LivroDados';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {Nav} from 'react-bootstrap';
function App() {
  
  return ( 
    <BrowserRouter>
    <div style={{backgroundColor: 'black'}}>
        <Nav style={{textDecoration: 'None'}}>
          <Nav.Item>
            <Nav.Link>
              <Link to="/" style={{color: 'white'}}>Catálogo </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="dados/" style={{color: 'white'}}>Novo </Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      
      
        
        
      </div>
      <Routes>
          <Route path="/" element={<LivroLista/>} />
          <Route path="/dados" element={<LivroDados/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
