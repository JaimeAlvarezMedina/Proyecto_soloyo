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
      this.texto=this.opcion_texto.bind(this);
  }

  seleccion_opcion(){
    var elemento_antiguo=document.getElementById("imagen_anadir");

    var elemento_padre=elemento_antiguo.parentNode;

    var elemento_nuevo=document.createElement("div");
    elemento_nuevo.setAttribute("id","seleccionar_opcion");

    var imagentexto=document.createElement("img");
    imagentexto.onclick=console.log("Hola");
    imagentexto.setAttribute("id","foto_texto");
    imagentexto.setAttribute("src",Imagen_texto);
    
    elemento_nuevo.appendChild(imagentexto);

    var imagenfoto=document.createElement("img");
    imagenfoto.setAttribute("id","foto_paisaje");
    imagenfoto.setAttribute("src",Imagen_foto);
    elemento_nuevo.appendChild(imagenfoto);

    elemento_padre.replaceChild(elemento_nuevo,elemento_antiguo);

    
  }

  opcion_texto(){
    document.getElementById('marco_anadir').innerHTML="";
    document.getElementById('marco_anadir').innerHTML="<div><textarea></textarea></div>";
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