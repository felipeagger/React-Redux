import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { isMobile } from 'react-device-detect';
import Navbar2 from '../components/Navbar';

import api from '../services/api';

import { addPostRequest } from '../store/modules/post/actions';

export default function Main() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);

  /* Nao e mais um state local */
  const [posters, setPosters] = useState([]);

  const [page, setPage] = useState(1);

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
    async function loadDados() {
      const response = await api.get(`/posts?_limit=${page}0`);

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

      setPosters(response.data);
    }

    loadDados();
  }, [page, posters]);

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

  function handlePagination(result) {
    setPage(result === 'prev' ? page - 1 : page + 1);
  }

  return (
    <div className="main">
      <Navbar2 />

      <div className="main-container">
        {posters.length > 0 ? (
          <>
            <ul id="ullist" className={`main-container ul${layout}`}>
              {posters.map(post => (
                <Link to={`/posts/${post.id}`} key={post.id}>
                  <li id="lilist" className={`main-container li${layout}`}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Post-It.jpg"
                      alt="Avatar"
                    />
                    <footer>
                      <strong>{post.title}</strong>
                    </footer>
                  </li>
                </Link>
              ))}
            </ul>
            <div>
              <button
                type="button"
                disabled={page < 2}
                onClick={() => handlePagination('prev')}
              >
                Prev
              </button>
              <span>Page {page}</span>
              <button type="button" onClick={() => handlePagination('next')}>
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="empty">Nenhum Post :(</div>
        )}
      </div>
    </div>
  );
}
