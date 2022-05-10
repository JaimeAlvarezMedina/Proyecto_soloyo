import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Foro from "./Foro"
import Articulo from './Pagina_articulo';
import Creacion from './Creacion_articulos';
import Admin from './Anadir_admin';
import Login from './login'


export default function router() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path='pagina_articulo' element={<Articulo />}/>
            <Route path="foro" element={<Foro />} />
            <Route path="crear_post" element={<Creacion />} />
            <Route path="login" element={<Login />} />
            <Route path='anadir_admin' element={<Admin/>} />
            <Route index element={<Foro />} />
            <Route path="/" element={<Foro />} >
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }