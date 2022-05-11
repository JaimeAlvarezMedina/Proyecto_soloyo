import './Foro.css';
import imagen_perfil from './Imagenes/avatar-1-48.png'
import React from 'react';

function Articulos(props){
  if(localStorage.getItem("tipo")=="admin"){
    return(
      <article id={props.ID_articulo}  key={props.ID_articulo} ><h2>{props.Titulo}</h2><p>{props.Cuerpo}</p></article>
    )
  }
  else{
    return(
      <article id={props.ID_articulo}  key={props.ID_articulo} ><h2>{props.Titulo}</h2><p>{props.Cuerpo}</p></article>
    )
  }
  
}

function Perfil(props){
  localStorage.setItem("tipo",props.id);

  if(Boolean(localStorage.getItem("usuario"))==false){
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
          <li><a className="dropdown-item" id='cerrar_sesion'>Cerrar sesión</a></li>    
        </ul>
      )
    }
    if(props.id=="admin"){
      return(
        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
          <li><a className="dropdown-item" id='anadir_admin'>Añadir administrador</a></li>
          <li><a className="dropdown-item" id='cerrar_sesion'>Cerrar sesión</a></li>    
        </ul>
      )
    }
  }
}

function Boton(props){
  if(props.id=="cliente"){
    return(
      <button type="button" className="btn btn-outline-secondary" id="crear_post">Crear Post</button>
    )
  }  
}

class Foro extends React.Component {

  constructor(props){
      super(props);
      this.state={value:"", articulo:[], categoria:[],datos_usuario:[],tipo:"" };
      this.noticia=this.recoger_articulo.bind(this);
      this.todas_categorias=this.recoger_categorias.bind(this);
      this.filtrar_categoria=this.filtrado_categorias.bind(this);
      this.coger_id=this.pasar_pagina.bind(this);
      this.crear_post=this.ir_crear_post.bind(this);
      this.anadir_admin=this.ir_anadir_admin.bind(this);
      this.coger_usuario=this.coger_datos_usuario.bind(this);
      this.funcion=this.añadir_funcion.bind(this);
      this.f=this.funciones.bind(this);
  }

  pasar_pagina({currentTarget}) { 
    localStorage.setItem('id_articulo',currentTarget.id);
    window.location.href="/pagina_articulo";
  }

  ir_crear_post(){
    window.location.href="/crear_post";
  }

  ir_anadir_admin(){
    window.location.href="/anadir_admin";
  }

  coger_datos_usuario(){
    var datos= new FormData();
    if(Boolean(localStorage.getItem("usuario"))==true){
      datos.append("usuario",localStorage.getItem("usuario"));
    }
    else{
      datos.append("usuario","");
    }
    
    fetch("http://localhost/php_insti/consultar_usuario.php",{
        method : "POST",
        body: datos
    })
    .then(res=>res.json())
        .then(
          (result)=>{
            if(result=='vacio'){
              this.setState({datos_usuario:["Nada"]});
            }
            else{
              this.setState({datos_usuario:result});
            }
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
          document.getElementById('limpiar_categorias').style.display="block";
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
            document.getElementById('limpiar_categorias').style.display="none";
          },
          (error)=>{
              console.log(error);
          }
      )
  }

  funciones(){
    localStorage.setItem("usuario","");
    window.location.reload()
  }

  añadir_funcion(){
    if(localStorage.getItem("usuario")!=""){
      var elemento_cerrar=document.getElementById("cerrar_sesion");
      elemento_cerrar.onclick=this.f;
      
      if(localStorage.getItem("tipo")=="admin"){
        var elemento_admin=document.getElementById("anadir_admin");
        elemento_admin.onclick=this.anadir_admin;
      }
      if(localStorage.getItem("tipo")=="cliente"){
        var elemento_crear=document.getElementById("crear_post");
        elemento_crear.onclick=this.crear_post;
      }
    }
  }

  componentDidMount(){
    this.todas_categorias();
    this.coger_usuario();
    this.noticia();
  }


  render(){
    return (
      <div className="todo" onMouseEnter={this.funcion}>

        <header>
          <h2>Easterworld</h2>
          <img src={imagen_perfil} className="dropdown-toggle" data-bs-toggle="dropdown" ></img>
          {this.state.datos_usuario.map((comentario)=><Perfil id={comentario.Tipo} />)}
        </header>

        <div id="cuerpo">
          <nav>
            <h2>Foro</h2>
            {this.state.datos_usuario.map((comentario)=><Boton id={comentario.Tipo}/>)}
          </nav>

          <aside>
            <h3>Categorías</h3>
            {this.state.categoria.map((nombre)=><li id={nombre.Categoria} key={nombre.Categoria} onClick={this.filtrar_categoria}>{nombre.Categoria}</li> )}
            <div id='limpiar_categorias'>
              <li onClick={this.noticia}>Limpiar_categoria</li>
            </div>
          </aside>

          <main id="articulos">
            {this.state.articulo.map((partes)=><Articulos id={partes.ID_articulo}  key={partes.ID_articulo} Titulo={partes.Titulo} Cuerpo={partes.Cuerpo}/>)}
          </main>

          <div id='imagen'></div>
          
        </div>
      </div>
    );
  }
}

export default Foro;