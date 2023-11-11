import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Card, Button, Modal } from "react-bootstrap";

export default function Noticia ({ searchTerm })  {
  const [noticias, setNoticias] = useState([]);
  const [selectedNoticia, setSelectedNoticia] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    getNoticia();
  }, [searchTerm]);

  const getNoticia = () => {
    let url = "http://localhost:3002/item";

    // Agregar lógica para la búsqueda si hay un término de búsqueda
    if (searchTerm) {
      url = `http://localhost:3002/item/location/${searchTerm}`;
    }

    Axios.get(url)
      .then((response) => {
        setNoticias(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las noticias:", error);
      });
  };

  const handleVerMasClick = (noticia) => {
    setSelectedNoticia(noticia);
    setShowFullContent(false); // Al abrir el modal, muestra la descripción acortada
  };

  const handleCloseModal = () => {
    setSelectedNoticia(null);
    setShowFullContent(false); // Al cerrar el modal, vuelve a mostrar la descripción acortada
  };

  return (
    
    <div className="container">
      <div className="row">
        {noticias.map((noticia, index) => (
          <div key={noticia._id} className="col-md-4 mb-4">
            <Card border="primary" style={{ height: "100%" }}>
              <Card.Body>
                <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                  {noticia.titulo}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Categorías: {noticia.categorias.join(", ")}
                </Card.Subtitle>
                <Card.Text>
                  {showFullContent ? noticia.contenido : `${noticia.contenido.slice(0, 100)}...`}
                </Card.Text>
                <Button variant="primary" onClick={() => handleVerMasClick(noticia)}>
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={selectedNoticia !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedNoticia?.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNoticia && (
            <>
              <img
                src={selectedNoticia.imagen}
                alt="Noticia Imagen"
                className="img-fluid mb-3"
                style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
              />
              <p>{selectedNoticia.contenido}</p>
              {/* Agrega más detalles según sea necesario */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedNoticia && (
            <div style={{ textAlign: 'right' }}>
              <h6 style={{ fontWeight: 'bold' }}>Detalles adicionales:</h6>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><strong>Fecha de publicación:</strong> {selectedNoticia.fecha_publicacion}</li>
                <li><strong>Categorías:</strong> {selectedNoticia.categorias.join(", ")}</li>
                <li><strong>Autor:</strong> {selectedNoticia.autor}</li>
                <li><strong>Localización:</strong> {selectedNoticia.localizacion}</li>
              </ul>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
