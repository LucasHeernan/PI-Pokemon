import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Details from './components/details/Details';
import Home from './components/home/Home';
import Welcome from './components/welcome/Welcome';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Switch>
            {/* <Route exact path="/create" component={Create} /> */}
            {/* 5 - FALTA LA RUTA DE CREACIÓN */} 
            <Route exact path="/home/:id" component={Details} />
            {/* 3?4 PÁGINA DE DETALLE (información por ID) */}
            <Route exact path="/home" component={Home} /* SearchBar & Container */ />
            {/* 2 - PÁGINA PRINCIPAL (se ven todos o el buscado por NAME)*/}
            <Route exact path="/" component={Welcome} />
            {/* 1 - PÁGINA INICIAL */}
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
