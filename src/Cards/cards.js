import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import keeperContext from "../keeper-context";
import config from '../config';
import './cards.css'

export default class Cards extends Component {
    static contextType = keeperContext

    handleDelete(event){
        event.preventDefault();
        const cardId = event.target.id;
        fetch(`${config.API_ENDPOINT}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(() => {
            this.context.deleteCard(cardId);
            this.props.history.go(0);
        })
    }
    renderSetNav(){
        return(
            <div className='sets-nav'>
                <h4>Sets</h4>
                <ul className='sets-nav-list'>
                    <li key='all' className='set-nav-link'>
                        <NavLink to={`/cards`} >
                            All
                        </NavLink>
                    </li>
                    {this.context.sets.map(set =>
                        <li key={set.id} className='set-nav-link'>
                            <NavLink to={`/cards/${set.id}`} className='link-ac'>
                                {set.title}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className='sets-nav-btn'>
                    <Link to='/add-set'>
                        <button className='sets-add-btn'>Add Set</button>
                    </Link>
                </div>
            </div>
        )
    }

    renderCards(){
        const { setId } = this.props.match.params;
        const cards = this.context.cards;
        // eslint-disable-next-line
        const cardsInSet = (!setId) ? cards : cards.filter(card => card.set_id === Number(setId))

        return (
            <div className='cards-in-set'>
                <h4>Cards</h4>
                <ul className='cards-list'>
                    {cardsInSet.map(card =>
                        <div key={card.id} className='card'>
                            <li key={card.id} >
                                <p className='card-name'>{card.name}</p>
                                <p className='card-rarity'>{card.rarity}</p>
                                <p className='card-type'>{card.type}</p>
                            </li>
                            <div style={{ margin: "40px" }}>
                                <button 
                                    style={{ margin: "5px" }} 
                                    id={card.id} 
                                    onClick={(event) => this.handleDelete(event)}
                                >
                                        Delete
                                </button>
                                <Link to={`/cards/${card.id}/edit`}>
                                    <button style={{ margin: "5px" }}>Edit</button>
                                </Link>
                            </div>
                        </div> 
                        
                    )}
                </ul>
                <div className='cards-btn'>
                    <Link to='/add-card'>
                        <button className='cards-add-btn'>Add Card</button>
                    </Link>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className='set-cards'>
                {this.context.loading === false ? this.renderSetNav() : <p>Loading...</p>}
                {this.context.loading === false ? this.renderCards() : <p>Loading...</p>}
            </div>
        )
    }
}
