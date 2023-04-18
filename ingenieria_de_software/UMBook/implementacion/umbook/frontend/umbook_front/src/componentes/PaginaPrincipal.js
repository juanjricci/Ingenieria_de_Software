import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Comentar from './Comentar';


const URL = 'http://localhost:8000';


function PaginaPrincipal() {

    const [publicaciones, setPublicaciones] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [comentarios, setComentarios] = useState([])
    const [userId, setUserId] = useState()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            getUsuarios()
            getPublicaciones()
            getComentarios()
            const user = JSON.parse(loggedUserJSON)
            setUserId(user.userId)
            console.log(user.userId)
        }
        else {
            window.location.href = "/login";
        }
    }, []);

    const getPublicaciones = async () => {
        const res = await axios.get(`${URL}/api/publicaciones/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setPublicaciones(res.data)
        console.log(res.data)
    }

    const getUsuarios = async () => {
        const res = await axios.get(`${URL}/api/usuarios/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setUsuarios(res.data)
        console.log(res.data)
    }

    const getOwner = (owner_id) => {
        const owner = usuarios.find(element => element.id === owner_id);
        console.log(owner.username)
        return owner.username
    }

    const getComentarios = async () => {
        const res = await axios.get(`${URL}/api/comentarios/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setComentarios(res.data)
        console.log(res.data)
    }

    return (
        <div className="container p-4">
            <ul className="list-group align-items-center">
                {
                    publicaciones.map(
                        (publicacion) =>
                            <li className="list-group-item" key={publicacion.id}>
                                <div className="ms-2 me-auto">
                                    {`${getOwner(publicacion.owner)}`}
                                    <div>
                                        <img
                                            styles={{ minWidth: 100, minHeight: 100 }}
                                            src={`${publicacion.foto}`}
                                        />
                                    </div>
                                    <div className="p-1">{`${publicacion.descripcion}`}</div>
                                    <div className="p-1 text-secondary">{`${publicacion.fecha}`}</div>
                                    {
                                        comentarios.map(
                                            (comentario) =>

                                                <ul className='list-group'>
                                                    {comentario.publicacion === publicacion.id ? (
                                                        <li className="list-group-item" key={comentario.id}>
                                                            <div className='text-secondary'>{getOwner(comentario.owner)}</div>
                                                            <div className='d-flex align-items-end'>
                                                                <div className='col-md-8'>{comentario.contenido}</div>
                                                                <div className='col-md-4 text-secondary'>
                                                                    <div>{comentario.fecha}
                                                                        {comentario.owner === userId ? (<button type='button' className='btn btn-outline-danger btn-sm'>Eliminar</button>):(<div></div>)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ) : (<div></div>)}

                                                </ul>

                                        )
                                    }
                                    <div>
                                        <Comentar idPublicacion={publicacion.id} />
                                    </div>
                                </div>

                            </li>
                    )}
            </ul>
        </div>
    )
}

export default PaginaPrincipal