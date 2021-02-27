import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './instructions.css'

export default class Instructions extends Component {
    render() {
        return (
            <div className='instruction'>
                <h2>Welcome to Card Kepper App</h2>
                <h4>
                    Here the user will be able to keep track of Magic the Gathering cards. 
                    The cards are organized by a "set" folder where the cards displayed to the selected folder.
                    More sets (folders) and cards can be added to your collection.
                </h4>

                <h4>
                    To begin, please click the button "Cards" below.
                </h4>
                <Link to='/cards'>
                    <button className='btn-ins'>Cards</button>
                </Link>
            </div>
        )
    }
}

