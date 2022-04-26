import './Foro.css';
import imagen_perfil from './Imagenes/avatar-1-48.png'
import React from 'react';

function Entradas(props){

  return(
    <article>
      <h2>{props.Titulo}</h2>
      <p>{props.Cuerpo}</p>
    </article>
       
  )
}

class Foro extends React.Component {

  constructor(props){
      super(props);
      this.state={value:"", articulo:[] }
      this.noticia=this.recoger_articulo.bind(this);
      this.coger_id=this.handleClick.bind(this);
  }

  componentDidMount(){
    this.noticia();
  }

  handleClick({currentTarget}) {  
    localStorage.setItem('id_articulo',currentTarget.id);
    window.location.href="/pagina_articulo";
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
            console.log(this.articulo);
          },
          (error)=>{
              console.log(error);
          }
      )
  }

  render(){
    return (
      <div className="todo">

        <header>
          <h2>Easterworld</h2>
          <img src={imagen_perfil} class="dropdown-toggle" data-bs-toggle="dropdown"></img>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
              <li><a class="dropdown-item" href="#">Mi cuenta</a></li>
              <li><a class="dropdown-item" href="#">Cerrar sesion</a></li>
            </ul>
        </header>

        <nav>
          <h2>Foro</h2>
          <button type="button" className="btn btn-outline-secondary">Crear Post</button>
        </nav>

        <aside>
          <h3>Categorías</h3>
          

        </aside>

        <main>
          {this.state.articulo.map((partes)=><article id={partes.ID_articulo} onClick={this.coger_id} key={partes.ID_articulo}><h2>{partes.Titulo}</h2><p>{partes.Cuerpo}</p></article> )}
        </main>

      </div>
    );
  }
  
}

export default Foro;
