import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';

const UltimasNoti = ({ apiUrl }) => {
  const [noticias, setNoticias] = useState([]);
  const [search, setSearch] = useState('');

  const showData = async () => {
    try {
      const response = await Axios.get(apiUrl);
      setNoticias(response.data);
    } catch (error) {
      console.error('Error al obtener las noticias:', error);
    }
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    showData();
  }, [apiUrl]);

  const getCurrentMonthNews = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Se suma 1 porque los meses en JavaScript son 0 indexados
    const currentYear = currentDate.getFullYear();

    return noticias.filter((noticia) => {
      const newsDate = new Date(noticia.fecha_publicacion);
      const newsMonth = newsDate.getMonth() + 1;
      const newsYear = newsDate.getFullYear();

      return newsMonth === currentMonth && newsYear === currentYear;
    });
  };

  const results = !search ? getCurrentMonthNews() : getCurrentMonthNews().filter(
    (noticia) => noticia.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <input
        value={search}
        onChange={searcher}
        type="text"
        placeholder="Buscar noticia por título"
        className="form-control"
      />
      <div className="row">
        {results.map((noticia) => (
          <div key={noticia._id} className="col-md-4 mb-4">
            <Card border="primary" style={{ height: '100%' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {noticia.titulo}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Categorías: {noticia.categorias.join(', ')}
                </Card.Subtitle>
                <Card.Text>{noticia.contenido}</Card.Text>
                <Button variant="primary">Ver más</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UltimasNoti;
