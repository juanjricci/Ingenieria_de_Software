import './style.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Resizer from "react-image-file-resizer";



const URL = 'http://localhost:8000';

const PublicarFoto = ({ setIsOpen }) => {

    const [foto, setFoto] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState([]);
    const [owner, setOwner] = useState("");
    const [fotoError, setFotoError] = useState("");

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
        if (foto) {
            data.append('foto', foto, foto.name);
            data.append('descripcion', descripcion)
            data.append('fecha', fecha)
            data.append('owner', owner)
            console.log(owner)
            axios.post(`${URL}/api/publicaciones/`, data, {
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                console.log(res.data)
                window.location.href = "/"
            }).catch((err) => {
                console.log(err)
                setFotoError('Ha ocurrido un problema!')
            })
        }
        else {
            setFotoError('No se ha insertado ninguna imagen')
        }
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                480,
                480,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    return (
        <div className="container p-4" >
            <div className="card mx-auto p-4" style={{ width: '50rem' }}>
                <h1>Subir foto</h1>
                <span className="close-icon" onClick={handleClose}>x</span>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Imagen</label>
                        <input type="file" accept='image/*' onChange={async (e) => {
                            try {
                                const resized = await resizeFile(e.target.files[0])
                                console.log(resized)
                                setFoto(resized)
                            } catch (err) {
                                console.log(err);
                                setFotoError('El archivo insertado no es una imagen')
                            }
                        }
                        } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripcion</label>
                        <input type="text" className="form-control" id="descripcion" placeholder="Ingresar descripcion" onChange={(e) => setDescripcion(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Publicar</button>
                </form>
                {fotoError ? (<div className="p-4"><div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> {fotoError}
                </div></div>) : (<div></div>)}
            </div>
        </div>
    )
}

export default PublicarFoto