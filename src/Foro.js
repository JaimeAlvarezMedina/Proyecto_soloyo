import './Foro.css';
import imagen_perfil from './Imagenes/avatar-1-48.png'
import ReactDOM from 'react-dom';
import logo from './upload/logo.png';
import React from 'react';
import $ from 'jquery';
const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
  $(".dashboard-nav-dropdown-toggle").click(function () {
    $(this).closest(".dashboard-nav-dropdown")
      .toggleClass("show")
      .find(".dashboard-nav-dropdown")
      .removeClass("show");
    $(this).parent()
      .siblings()
      .removeClass("show");
  });
  $(".menu-toggle").click(function () {
    if (mobileScreen.matches) {
      $(".dashboard-nav").toggleClass("mobile-show");
    } else {
      $(".dashboard").toggleClass("dashboard-compact");
    }
  });
});
class Foro extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: "", articulo: [], categoria: [], imagen_prueba: '' };
    this.noticia = this.recoger_articulo.bind(this);
    this.todas_categorias = this.recoger_categorias.bind(this);
    this.filtrar_categoria = this.filtrado_categorias.bind(this);
    this.coger_id = this.pasar_pagina.bind(this);
    this.crear_post = this.ir_crear_post.bind(this);
    this.imagen = this.añadir_imagen.bind(this);
    this.insertar = this.insertar.bind(this);

    this.fileInput = React.createRef();
  }

  pasar_pagina({ currentTarget }) {
    localStorage.setItem('id_articulo', currentTarget.id);
    window.location.href = "/pagina_articulo";
  }

  ir_crear_post() {
    window.location.href = "/crear_post";
  }

  filtrado_categorias({ currentTarget }) {
    var datos = new FormData();
    datos.append('nombre_categoria', currentTarget.id);
    fetch("http://localhost/php_insti/filtrar_categorias.php", {
      method: "POST",
      body: datos
    })
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            articulo: result
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

  recoger_categorias() {
    var datos = new FormData();
    fetch("http://localhost/php_insti/recoger_categorias.php", {
      method: "POST",
      body: datos
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            categoria: result
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

  recoger_articulo() {
    var datos = new FormData();
    fetch("http://localhost/php_insti/recoger_informacion.php", {
      method: "POST",
      body: datos
    })
      .then(res => res.json())
      .then(
        (result) => {


          this.setState({
            articulo: result
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

  componentDidMount() {
    this.noticia();
    this.todas_categorias();


  }
  insertar() {

    var datos = new FormData;
    datos.append('archivo', this.fileInput.current.files[0])

    fetch("http://localhost/Probar_codigo/Probarsubirimg.php", {
      method: 'POST',
      body: datos
    })
      .then(
        res =>
          res.json()

      )
      .then(
        (result) => {
          this.setState({ imagen_prueba: result });
          this.imagen()
        }
      )
      .then(


      )


  }
  añadir_imagen() {
    const cargarImagen = require.context("./upload", true);

    var elemento_padre = document.getElementById("tt").parentNode;
    var elemento_nuevo = document.createElement("img");
    elemento_nuevo.setAttribute("src", cargarImagen('./' + this.state.imagen_prueba));

    elemento_padre.appendChild(elemento_nuevo);
  }


  render() {
    return (
      <div class='dashboard'>
        <div class="dashboard-nav">
          <header><a href="#!" class="menu-toggle"><i class="fas fa-bars"></i></a><a href="#"
            class="brand-logo"><i class="fas fa-anchor"></i><img src={logo} width="70px" ></img> <span>BRAND</span></a></header>
          <nav class="dashboard-nav-list"><a href="#" class="dashboard-nav-item"><i class="fas fa-home"></i>Home 
            </a>
            <a href="#" class="dashboard-nav-item active"><i class="fas fa-tachometer-alt"></i> dashboard
            </a>

            <div class='dashboard-nav-dropdown'><a href="#!" class="dashboard-nav-item dashboard-nav-dropdown-toggle"><i
              class="fas fa-photo-video"></i> Categorías </a>
              <div class='dashboard-nav-dropdown-menu'>
                {this.state.categoria.map((nombre) => <a href="#" class="dashboard-nav-dropdown-item" id={nombre.Categoria} key={nombre.Categoria} onClick={this.filtrar_categoria}>{nombre.Categoria}</a>)}
              </div>
            </div>


            <a href="#" class="dashboard-nav-item"><i class="fas fa-cogs"></i> Settings </a><a
              href="#" class="dashboard-nav-item"><i class="fas fa-user"></i> Profile </a>
            <div class="nav-item-divider"></div>
            <a
              href="#" class="dashboard-nav-item"><i class="fas fa-sign-out-alt"></i> Logout </a>
          </nav>
        </div>
        <div class='dashboard-app'>
          <header class='dashboard-toolbar'><a href="#!" class="menu-toggle"><i class="fas fa-bars"></i></a></header>
          <div class='dashboard-content'>
            <div class='container'>
              <div class='card'>
                <div class='card-header'>
                  <h1>Foro</h1>
                  <button type="button" onClick={this.crear_post} className="btn btn-outline-secondary">Crear Post</button>
                </div>
                <div class='card-body'>

                  {this.state.articulo.map((partes) => <article id={partes.ID_articulo} key={partes.ID_articulo} onClick={this.coger_id}><h2>{partes.Titulo}</h2><p>{partes.Cuerpo}</p></article>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(
  <Foro />,
  document.getElementById('root')
);
export default Foro;