import React, {Component} from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';

import './people-page.css';

export default class PeoplePage extends Component{
    
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

        if(isError) return <ErrorIndicator/>

        return (
            <div className="row mb2">
                <div className="col-md-6">
                <ItemList onItemSelected={this.onPersonSelected}/>
                </div>
                <div className="col-md-6">
                <PersonDetails id={selectedPerson}/>
                </div>
          </div>
        )
    }
}