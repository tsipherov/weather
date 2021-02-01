import React, { Component } from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.css";
// import "bootswatch/journal/bootstrap.css";
// import 'bootswatch/dist/slate/bootstrap.min.css';
import { Navbar, NavItem, Nav, Container, Row, Col } from "react-bootstrap";
import './App.css';

const PLACES = [{
  name: "Mexico City",
  zip: "94303"
},
{
  name: "Sunnyvale",
  zip: "94088"
},
{
  name: "Santa Cruz",
  zip: "95062"
},
{
  name: "Honolulu",
  zip: "96803"
},
{
  name: "Salzburg",
  zip: "5122"
},
{
  name: "Córdoba",
  zip: "5135"
}
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => { this.setState({ weatherData: json }); });
  }


  render() {
    const weatherData = this.state.weatherData;

    if (!weatherData) { return <div>Loading!</div> };
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weather.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>


      </div>

    )
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render() {

    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <img
              alt="lg"
              src={logo}
              // width="30px"
              height="30px"
              className="App-logo"
            />{' '}
            React Simple Weather App
            </Navbar.Brand>
        </Navbar>
        {/* <p>{JSON.stringify(weatherData)}</p> */}
        <Container className="mt-5">
          <Row>
            <Col md={3} sm={3}>
              <h3>Select a city</h3>
              <Nav
                className="flex-column"
                variant="pills"
                defaultActiveKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <Nav.Item>
                    <Nav.Link key={index} eventKey={index}>{place.name}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col md={9} sm={9}>
              < WeatherDisplay
                key={activePlace}
                zip={PLACES[activePlace].zip} />


            </Col>
          </Row>
        </Container>
      </div >
    );
  }
}

export default App;