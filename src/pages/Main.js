import React, { useEffect, useState } from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';

import { Link } from 'react-router-dom';

import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar2 from '../components/Navbar';
import {isMobile} from 'react-device-detect';

import api from '../services/api';

import { addPostRequest } from "../store/modules/post/actions";


export default function Main({ history, match }){
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);

   /* Nao e mais um state local */
   const [posters, setPosters] = useState([]);

    let [page, setPage] = useState(1);

    /*
    if (localStorage.getItem("posicaoScroll") === undefined &&
        localStorage.getItem("posicaoScroll") === null
      ) {
        localStorage.setItem("posicaoScroll", JSON.stringify(0));
      }
    */

    const [layout, setLayout] = useState(null);

    /*
    const [posicao, setPosicao] = useState(
        JSON.parse(localStorage.getItem("posicaoScroll"))
      );
    */

    useEffect(() => {
      async function loadDados(){

        const response = await api.get('/posts?_start=0&_limit=10');

        //Agora seta via redux
        //setPosts(response.data);

        //console.log('Get da API');
        //console.tron.log(response.data);

        //dataSave(response.data);

        //Teoricamente era para aparecer os posts no console agora
        //console.log('Estado no Redux');
        //console.log(posts);

        page = 1;

        if (isMobile) {
          setLayout('mob');
        } else {
          setLayout('web');
        }

        /*
        let scrollpos = localStorage.getItem("posicaoScroll");

        if (scrollpos !== undefined && scrollpos !== null) {
            // Timeout necessário para funcionar no Chrome

            if (scrollpos <= 100)
            scrollpos = 0;

            console.log(scrollpos); //JSON.parse(scrollpos)
            setTimeout(function() {
            window.scrollTo(0, scrollpos);
            }, 1);
        }
        */
        setPosters(response.data)
      };

      loadDados();

    }, []);

    /*
    useEffect(() => {

      // Verifica mudanças no Scroll e salva no localStorage a posição
       window.onscroll = function(e) {
        setPosicao(window.scrollY);
        localStorage.setItem("posicaoScroll", JSON.stringify(posicao));
      }

        return () => {};
      }, [posicao, page, setPosicao]);

    */


    /*useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);


    /Scroll infinito nao ta funcionando pq nao ta disparando evento ao chegar no final da pagina, talvez calculo esteja errado /
    async function handleScroll() {

        console.log(document.documentElement.scrollTop);

         //if (((document.documentElement.scrollTop) / (page * window.innerHeight)) / page >= 5.80) {
        if (((document.documentElement.scrollTop) / 1350) >= page) {

            page = page + 1;

            //Comentei para nao da erro
            fetchMoreListItems(page - 1);

        } else {
            return;
        }
    }

    async function fetchMoreListItems(pagecount) {

        const response = await api.get(`/posts?_start=${pagecount * 10}&_limit=10`);

        //Agora seta via Redux
        //setPosts(prevState => ([...prevState, ...response.data]));
        //dataSave(response.data); // Isso é equivalente a linha acima?

    }*/

    //------

  return (
    <div className="main">
      <Navbar2/>

      <div className="main-container">
        {posters.length > 0 ? (
          <ul id="ullist" className={"main-container ul"+layout}>
            {posters.map(post => (
              <Link to={`/posts/${post.id}`} >
                <li id="lilist" className={"main-container li"+layout} key={post.id}>
                  <img src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' alt="Avatar" />
                  <footer>
                    <strong>{post.title}</strong>
                  </footer>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="empty">Nenhum Post :(</div>
        ) }
      </div>
    </div>
  );
}
