import './Creacion_articulos.css';
import React from 'react';
import imagen_perfil from './Imagenes/avatar-1-48.png';
import Imagen_mas from './Imagenes/Boton+.png';
import Imagen_foto from './Imagenes/Paisaje.png';
import Imagen_texto from './Imagenes/Boton_texto.png';

class Foro extends React.Component {

  constructor(props){
      super(props);
      this.state={value:""};
      this.seleccion=this.seleccion_opcion.bind(this);
  }

  seleccion_opcion(){
    document.getElementById('marco_anadir').innerHTML="";
    document.getElementById('marco_anadir').innerHTML="<div id='seleccionar_opcion'><img src='"+Imagen_texto+"' onClick={this.seleccion}></img><img src='"+Imagen_foto+"' onClick={this.seleccion}></img></div>";
  }

  render(){
    return (
      <div className="crear_post">

        <header>
          <h2>Easterworld</h2>
          <img src={imagen_perfil} className="dropdown-toggle" data-bs-toggle="dropdown"></img>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
              <li><a className="dropdown-item" href="#">Mi cuenta</a></li>
              <li><a className="dropdown-item" href="#">Cerrar sesion</a></li>
            </ul>
        </header>

        <main>
            <div id='marco_anadir'>
                <img src={Imagen_mas} id="imagen_anadir" onClick={this.seleccion}></img>
            </div>
            
        </main>

      </div>
    );
  }
}

export default Foro;