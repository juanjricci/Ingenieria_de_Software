//import './style.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';


const URL = 'http://localhost:8000';

const Comentar = ({ idPublicacion, setIsOpen }) => {

    const [owner, setOwner] = useState("");
    const [contenido, setContenido] = useState("");
    const [errorCom, setErrorCom] = useState("");

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setOwner(user.userId)
            console.log(user.userId)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const today = new Date()
        const fecha = `${today.getDay()}/${today.getMonth()} - ${today.getHours()}:${today.getMinutes()}`
        const data = new FormData();
        data.append('owner', owner)
        data.append('contenido', contenido)
        data.append('fecha', fecha)
        data.append('publicacion', idPublicacion)
        console.log(owner)
        axios.post(`${URL}/api/comentarios/`, data, {
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => {
            console.log(res.data)
            window.location.href = "/"
        }).catch((err) => {
            console.log(err)
            setErrorCom('No se ha ingresado ningun comentario')
        })
    }

    return (
        <div className="container p-4" >
            <div className="card mx-auto p-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="contenido">Comentarios</label>
                        <input type="text" className="form-control" id="contenido" placeholder="Ingresar comentario" onChange={(e) => setContenido(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Comentar</button>
                </form>
                {errorCom ? (<div className="p-4"><div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> {errorCom}
                </div></div>) : (<div></div>)}
            </div>
        </div>
    )
}

export default Comentar