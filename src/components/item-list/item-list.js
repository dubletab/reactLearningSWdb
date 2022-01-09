import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {

  swapiService = new SwapiService();

  state = {
    peopleList: []
  };

  componentDidMount(){
    this.swapiService.getAllPersons()
      .then((peopleList)=>{
        this.setState({peopleList})})
  };

  onItemSelected(id){

  }

  renderItems = (arr) => {
    return (
      arr.map(({id, name}) => {
        return (
          <li className="list-group-item" 
          key={id}
          onClick={()=>{this.props.onItemSelected(id)}}>
            {name}
          </li>
        )
      })
    )
  }

  render() {

    const {peopleList} = this.state;
    if(!peopleList[0]) {
      return <Spinner/>
    }

    const items = this.renderItems(peopleList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}
