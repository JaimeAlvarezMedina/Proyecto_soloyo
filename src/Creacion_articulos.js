import './Creacion_articulos.css';
import React from 'react';
import imagen_perfil from './Imagenes/avatar-1-48.png';
import Imagen_mas from './Imagenes/Boton+.png';
import Imagen_foto from './Imagenes/Paisaje.png';
import Imagen_texto from './Imagenes/Boton_texto.png';

if(texto==undefined){
  var texto=[];
}

class Creacion_articulos extends React.Component {

  constructor(props){
      super(props);
      this.state={value:"", contador:0, articulo:"",nombre_imagen:""};
      this.seleccion=this.seleccion_opcion.bind(this);
      this.texto=this.opcion_texto.bind(this);
      this.imagen=this.opcion_imagen.bind(this);
      this.subir_post=this.crear_post.bind(this);
      this.subir_datos=this.subir_base_datos.bind(this);
  }

  subir_base_datos(){
    var datos= new FormData();
        datos.append('creador',localStorage.getItem("usuario"));
        datos.append('cuerpo',texto);
        fetch("http://localhost/php_insti/subir_post.php",{
          method : "POST",
          body: datos
        })
        .then(res=>res.json())
            .then(
                (result)=>{
                  if(result=="Correcto"){
                    // window.location.href="/foro";
                  }
                  
                },
                (error)=>{
                    console.log(error);
                }
            )
  }

  crear_post(contador){
    

      if(document.getElementById("img-"+contador)!=null){
        
        var datos= new FormData();
        datos.append('usuario',localStorage.getItem("usuario"));
        datos.append('subir_archivo', document.getElementById("img-"+contador).files[0]);
        fetch("http://localhost/php_insti/upload.php",{
          method : "POST",
          body: datos
        })
        .then(res=>res.json())
            .then(
                (result)=>{
                  console.log(contador);
                  texto[contador]=result;
                  console.log(texto);
                  console.log(contador);
                },
                (error)=>{
                    console.log(error);
                }
            )
     
      }
      if(document.getElementById("txt-"+contador)!=null){
        console.log("txt"+contador);
        texto[contador]=document.getElementById("txt-"+contador).value;
        console.log(texto);
      }
      
      

      if(document.getElementById("img-"+(contador+1))!=null || document.getElementById("txt-"+(contador+1))!=null){//Si no existe ninguno de estos elementos en el documentop no sigue
        this.subir_post(contador+1);
      }
      else{
        setTimeout(function(){
          var datos= new FormData();
          datos.append('creador',localStorage.getItem("usuario"));
          datos.append('cuerpo',texto.join("//-//"));
          fetch("http://localhost/php_insti/subir_post.php",{
            method : "POST",
            body: datos
          })
          .then(res=>res.json())
              .then(
                  (result)=>{
                    if(result=="Correcto"){
                      window.location.href="/foro";
                    }
                    
                  },
                  (error)=>{
                      console.log(error);
                  }
              )
        }, 2000);
      }
      

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
    this.setState({contador:this.state.contador+1});
    var elemento_antiguo=document.getElementById("seleccionar_opcion");

    var elemento_padre=elemento_antiguo.parentNode;

    var elemento_nuevo=document.createElement("div");

    var elemento1=document.createElement("input");
    elemento1.setAttribute("type","hidden");
    elemento1.setAttribute("name","MAX_FILE_SIZE");
    elemento1.setAttribute("value","40000000");
    elemento_nuevo.appendChild(elemento1);

    var elemento2=document.createElement("p");
    elemento2.appendChild(document.createTextNode("Subir archivo:"));
    var elemento2_1=document.createElement("input");
    elemento2_1.setAttribute("id","img-"+this.state.contador);
    elemento2_1.setAttribute("name","subir_archivo");
    elemento2_1.setAttribute("type","file");
    elemento2.appendChild(elemento2_1);

    elemento_nuevo.appendChild(elemento2);

    var opciones=document.createElement("img");
    opciones.setAttribute("id","imagen_anadir");
    opciones.setAttribute("src",Imagen_mas);
    opciones.onclick=this.seleccion;
    elemento_nuevo.appendChild(opciones);
 
    elemento_padre.replaceChild(elemento_nuevo,elemento_antiguo);

  }

  opcion_texto(){
    this.setState({contador:this.state.contador+1});
    var elemento_antiguo=document.getElementById("seleccionar_opcion");

    var elemento_padre=elemento_antiguo.parentNode;

    var elemento_nuevo=document.createElement("div");
    var escribir=document.createElement("textarea");
    escribir.setAttribute("id","txt-"+this.state.contador);
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
        <footer>
          <button onClick={this.subir_post.bind(this,0)}>Crear post</button>
        </footer>
      </div>
    );
  }
}

export default Creacion_articulos;