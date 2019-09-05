import React, { useState, useEffect } from 'react';
import './Detalhe.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import {isMobile} from 'react-device-detect';
import api from '../services/api';

export default function Detalhe({ match }){
    const [usuario, setUsuario] = useState('');
    const [layout, setLayout] = useState(null);
      
    useEffect(() => {
        async function loadUsuario(){

          // Aqui estou simulando uma busca de um unico usuario a api, pois nao tem essa roda criada  
          const response = await api.get(`/users`);

          const vidusuario = match.params.id;
          
          let todosusuarios = response.data;          

          let usuariodetalhe = todosusuarios.filter( function (user) {
            return user.id == vidusuario
          });
  
          setUsuario(usuariodetalhe[0]);  
          //
          

          if (isMobile) {
            setLayout('mob');   
          } else {    
            setLayout('web');
          }
        }
  
        loadUsuario();
    }, [match.params.id]);

    useEffect(() => {
        
        if (usuario.name)
        document.title = usuario.name;
        
    }, [usuario]);   


    return (
        <div>
            <Navbar/> 
            <div className={"detalhe-container"+layout}>
            
            <img src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'/>
             
            <br></br>

            <div className={"leitura"}> 
                <strong className={"titulo"+layout}>{usuario.name}</strong>
                <br />                
                <strong>{usuario.username}</strong>
                <br />  
                <p>E-Mail: {usuario.email}</p>               
            </div> 

            <br></br>
            
            </div>
        </div>
    );
}