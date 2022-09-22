import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Details from './components/details/Details';
import Home from './components/home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Switch>
            <Route exact path="/:id" component={Details} />
            <Route exact path="/" component={Home} />
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
