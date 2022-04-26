import './Foro.css';
import imagen_perfil from './Imagenes/avatar-1-48.png'
import React from 'react';

function Entradas(props){
  return(
    <article onClick={this.cambiar_pagina(props.id)}>
      <h2>{props.Titulo}</h2>
      <p>{props.Cuerpo}</p>
    </article>
  )
}

class Foro extends React.Component {

  constructor(props){
      super(props);
      this.state={value:"", noticia:[] }
      this.noticia=this.recoger_articulo.bind(this);
      this.cambiar_pagina=this.pasar_articulo.bind(this);
  }

  componentDidMount(){
    this.noticia();
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
              noticia : result
            });
            console.log(this.noticia);
          },
          (error)=>{
              console.log(error);
          }
      )
  }

  pasar_articulo(id){
    console.log(id);
  }

  render(){
    return (
      <div className="todo">

        <header>
          <h2>Easterworld</h2>
          <img src={imagen_perfil}></img>
        </header>

        <nav>
          <h2>Foro</h2>
          <button type="button" className="btn btn-outline-secondary">Crear Post</button>
        </nav>

        <aside>
          <h3>Categorías</h3>
          

        </aside>

        <main>
          {this.state.noticia.map((partes)=><Entradas id={partes.ID_articulo} Titulo={partes.Titulo} Cuerpo={partes.Cuerpo} />)}
        </main>

      </div>
    );
  }
  
}

export default Foro;
