import './Pagina_articulo.css';
import React from 'react';

const cargarImagen = require.context("./Pruebas", true);

var contador=0;

class Articulo extends React.Component {

    constructor(props){
        super(props);
        this.state={value:"", noticia:[],cuerpo:[]}
        this.noticia=this.recoger_articulo.bind(this);
        this.hacer_cuerpo=this.estructura_cuerpo.bind(this);
    }

    

    estructura_cuerpo(){
        try{
            var array_cuerpo=localStorage.getItem("cuerpo").split("//-//");

            var elemento_padre=document.getElementById("aqui");
            if(array_cuerpo[contador].substr(0,4)=="img-"){
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
        }catch(error){
            
            setTimeout(this.noticia,1200);
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
                {this.state.noticia.map((partes)=>localStorage.setItem("cuerpo",partes.Cuerpo))};
                this.setState({
                    noticia : result
                });
                setTimeout(this.hacer_cuerpo,1200);
              
            },
            (error)=>{
                console.log(error);
            }
        )
    }

    

    componentDidMount(){
        this.noticia();
    }

        
    render(){
        
        return (
            <div id='todo'>
                {this.state.noticia.map((partes)=><div id='articulo'><h2>{partes.Titulo}</h2></div>)}
                <div id="aqui"></div>
            </div>
        
        );
    }
}

  
  


export default Articulo;
