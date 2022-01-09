import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';
import SwapiService from '../../services/swapi-service';

import './app.css';


export default class App extends Component {

  state = {
    isError: false
  }

  swapiService = new SwapiService();

  componentDidCatch(){
    this.setState({isError: true})
  }

  render(){

    const {selectedPerson, isError} = this.state;

    if(isError) return <ErrorIndicator/>

    return (
      <div className="app">
        <Header />
        <RandomPlanet />
        <PeoplePage/>
      </div>
    );
  }
  
};
