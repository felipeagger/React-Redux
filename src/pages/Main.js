import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from '../components/Navbar';
import {isMobile} from 'react-device-detect';
import api from '../services/api';

//import logo from '../assets/logo.svg';

export default function Main({ history, match }){
    const [usuarios, setUsuarios] = useState([]);
    //const [page, setPage] = useState(1);   
    var page; 

    const [layout, setLayout] = useState(null);

    useEffect(() => {
      async function loadDados(){
        
        const response = await api.get('/users');

        setUsuarios(response.data);
        //setPage(page + 1);
        page = 1;

        if (isMobile) {
          setLayout('mob');   
        } else {    
          setLayout('web');
        }

    }

      loadDados();
    }, []);



    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    /* Scroll infinito nao ta funcionando pq nao ta disparando evento ao chegar no final da pagina, talvez calculo esteja errado */
    async function handleScroll() {
    
         //if (((document.documentElement.scrollTop) / (page * window.innerHeight)) / page >= 5.80) {
        if (((document.documentElement.scrollTop) / 2400) >= page) {

            page = page + 1;

            //Comentei para nao da erro
            //fetchMoreListItems(page - 1);

        } else {
            return;
        }
    }  

    async function fetchMoreListItems(pagecount) {        
        
        //é so uma url ficticia, nao existe, se o consol.log aparecer é pq deu certo
        console.log('Buscou mais...');

        /*
        const response = await api.get(`/users?page=${pagecount}/15`);             

        setUsuarios(prevState => ([...prevState, ...response.data]));
        */      
    }

    //------

    return (
        <div className="main">           
    
        <Navbar2/>
              
               <div className="main-container">        

                    { usuarios.length > 0 ? (
                    <ul id="ullist" className={"main-container ul"+layout}> 
                        {usuarios.map(usuario => (
                            <Link to={`/usuario/${usuario.id}`} >
                                <li id="lilist" className={"main-container li"+layout} key={usuario.id}>

                                    <img src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'/>
                       
                                    <footer>                                       
                                        <strong>{usuario.username}</strong>                                       
                                    </footer>
                                
                                </li>
                            </Link>
                        ))}     
                    </ul>     
                    ) : (
                        <div className="empty">Nenhum Usuario :(</div>
                    ) }    
            </div>
        </div>
    );
}