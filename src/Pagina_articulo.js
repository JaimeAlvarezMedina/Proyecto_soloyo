import './Pagina_articulo.css';
import React from 'react';
import Like from './Imagenes/Like.png';
import Dislike from './Imagenes/Dislike.png';
import Like_pulsado from './Imagenes/Like_pulsado.png';
import Dislike_pulsado from './Imagenes/Dislike_pulsado.png';

const cargarImagen = require.context("./uploads", true);

var contador=0;
var mostrado=false;
var inter;
var entro=false;

const curiosidades=["Debido a las limitaciones de memoria del primer Deus Ex, las torres gemelas no fueron incluidas en la recreación de la Nueva York de 2052. En la historia del juego se explica su ausencia como resultado de un ataque terrorista.","En GTA: San Andreas si tu habilidad de conducción es baja, CJ mirará hacia atrás cuando el coche vaya en reversa. Cuando mejores tu habilidad, CJ empezará a usar los espejos retrovisores.","La razón por la que el personaje de Crash no tiene cuello es debido a las limitaciones técnicas de aquella época (1996). Diseñaron a Crash de esa manera para simplificarlo, restandole complejidad a su geometría.","La Playstation 2 ha tenido tanto éxito y sido tan popular que Sony continuó fabricandola hasta el mes en que fue anunciada la Playstation 4","En Hitman 3 (2021) si escaneas el código QR detrás de la cabeza de los sujetos de prueba que aparecen en la misión «Chongqing» te muestra una foto de los desarrolladores","En Red Dead Redemption 2 la bandera de Estados Unidos tiene tan solo 45 estrellas porque en aquel tiempo (1899) solo existian 45 estados. La actual que todos conocemos posee 50.","En 2007, Rockstar brindó un teléfono a sus fans para que llamen y den su opinión sobre lo que estaba mal en Estados Unidos. Las mejores llamadas se incluyeron en una de las estaciones de radio del juego, WKTT (We Know The Truth).","Un FPS bastante innovador para su época, el GoldenEye 007, fue desarrollado un equipo de no mas de 10 personas quienes en su mayoría no habían trabajado previamente en la industria de los videojuegos.","En GTA IV, si entras con un coche convertible al lavadero la secuencia mostrará que lo hacen pasar por los rodillos en vez de lavarlo a mano","En Hitman 2 (2018) si pesas al agente 47 sobre una balanza te dará 47.0 KG","En Project Cars 2, si la antena de tu coche se averia en exceso por golpes no podrás contactar a los boxes","Es posible terminar Far Cry 4 en menos de 30 minutos aprovechando un final alternativo en el que es necesario permanecer sentado por 15 minutos en la casa del antagonista luego de ser capturado por sus fuerzas.","El canto de SEGA que se muestra al comienzo de Sonic: The Hedhegog ocupaba 1/8 del espacio disponible en el cartucho para Megadrive."];

function Imagen_like(props){
    var gusta=props.gustas.split("//*//");
    var nogusta=props.nogustas.split("//*//");
    console.log(nogusta);
    if(nogusta.includes(localStorage.getItem("id_articulo"))==false && gusta.includes(localStorage.getItem("id_articulo"))==false){
        inter=false;
        return(
            <div>
                <img src={Like} id="interaccion_like"/>
                <img src={Dislike} id="interaccion_dislike"/> 
            </div>
        )
    }
    else{
        if(nogusta.includes(localStorage.getItem("id_articulo"))==true && gusta.includes(localStorage.getItem("id_articulo"))==false){
            inter=true;
            return(
                <div>
                    <img src={Like} id="pulsado"/>
                    <img src={Dislike_pulsado} id="pulsado"/> 
                </div>
            )
        }
        if(nogusta.includes(localStorage.getItem("id_articulo"))==false && gusta.includes(localStorage.getItem("id_articulo"))==true){
            inter=true;
            return(
                <div>
                    <img src={Like_pulsado} id="pulsado"/>
                    <img src={Dislike} id="pulsado"/> 
                </div>
            )
        }
    }

}

class Articulo extends React.Component {

    constructor(props){
        super(props);
        this.state={value:"", noticia:[],cuerpo:[],curiosidades:"",datos_usuario:[], gustas:"",error:""}
        this.noticia=this.recoger_articulo.bind(this);
        this.hacer_cuerpo=this.estructura_cuerpo.bind(this);
        this.like=this.sumar_like.bind(this);
        this.dislike=this.sumar_dislike.bind(this);
        this.usuario=this.coger_datos_usuario.bind(this);
        this.funcion=this.asignar_funciones.bind(this);
        this.alerta=this.anadir_advertencia.bind(this);
    }

    

