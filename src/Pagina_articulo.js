import './Pagina_articulo.css';
import React from 'react';

class Articulo extends React.Component {

    constructor(props){
        super(props);
        this.state={value:"", articulo:[], id_articulo:''}
        this.noticia=this.recoger_articulo.bind();
    }

    recoger_articulo(){
        var datos=new FormData();
        datos.append('principal', false);
        datos.append('id',this.state.id_articulo);
        fetch("http://localhost/php_insti/recoger_informacion.php",{
            method:"POST",
            body:datos
        })
        .then(res=>res.json())
        .then(
            (result)=>{
                this.setState({
                    articulo:result
                })
            },
            (error)=>{
                console.log(error);
            }
        )
    }
        
    render(){
        return (
            <div id='todo'>
                <h2>{this.state.articulo.Titulo}</h2>

                <p>{this.state.articulo.Cuerpo}</p>
            </div>
        
        );
    }
}

  
  


export default Articulo;
