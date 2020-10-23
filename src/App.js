import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from "axios";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Home from './Components/Home.js';
import Appetizers from './Components/Appetizers.js';
import Lunch from './Components/Lunch.js';
import Maincourse from './Components/Maincourse.js';
import Sides from './Components/Sides.js';
import Desserts from './Components/Desserts.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: [
        { name: "Appetizer", amount: 8, data: [] },
        { name: "Entree", amount: 15, data: [] },
        { name: "Sides", amount: 8, data: [] },
        { name: "Dessert", amount: 8, data: [] },
        { name: "Special", amount: 1, data: [] },
      ],
    }
  }

  async api() {
    let arr = await Promise.all(this.state.menu.map(async (item, index) => {
      let api = `https://entree-f18.herokuapp.com/v1/menu/${item.amount}`

      let data = await axios.get(api)
        .then(function (response) {
          return response.data.menu_items;
        })
        .catch(function (error) {
          alert('error retrieving api');
        })

      item.data = data;
      return item

    }))
    this.setState({ menu: arr });
    localStorage.setItem('menu', JSON.stringify(arr));
  }

  componentDidMount() {
    if (window.localStorage.menu) {
      var menu = localStorage.getItem('menu');
      menu = JSON.parse(menu);
      this.setState({ menu: menu })

    } else {
      this.api();
    }
  }

  Cards(items) {
    console.log('working');
    let newCards = items.map((item, index) => {
      let arr = item.description.split("with")
      return (
        <div className="card">
          <img className="card-img-top" src="..." alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{arr[0]}</h5>
            <p className="card-text">{arr[1]}</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      )
    })
    console.log(newCards)
    return newCards;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>
              <Link to="/">Random Menu</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/Appetizers">Appetizers</Nav.Link>
                <Nav.Link as={Link} to="/Lunch">Lunch</Nav.Link>
                <Nav.Link as={Link} to="/Maincourse">Main Course</Nav.Link>
                <Nav.Link as={Link} to="/Sides">Sides</Nav.Link>
                <Nav.Link as={Link} to="/Desserts">Desserts</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <hr />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Appetizers">
              <Appetizers list={this.state.menu ? this.state.menu[0].data : []}  cards={this.Cards} />
            </Route>
            <Route path="/Lunch">
              <Lunch list={this.state.menu[1].data} />
            </Route>
            <Route path="/Maincourse">
              <Maincourse list={this.state.menu[2].data} />
            </Route>
            <Route path="/Sides">
              <Sides list={this.state.menu[3].data}/>
            </Route>
            <Route path="/Desserts">
              <Desserts list={this.state.menu[4].data} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