    estructura_cuerpo(){
        if(mostrado==false){
            try{
                var array_cuerpo=localStorage.getItem("cuerpo").split("//-//");
                var actual=array_cuerpo[contador];
                var elemento_padre=document.getElementById("aqui");
                
                if(actual.substring(0,4)=="img-"){
                    var elemento_foto=document.createElement("img");
                    elemento_foto.setAttribute("src",cargarImagen('./'+array_cuerpo[contador]));
                    elemento_padre.appendChild(elemento_foto);
                }
                else{
                    var elemento_texto=document.createElement("p");
                    var texto=document.createTextNode(array_cuerpo[contador]);
                    elemento_texto.appendChild(texto);
                    elemento_padre.appendChild(elemento_texto);
                }
                contador++;
            if(contador<array_cuerpo.length){
                this.hacer_cuerpo();
            }
            else{
                setTimeout(function(){
                    document.getElementById("todo").style.display="block";
                    document.getElementById("cargar").style.display="none";
                    document.getElementById("curiosidad").style.display="none";
                },2000);
                mostrado=true;
            }
            }catch(error){
                setTimeout(this.noticia,3000);
                console.log(error);
            }
        }     
    }

    recoger_articulo(){
        var datos=new FormData();
        datos.append('id',localStorage.getItem('id_articulo'));
        fetch("http://localhost/php_insti/recoger_articulo.php",{
            method:"POST",
            body:datos
        })
        .then(res=>res.json())
        .then(
            (result)=>{
                
                this.setState({
                    noticia : result
                });
                {this.state.noticia.map((partes)=>localStorage.setItem("cuerpo",partes.Cuerpo))};
                setTimeout(this.hacer_cuerpo,2000);
              
            },
            (error)=>{
                console.log(error);
            }
        )
    }

    sumar_like(){
        var datos=new FormData();
        datos.append('interaccion',"like");
        datos.append('id',localStorage.getItem("id_articulo"));
        datos.append("user",localStorage.getItem("usuario"));
        fetch("http://localhost/php_insti/puntuar.php",{
            method:"POST",
            body:datos
        })
        .then(res=>res.json())
        .then(
            (result)=>{
                console.log(result);
                document.getElementById("interaccion_like").onclick=this.alerta;
                document.getElementById("interaccion_dislike").onclick=this.alerta;
                this.usuario();
            },
            (error)=>{
                console.log(error);
            }
        )
    }

    sumar_dislike(){
        var datos=new FormData();
        datos.append('interaccion',"dislike");
        datos.append('id',localStorage.getItem("id_articulo"));
        datos.append("user",localStorage.getItem("usuario"));
        fetch("http://localhost/php_insti/puntuar.php",{
            method:"POST",
            body:datos
        })
        .then(res=>res.json())
        .then(
            (result)=>{
                console.log(result);
                document.getElementById("interaccion_like").onclick=this.alerta;
                document.getElementById("interaccion_dislike").onclick=this.alerta;
                this.usuario();
            },
            (error)=>{
                console.log(error);
            }
        )
    }

    coger_datos_usuario(){
        if(Boolean(localStorage.getItem("usuario"))==true){
          var datos= new FormData();
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
    }

    anadir_advertencia(){
        if(entro!=true){
            entro=true;
            var elementopadre=document.getElementById("crear_alerta");
            var elemento=document.createElement("div");
            elemento.setAttribute("id","alerta");
            elemento.setAttribute("role","alert");
            elemento.setAttribute("aria-live","assertive");
            elemento.setAttribute("aria-atomic","true");
            elemento.setAttribute("class","toast toast-demo d-flex align-items-center text-white bg-danger border-0 fade show");

            var elementocuerpo=document.createElement("div");
            elementocuerpo.setAttribute("class","toast-body");
            elementocuerpo.appendChild(document.createTextNode("No puede votar en un post donde ya ha votado"));

            var elementoboton=document.createElement("button");
            elementoboton.setAttribute("type","button");
            elementoboton.setAttribute("class","btn-close btn-close-white ms-auto me-2");
            elementoboton.setAttribute("data-bs-dismiss","toast");
            elementoboton.setAttribute("aria-label","Close");
            elementoboton.onclick=()=>{elementopadre.replaceChild(document.createElement("div"),elemento); entro=false;};

            elemento.appendChild(elementocuerpo);
            elemento.appendChild(elementoboton);
            elementopadre.appendChild(elemento);
        }
    }


    asignar_funciones(){
        if(inter==true){
            document.getElementById("pulsado").onclick=this.alerta;
        }
        if(inter==false){
            document.getElementById("interaccion_like").onclick=this.like;
            document.getElementById("interaccion_dislike").onclick=this.dislike;
        }

    }

    componentDidMount(){
        this.noticia();
        var numero=Math.round(Math.random() * ((curiosidades.length-1)));
        this.setState({curiosidad:curiosidades[numero]});
        this.usuario();
    }

        
    render(){
        
        return (
            <div >
                <div id='todo'onMouseEnter={this.funcion}>
                        {this.state.noticia.map((partes)=><div id='articulo'><h2>{partes.Titulo}</h2></div>)}
                        {this.state.datos_usuario.map((partes)=><Imagen_like gustas={partes.Gusta} nogustas={partes.No_gusta} />)}
                        <div id='crear_alerta'></div>
                    <div id="aqui"></div>
                </div>
                <div className="spinner-border" role="status" id="cargar">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div id='curiosidad'>
                    <figure>
                        <blockquote className="blockquote">
                            <h3>¿Sabías que?</h3>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            {this.state.curiosidad}
                        </figcaption>
                    </figure>
                </div>
                
            </div>
            
        
        );
    }
}

  
  


export default Articulo;
