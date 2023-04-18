import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import PaginaPrincipal from './PaginaPrincipal';

const URL_PRODUCTOS = 'http://localhost:8000';

const Login = () => {

    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [users, setUsers] = useState([]);
    const [loginError, setLoginError] = useState("");

    /*useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUsers(user)
            console.log(users)
        }
    }, [])*/

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            username: usuario,
            password: clave
        }
        console.log(data)
        axios.post(`${URL_PRODUCTOS}/api/auth/login`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYzNjIwOTUyNX0.OqD6vtfGhSUV_pg4sMOkYcVz6IyHYWkDU2CbcDREfvguVHxcZCjNXxq8M0kluftIblQnt8U4qbjXk-2gdJfpSA'
            },
        }).then((res) => {
            const user = res.data.user.username
            const userId = res.data.user.id
            const sesionData = {
                userId: userId,
                username: user
            }
            console.log(res.data)
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(sesionData)
            )
            window.location.href = "/";
        }).catch((err) => {
            console.log(err)
            setLoginError('Usuario o clave incorrectos. Vuelva a ingresarlos!')
        })
    }

    return (
        <div className="container p-4" >
            <div className="card mx-auto p-4" style={{ width: '50rem' }}>
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Usuario</label>
                        <input type="usuario" className="form-control" id="usuario" aria-describedby="usuarioHelp" placeholder="Enter username" onChange={(e) => setUsuario(e.target.value)} />
                        <small id="usuarioHelp" className="form-text text-muted">usuario</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Clave</label>
                        <input type="password" className="form-control" id="passwordInput" placeholder="Ingresar clave" onChange={(e) => setClave(e.target.value)} />
                    </div>
                    {console.log(usuario)}
                    {console.log(clave)}
                    <button type="submit" className="btn btn-primary">Ingresar</button>
                    <div>
                        <Link to='/register'>No registrado? Hacé click acá</Link>
                    </div>
                </form>
                {loginError ? (<div className="p-4"><div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> {loginError}
                </div></div>) : (<div></div>)}
            </div>
        </div>
    )
}

export default Login