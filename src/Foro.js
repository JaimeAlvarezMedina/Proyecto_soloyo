import './Foro.css';
import imagen_perfil from './Imagenes/avatar-1-48.png'

import React from 'react';

function Perfil(props){
  console.log(localStorage.getItem("usuario"));
  if(localStorage.getItem("usuario")==""){
    
    return(
      <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
        <li><a className="dropdown-item" href="/login">Iniciar sesión</a></li>
      </ul>
      
    )
  }
  else{
    if(props.id=="cliente"){
      return(
        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
          <li><a className="dropdown-item" href="#">Mi perfil</a></li>
          <li><a className="dropdown-item">Cerrar sesión</a></li>    
        </ul>
      )
    }
    if(props.id=="admin"){
      return(
        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
          <li><a className="dropdown-item" href="#">Añadir administrador</a></li>
          <li><a className="dropdown-item" href="#">Cerrar sesión</a></li>    
        </ul>
      )
    }
    
  }
}

class Foro extends React.Component {

  constructor(props){
      super(props);
      this.state={value:"", articulo:[], categoria:[],datos_usuario:[] };
      this.noticia=this.recoger_articulo.bind(this);
      this.todas_categorias=this.recoger_categorias.bind(this);
      this.filtrar_categoria=this.filtrado_categorias.bind(this);
      this.coger_id=this.pasar_pagina.bind(this);
      this.crear_post=this.ir_crear_post.bind(this);
      this.coger_usuario=this.coger_datos_usuario.bind(this);
      
  }

  pasar_pagina({currentTarget}) { 
    localStorage.setItem('id_articulo',currentTarget.id);
    window.location.href="/pagina_articulo";
  }

  ir_crear_post(){
    window.location.href="/crear_post";
  }

  coger_datos_usuario(){
    var datos= new FormData();
    localStorage.setItem("usuario","jaime");
    datos.append("usuario",localStorage.getItem("usuario"));
    fetch("http://localhost/php_insti/consultar_usuario.php",{
        method : "POST",
        body: datos
    })
    .then(res=>res.json())
        .then(
          (result)=>{
            this.setState({datos_usuario:result});
          },
          (error)=>{
            console.log(error);
          }
        )
  }

  filtrado_categorias({currentTarget}){
    var datos=new FormData();
    datos.append('nombre_categoria',currentTarget.id);
    fetch("http://localhost/php_insti/filtrar_categorias.php",{
        method:"POST",
        body:datos
    })
    .then(res=>res.json())
    .then(
        (result)=>{
          
          this.setState({
            articulo : result
          });
        },
        (error)=>{
            console.log(error);
        }
    )
  }

  recoger_categorias(){
    var datos=new FormData();
    fetch("http://localhost/php_insti/recoger_categorias.php",{
        method:"POST",
        body:datos
    })
    .then(res=>res.json())
    .then(
        (result)=>{
          this.setState({
            categoria : result
          });
        },
        (error)=>{
            console.log(error);
        }
    )
  }

  recoger_articulo(){
      var datos=new FormData();
      fetch("http://localhost/php_insti/recoger_informacion.php",{
          method:"POST",
          body:datos
      })
      .then(res=>res.json())
      .then(
          (result)=>{

            
            this.setState({
              articulo : result
            });
          },
          (error)=>{
              console.log(error);
          }
      )
  }

  componentDidMount(){
    this.noticia();
    this.todas_categorias();
    this.coger_usuario();
  }


  render(){
    return (
      <div className="todo">

        <header>
          <h2>Easterworld</h2>
          <img src={imagen_perfil} className="dropdown-toggle" data-bs-toggle="dropdown"></img>
          {this.state.datos_usuario.map((comentario)=><Perfil id={comentario.Tipo} />)}
        </header>

        <div id="cuerpo">
          <nav>
            <h2>Foro</h2>
            <button type="button" onClick={this.crear_post} className="btn btn-outline-secondary">Crear Post</button>
          </nav>

          <aside>
            <h3>Categorías</h3>
            {this.state.categoria.map((nombre)=><li id={nombre.Categoria} key={nombre.Categoria} onClick={this.filtrar_categoria}>{nombre.Categoria}</li> )}

          </aside>

          <main id="articulos">
            {this.state.articulo.map((partes)=><article id={partes.ID_articulo}  key={partes.ID_articulo} onClick={this.coger_id}><h2>{partes.Titulo}</h2><p>{partes.Cuerpo}</p></article>)}
          </main>

          <div id='imagen'></div>
          
        </div>
      </div>
    );
  }
}

export default Foro;