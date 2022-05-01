import './Foro.css';
import imagen_perfil from './Imagenes/avatar-1-48.png'
import React from 'react';

class Foro extends React.Component {

  constructor(props){
      super(props);
      this.state={value:"", articulo:[], categoria:[], filtrado:[] };
      this.noticia=this.recoger_articulo.bind(this);
      this.todas_categorias=this.recoger_categorias.bind(this);
      this.filtrar_categoria=this.filtrado_categorias(this);
      this.coger_id=this.pasar_pagina.bind(this);
  }

  pasar_pagina({currentTarget}) {  
    localStorage.setItem('id_articulo',currentTarget.id);
    window.location.href="/pagina_articulo";
  }

  

  filtrado_categorias(currentTarget){
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
            filtrado : result
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
  }

  render(){
    return (
      <div className="todo">

        <header>
          <h2>Easterworld</h2>
          <img src={imagen_perfil} className="dropdown-toggle" data-bs-toggle="dropdown"></img>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
              <li><a className="dropdown-item" href="#">Mi cuenta</a></li>
              <li><a className="dropdown-item" href="#">Cerrar sesion</a></li>
            </ul>
        </header>

        <div id="cuerpo">
          <nav>
            <h2>Foro</h2>
            <button type="button" className="btn btn-outline-secondary">Crear Post</button>
          </nav>

          <aside>
            <h3>Categorías</h3>
            {this.state.categoria.map((nombre)=><li id={nombre.Categoria} onClick={this.coger_id}>{nombre.Categoria}</li> )}

          </aside>

          <main id="articulos">
            {this.state.articulo.map((partes)=><article id={partes.ID_articulo} onClick={this.coger_id} key={partes.ID_articulo}><h2>{partes.Titulo}</h2><p>{partes.Cuerpo}</p></article>)}
          </main>

          <form encType="multipart/form-data" action="http://localhost/php_insti/upload.php" method="POST">
              <input type="hidden" name="MAX_FILE_SIZE" value="40000000" />
            <p> Enviar mi archivo: <input name="subir_archivo" type="file" /></p>
            <p> <input type="submit" value="Enviar Archivo" /></p>
          </form>
        </div>
      </div>
    );
  }
}

export default Foro;