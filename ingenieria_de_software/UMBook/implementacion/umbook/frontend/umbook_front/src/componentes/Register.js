import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const URL = 'http://localhost:8000';
//const TOKEN_CARRO = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTAwMDAwMTYzNzAxNTE2N30.NPQ2yarG98C4Liq3I0CuzoGmwq_LKuWl3Hbn3fDWfih7y-MYEm2Mw2HqpnbCRqXx0Q8mi3q1NXabt2OR1PkcCw';

const Register = () => {

    const [username, setUsuario] = useState("");
    const [first_name, setNombre] = useState("");
    const [last_name, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setClave] = useState("");
    const [is_staff, setAdministrador] = useState(false);
    const [errorRegistro, setErrorRegistro] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate_password(password) === 0) {

            const data = {
                "username": username,
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password,
                "is_staff": is_staff,
                "is_active": true
            }
            console.log(data);
            try {
                axios.post(`${URL}/api/auth/register`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYzNjIwOTUyNX0.OqD6vtfGhSUV_pg4sMOkYcVz6IyHYWkDU2CbcDREfvguVHxcZCjNXxq8M0kluftIblQnt8U4qbjXk-2gdJfpSA'
                    },
                })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        const userId = res.data.user.id
                        const username = res.data.user.username
                        const datos = {
                            userId: userId,
                            username: username
                        }
                        window.localStorage.setItem(
                            'loggedUser', JSON.stringify(datos)
                        )
                        window.location.href = "/";
                    })
                    .catch((err) => {
                        console.log(err.response.data.username);
                        setErrorRegistro('El nombre de usuario ya existe')
                        console.log(err.response.status);

                    })
            } catch (err) {
                console.error(err);
            }
        }
        else {
            setErrorRegistro("La clave no cumple con los requisitos")
        }
    }

    const validate_password = (password) => {
        let check = /(?=.*[0-9])(?=.{8,})/;
        if (password.match(check)) {
            return 0
        } else {
            return 1
        }
    }

    
    return (
        <div className="container p-4">
            <div className="card mx-auto p-4" style={{ width: '50rem' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nameInput">Usuario</label>
                        <input type="text" className="form-control" id="userInput" placeholder="Ingresar usuario" onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nameInput">Nombre</label>
                        <input type="text" className="form-control" id="nameInput" placeholder="Ingresar nombre" onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastnameInput">Apellido</label>
                        <input type="text" className="form-control" id="lastnameInput" placeholder="Ingresar apellido" onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        <small id="emailHelp" className="form-text text-muted">example@email.com</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Clave</label>
                        <input type="password" className="form-control" id="passwordInput" placeholder="Ingresar clave" onChange={(e) => setClave(e.target.value)} />
                        <small id="passHelp" className="form-text text-muted">
                            <div>Al menos 8 caracteres</div>
                            <div>Debe contener letras y numeros</div>
                        </small>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="esAdminCheck" onChange={(e) => setAdministrador(e.target.checked)} /><span>Es admin?</span>
                    </div>
                    {/**{console.log(nombre)}
                    {console.log(apellido)}
                    {console.log(email)}
                    {console.log(clave)}
                    {console.log(administrador)}*/}
                    <button type="submit" className="btn btn-primary">Registrar</button>
                    <div>
                        <Link to='/login'>Log in</Link>
                    </div>
                </form>
                {errorRegistro ? (<div className="p-4"><div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> {errorRegistro}
                </div></div>) : (<div></div>)}
            </div>
        </div>
    )

}

export default Register