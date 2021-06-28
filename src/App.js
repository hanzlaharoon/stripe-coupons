// import logo from './logo.svg';
// import './App.css';

import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import AddCoupon from './components/AddCoupon';

function App() {
  return (
    <Router>

      <Switch>
        <Route exact path='/' component={() => <Login loginProp={true} />} />
        <Route path='/login' component={() => <Login loginProp={true} />} />
        <Route path='/signup' component={() => <Login loginProp={false} />} />
        <Route path='/coupons' component={Home} />
        <Route path='/addCoupon' component={AddCoupon} />
      </Switch>

    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
