import './Creacion_articulos.css';
import React from 'react';
import imagen_perfil from './Imagenes/avatar-1-48.png';
import Imagen_mas from './Imagenes/Boton+.png';
import logo from './upload/logo.png';
import Imagen_foto from './Imagenes/Paisaje.png';
import Imagen_texto from './Imagenes/Boton_texto.png';
import ReactDOM from 'react-dom';
class Foro extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: "", imagen_prueba: '' };
    this.seleccion = this.seleccion_opcion.bind(this);
    this.texto = this.opcion_texto.bind(this);
    this.imagen = this.opcion_imagen.bind(this);
    this.imagen = this.añadir_imagen.bind(this);
    this.insertar = this.insertar.bind(this);
    this.fileInput = React.createRef();
  }

  seleccion_opcion() {
    var elemento_antiguo = document.getElementById("imagen_anadir");

    var elemento_padre = elemento_antiguo.parentNode;

    var elemento_nuevo = document.createElement("div");
    elemento_nuevo.setAttribute("id", "seleccionar_opcion");

    var imagentexto = document.createElement("img");
    imagentexto.onclick = this.texto;
    imagentexto.setAttribute("alt", "Insertar texto");
    imagentexto.setAttribute("id", "foto_texto");
    imagentexto.setAttribute("src", Imagen_texto);

    elemento_nuevo.appendChild(imagentexto);

    var imagenfoto = document.createElement("img");
    imagenfoto.onclick = this.imagen;
    imagenfoto.setAttribute("id", "foto_paisaje");
    imagenfoto.setAttribute("src", Imagen_foto);
    elemento_nuevo.appendChild(imagenfoto);

    elemento_padre.replaceChild(elemento_nuevo, elemento_antiguo);
  }

  opcion_imagen() {
    var elemento_antiguo = document.getElementById("seleccionar_opcion");

    var elemento_padre = elemento_antiguo.parentNode;

    var elemento_nuevo = document.createElement("div");
    var escribir = document.createElement("textarea");
    escribir.setAttribute("class", "form-control");
    escribir.setAttribute("rows", "4");
    elemento_nuevo.appendChild(escribir);

    var opciones = document.createElement("img");
    opciones.setAttribute("id", "imagen_anadir");
    opciones.setAttribute("src", Imagen_mas);
    opciones.onclick = this.seleccion;
    elemento_nuevo.appendChild(opciones);

    elemento_padre.replaceChild(elemento_nuevo, elemento_antiguo);

  }

  opcion_texto() {
    var elemento_antiguo = document.getElementById("seleccionar_opcion");

    var elemento_padre = elemento_antiguo.parentNode;

    var elemento_nuevo = document.createElement("div");
    var escribir = document.createElement("textarea");
    escribir.setAttribute("class", "form-control");
    escribir.setAttribute("rows", "4");
    elemento_nuevo.appendChild(escribir);

    var opciones = document.createElement("img");
    opciones.setAttribute("id", "imagen_anadir");
    opciones.setAttribute("src", Imagen_mas);
    opciones.onclick = this.seleccion;
    elemento_nuevo.appendChild(opciones);

    elemento_padre.replaceChild(elemento_nuevo, elemento_antiguo);

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
  principal(){
    window.location.href="/";
  }
  render() {
    return (
      <div class='dashboard'>
        <div class="dashboard-nav">
          <header><a href="#!" class="menu-toggle"><i class="fas fa-bars"></i></a><a href="#"
            class="brand-logo"><i
              class="fas fa-anchor"></i> <span>BRAND</span></a></header>
          <nav class="dashboard-nav-list"><a onClick={this.principal} class="dashboard-nav-item"><i class="fas fa-home"></i>
            Home </a><a
              href="#" class="dashboard-nav-item active"><i class="fas fa-tachometer-alt"></i> dashboard
            </a><a
              href="#" class="dashboard-nav-item"><i class="fas fa-file-upload"></i> Upload </a>
            <div class='dashboard-nav-dropdown'><a href="#!" class="dashboard-nav-item dashboard-nav-dropdown-toggle"><i
              class="fas fa-photo-video"></i> Media </a>
              <div class='dashboard-nav-dropdown-menu'><a href="#"
                class="dashboard-nav-dropdown-item">All</a><a
                  href="#" class="dashboard-nav-dropdown-item">Recent</a><a
                    href="#" class="dashboard-nav-dropdown-item">Images</a><a
                      href="#" class="dashboard-nav-dropdown-item">Video</a>
              </div>
            </div>
            <div class='dashboard-nav-dropdown'><a href="#!" class="dashboard-nav-item dashboard-nav-dropdown-toggle"><i
              class="fas fa-users"></i> Users </a>
              <div class='dashboard-nav-dropdown-menu'><a href="#"
                class="dashboard-nav-dropdown-item">All</a><a
                  href="#" class="dashboard-nav-dropdown-item">Subscribed</a><a
                    href="#"
                    class="dashboard-nav-dropdown-item">Non-subscribed</a><a
                      href="#" class="dashboard-nav-dropdown-item">Banned</a><a
                        href="#" class="dashboard-nav-dropdown-item">New</a></div>
            </div>
            <div class='dashboard-nav-dropdown'><a href="#!" class="dashboard-nav-item dashboard-nav-dropdown-toggle"><i
              class="fas fa-money-check-alt"></i> Payments </a>
              <div class='dashboard-nav-dropdown-menu'><a href="#"
                class="dashboard-nav-dropdown-item">All</a><a
                  href="#" class="dashboard-nav-dropdown-item">Recent</a><a
                    href="#" class="dashboard-nav-dropdown-item"> Projections</a>
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
                  <h1>Welcome back Jim</h1>
                </div>
                <div class='card-body'>
                  <main>
                    <div id='marco_anadir'>
                      <img src={Imagen_mas} id="imagen_anadir" onClick={this.seleccion}></img>
                    </div>
                    <form >
                      <label class="btn btn-default">
                        <img src={Imagen_foto} />
                        <input type="file" ref={this.fileInput} hidden></input>
                      </label>

                      <br />

                    </form>

                    <button onClick={this.insertar} type="submit">Submit</button>
                    <div id="tt"></div>
                  </main>

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