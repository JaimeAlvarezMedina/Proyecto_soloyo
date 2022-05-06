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
      this.imagen=this.opcion_imagen.bind(this);
  }

  seleccion_opcion(){
    var elemento_antiguo=document.getElementById("imagen_anadir");

    var elemento_padre=elemento_antiguo.parentNode;

    var elemento_nuevo=document.createElement("div");
    elemento_nuevo.setAttribute("id","seleccionar_opcion");

    var imagentexto=document.createElement("img");
    imagentexto.onclick=this.texto ;
    imagentexto.setAttribute("alt","Insertar texto");
    imagentexto.setAttribute("id","foto_texto");
    imagentexto.setAttribute("src",Imagen_texto);
    
    elemento_nuevo.appendChild(imagentexto);

    var imagenfoto=document.createElement("img");
    imagenfoto.onclick=this.imagen;
    imagenfoto.setAttribute("id","foto_paisaje");
    imagenfoto.setAttribute("src",Imagen_foto);
    elemento_nuevo.appendChild(imagenfoto);

    elemento_padre.replaceChild(elemento_nuevo,elemento_antiguo);
  }

  opcion_imagen(){
    var elemento_antiguo=document.getElementById("seleccionar_opcion");

    var elemento_padre=elemento_antiguo.parentNode;

    var elemento_nuevo=document.createElement("div");
    var imagen_subir=document.createElement("");//AQUI HAY QUE PONER LO QUE VA DENTRO
    elemento_nuevo.appendChild(imagen_subir);

    var opciones=document.createElement("img");
    opciones.setAttribute("id","imagen_anadir");
    opciones.setAttribute("src",Imagen_mas);
    opciones.onclick=this.seleccion;
    elemento_nuevo.appendChild(opciones);
 
    elemento_padre.replaceChild(elemento_nuevo,elemento_antiguo);
  }

  opcion_texto(){
    var elemento_antiguo=document.getElementById("seleccionar_opcion");

    var elemento_padre=elemento_antiguo.parentNode;

    var elemento_nuevo=document.createElement("div");
    var escribir=document.createElement("textarea");
    escribir.setAttribute("class","form-control");
    escribir.setAttribute("rows","4");
    elemento_nuevo.appendChild(escribir);

    var opciones=document.createElement("img");
    opciones.setAttribute("id","imagen_anadir");
    opciones.setAttribute("src",Imagen_mas);
    opciones.onclick=this.seleccion;
    elemento_nuevo.appendChild(opciones);
 
    elemento_padre.replaceChild(elemento_nuevo,elemento_antiguo);

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