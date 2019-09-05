import React, { useState, useEffect } from 'react';
import './Detalhe.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isMobile } from 'react-device-detect';
import Navbar from '../components/Navbar';
import api from '../services/api';

export default function Detalhe({ match }) {
  const [post, setPost] = useState('');
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    async function loadPost() {
      const vidpost = match.params.id;

      const response = await api.get(`/posts?id=${vidpost}`);

      setPost(response.data[0]);

      if (isMobile) {
        setLayout('mob');
      } else {
        setLayout('web');
      }
    }

    loadPost();
  }, [match.params.id]);

  useEffect(() => {
    if (post.title) document.title = post.title;
  }, [post]);

  return (
    <div>
      <Navbar />
      <div className={`detalhe-container${layout}`}>
        <img
          src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
          alt="Avatar"
        />

        <br />

        <div className="leitura">
          <strong className={`titulo${layout}`}>{post.title}</strong>
          <br />
          <strong>User Id:{post.userId}</strong>
          <br />
          <p>Detail: {post.body}</p>
        </div>

        <br />
      </div>
    </div>
  );
}
