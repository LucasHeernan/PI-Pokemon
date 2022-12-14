import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Detail from './components/detail/Detail';
import Home from './components/home/Home';
import Welcome from './components/welcome/Welcome';
import CreatePoke from './components/create/CreatePoke';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Switch>
            <Route exact path="/home/create" component={CreatePoke} />
            <Route exact path="/home/:name" component={Detail} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Welcome} />
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
