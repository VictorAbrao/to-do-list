import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignupDetails from './pages/SignupDetails'; // Importando a página de detalhes do cadastro

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup-details" component={SignupDetails} /> {/* Rota para os detalhes do cadastro */}
        {/* Adicione outras rotas conforme necessário */}
      </Switch>
    </Router>
  );
}

export default App;
