import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './person-details.css';

export default class PersonDetails extends Component {

  state = {
    person: null,
    loading: false
  }
  
  swapiService = new SwapiService();

  componentDidMount(){
    this.updatePerson();
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.id !== prevProps.id){
      this.updatePerson();
    }
  }

  updatePerson(){
    const {id} = this.props;
    if(!id) return;
    this.setState({loading:true})
    this.swapiService.getPerson(id)
      .then((person) =>{
        this.setState({person, loading:false})
      })
  }



  render() {
    if(this.state.loading) return <Spinner/>
    if(!this.state.person) return <span>Select a person!</span>
    const {person: {name, gender, id, birthYear, eyeColor}} = this.state;
    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
