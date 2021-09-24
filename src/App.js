import {BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//auth components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

//landing components
import landing from "./components/landing";
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={landing}/>
          <Route exact path = "/register" component = {Register} />
          <Route exact path = "/login" component = {Login} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
