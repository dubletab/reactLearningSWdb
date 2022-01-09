import React, {Component} from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import Row from '../row';


import './people-page.css';
import SwapiService from '../../services/swapi-service';

export default class PeoplePage extends Component{

    swapiService = new SwapiService();
    
    state = {
        selectedPerson: null,
        hasError: false
    }
    
    componentDidCatch(){
        this.setState({isError: true})
    }

    onPersonSelected = (id) => {
        this.setState({
          selectedPerson: id
        })
      }

    render(){
        const {selectedPerson, isError} = this.state;

        const itemList = (
            <ItemList onItemSelected={this.onPersonSelected}
                        getData={this.swapiService.getAllPersons}
                        renderItem={(item) => {return item.name}}
                />
        );

        const personDetails = (
            <PersonDetails id={selectedPerson}/>
        )

        if(isError) return <ErrorIndicator/>

        return ( 
            <div>
            <Row left={itemList} right={personDetails}/>
            </div>
        )
    }
}