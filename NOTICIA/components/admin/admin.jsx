import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [autor, setAutor] = useState("");
  const [imagen, setImagen] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [idNoticia, setIdNoticia] = useState("");
  const [editar, setEditar] = useState(false);
  const [noticiasList, setNoticias] = useState([]);

  useEffect(() => {
    getNoticias();
  }, []);

  const addNoticia = () => {
    Axios.post("http://localhost:3002/item", {
      titulo: titulo,
      contenido: contenido,
      fecha_publicacion: fechaPublicacion,
      categorias: categorias,
      autor: autor,
      imagen: imagen,
      localizacion: localizacion
    })
      .then(() => {
        getNoticias();
        limpiarCampos();
        mostrarMensajeExitoso("Registro exitoso", `La noticia "${titulo}" fue registrada con éxito.`);
      })
      .catch((error) => {
        mostrarMensajeError("Error", obtenerMensajeDeError(error));
      });
  };

  const updateNoticia = () => {
    Axios.put(`http://localhost:3002/item/${idNoticia}`, {
      titulo: titulo,
      contenido: contenido,
      fecha_publicacion: fechaPublicacion,
      categorias: categorias,
      autor: autor,
      imagen: imagen,
      localizacion: localizacion
    })
      .then(() => {
        getNoticias();
        limpiarCampos();
        mostrarMensajeExitoso("Actualización exitosa", `La noticia "${titulo}" fue actualizada con éxito.`);
      })
      .catch((error) => {
        mostrarMensajeError("Error", obtenerMensajeDeError(error));
      });
  };

  const deleteNoticia = (val) => {
    Swal.fire({
      title: 'Confirmar eliminación',
      html: `¿Realmente desea eliminar la noticia "${val.titulo}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3002/item/${val._id}`)
          .then(() => {
            getNoticias();
            limpiarCampos();
            mostrarMensajeExitoso("Eliminado", `La noticia "${val.titulo}" fue eliminada.`);
          })
          .catch((error) => {
            mostrarMensajeError("Error", "No se logró eliminar la noticia: " + obtenerMensajeDeError(error));
          });
      }
    });
  };

  const limpiarCampos = () => {
    setTitulo("");
    setContenido("");
    setFechaPublicacion("");
    setCategorias([]);
    setAutor("");
    setImagen("");
    setLocalizacion("");
    setIdNoticia("");
    setEditar(false);
  }

  const editarNoticia = (val) => {
    setEditar(true);
    setTitulo(val.titulo);
    setContenido(val.contenido);
    setFechaPublicacion(val.fecha_publicacion);
    setCategorias(val.categorias);
    setAutor(val.autor);
    setImagen(val.imagen);
    setLocalizacion(val.localizacion);
    setIdNoticia(val._id);
  }

  const mostrarMensajeExitoso = (title, message) => {
    Swal.fire({
      title: `<strong>${title}</strong>`,
      html: `<i>${message}</i>`,
      icon: 'success',
      timer: 3000
    });
  }

  const mostrarMensajeError = (title, message) => {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message
    });
  }

  const obtenerMensajeDeError = (error) => {
    return JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message;
  }

  const getNoticias = () => {
    Axios.get("http://localhost:3002/item")
      .then((response) => {
        setNoticias(response.data);
      })
      .catch((error) => {
        mostrarMensajeError("Error", "No se pueden obtener las noticias: " + obtenerMensajeDeError(error));
      });
  }

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE NOTICIAS
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Título:</span>
            <input
              type="text"
              onChange={(event) => setTitulo(event.target.value)}
              className="form-control"
              value={titulo}
              placeholder="Ingrese un título"
              aria-label="Titulo"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Contenido:</span>
            <textarea
              value={contenido}
              onChange={(event) => setContenido(event.target.value)}
              className="form-control"
              placeholder="Ingrese el contenido"
              aria-label="Contenido"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Fecha de publicación:</span>
            <input
              type="date"
              value={fechaPublicacion}
              onChange={(event) => setFechaPublicacion(event.target.value)}
              className="form-control"
              aria-label="Fecha de publicación"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Categorías:</span>
            <input
              type="text"
              value={categorias.join(", ")}
              onChange={(event) => setCategorias(event.target.value.split(", "))}
              className="form-control"
              placeholder="Ingrese las categorías separadas por coma"
              aria-label="Categorías"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Autor:</span>
            <input
              type="text"
              value={autor}
              onChange={(event) => setAutor(event.target.value)}
              className="form-control"
              placeholder="Ingrese el autor"
              aria-label="Autor"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Imagen:</span>
            <input
              type="text"
              value={imagen}
              onChange={(event) => setImagen(event.target.value)}
              className="form-control"
              placeholder="Ingrese la URL de la imagen"
              aria-label="Imagen"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Localización:</span>
            <input
              type="text"
              value={localizacion}
              onChange={(event) => setLocalizacion(event.target.value)}
              className="form-control"
              placeholder="Ingrese la localización"
              aria-label="Localización"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          {editar ? (
            <div>
              <button className='btn btn-warning m-2' onClick={updateNoticia}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
          ) : (
            <button className='btn btn-success' onClick={addNoticia}>Registrar</button>
          )}
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Título</th>
            <th scope="col">Fecha de publicación</th>
            <th scope="col">Categorías</th>
            <th scope="col">Autor</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {noticiasList.map((val, key) => (
            <tr key={val._id}>
              <th>{key + 1}</th>
              <td>{val.titulo}</td>
              <td>{val.fecha_publicacion}</td>
              <td>{val.categorias.join(", ")}</td>
              <td>{val.autor}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" onClick={() => editarNoticia(val)} className="btn btn-info">Editar</button>
                  <button type="button" onClick={() => deleteNoticia(val)} className="btn btn-danger">Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
