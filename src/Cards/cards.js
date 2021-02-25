import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class Cards extends Component {
    renderSetNav(){
        return(
            <div className='sets-nav'>
                <h4>Sets</h4>
                <ul className='sets-nav-list'>
                    <li key='all' className='set-nav-link'>
                        <NavLink to={`/cards`}>
                            All
                        </NavLink>
                    </li>
                    {this.props.sets.map(set =>
                        <li key={set.id} className='set-nav-link'>
                            <NavLink to={`/cards/${set.id}`}>
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
        const cards = this.props.cards
        // eslint-disable-next-line
        const cardsInSet = (!setId) ? cards : cards.filter(card => card.set_id == setId)

        return (
            <div className='cards-in-set'>
                <h4>Cards</h4>
                <ul className='cards-list'>
                    {cardsInSet.map(card => 
                        <li key={card.id} className='card'>
                            <p className='card-name'>{card.name}</p>
                            <p className='card-rarity'>{card.rarity}</p>
                            <p className='card-type'>{card.type}</p>
                        </li>
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
                {this.renderSetNav()}
                {this.renderCards()}
            </div>
        )
    }
}
