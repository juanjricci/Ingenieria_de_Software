import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './componentes/Navigation';
import PaginaPrincipal from './componentes/PaginaPrincipal';
import Login from './componentes/Login';
import Register from './componentes/Register';
import PublicarFoto from './componentes/popup/PublicarFoto';


function App() {
  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<PaginaPrincipal/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/publicar" element={<PublicarFoto/>}/>
      </Routes>
    </Router>
  );
}

export default App;
