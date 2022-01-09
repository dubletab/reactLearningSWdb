import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

  componentDidMount(){
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 10000);
  }


  componentWillUnmount(){
    clearInterval(this.interval);
  }

  swapiService = new SwapiService();

  state = { 
    planet: {},
    loading: true,
    error: false
  };

  onError = (e) => {
    this.setState({error: true, loading: false})
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 15) + 3;
    console.log(id);
    this.swapiService.getPlanet(id)
      .then((planet)=>{
        this.setState({planet, loading: false});
      }).
      catch(this.onError);
  }

  render() {
    const {loading, planet, error} = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/> : null;
    const planetBody = hasData ? <ViewPlanet planet={planet}/> : null;


    return (
      <div className="random-planet jumbotron rounded">
      {errorMessage}
      {spinner}
      {planetBody}
      </div>
    );
  }
}


const ViewPlanet = ({planet})=>{
  const {name, population, rotationPeriod, diameter, id} = planet;
  return(
    <React.Fragment>
      <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  )
}