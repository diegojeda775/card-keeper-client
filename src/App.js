import React, { Component }from 'react';
import { Route, Link } from 'react-router-dom';
import Instructions from './Instructions/instructions';
import About from './About/about';
import AddCard from './AddCard/add-card';
import AddSet from './AddSet/add-set';
import Cards from './Cards/cards';
import config from './config';
import keeperContext from "./keeper-context";

import './App.css';

class App extends Component {
  state = {
    sets: [],
    cards: []
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/sets`),
      fetch(`${config.API_ENDPOINT}/cards`)
    ])
      .then(([setsRes, cardsRes]) => {
        if (!setsRes.ok)
          return setsRes.json().then(e => Promise.reject(e))
        if (!cardsRes.ok)
          return cardsRes.json().then(e => Promise.reject(e))

        return Promise.all([
          setsRes.json(),
          cardsRes.json(),
        ])
      })
      .then(([sets, cards]) => {
        this.setState({ sets, cards })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleAddSet = newSet => {
    this.setState({
      sets: [
        ...this.state.sets,
        newSet
      ]
    })
  }
  handleAddCard = newCard => {
    this.setState({
      cards: [
        ...this.state.cards,
        newCard
      ]
    })
  }
  handleDeleteCard = cardId => {
    this.setState({
      cards: this.state.cards.filter(card => card.id !== cardId)
    })
  }
  render() { 
    const value = {
      sets: this.state.sets,
      cards: this.state.cards,
      addSet: this.handleAddSet,
      addCard: this.handleAddCard,
      deleteCard: this.handleDeleteCard
    }   
    
    return (
      <keeperContext.Provider value={value}>
        <div className="app">
          <nav className="app-nav-header">
            <div>
              <Link to='/'>
                <h1>Card Keeper</h1>
              </Link>
            </div>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/cards'>Cards</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
            </ul>
          </nav>
          <div className='app-main'>
            <Route
              exact
              path='/'
              component={Instructions}
            />
            <Route
              path='/about'
              component={About}
            />
            {['/cards', '/cards/:setId'].map(path => 
              <Route
                exact
                key={path}
                path={path}
                component={Cards}
              />
            )}
            
            <Route
              path='/add-set'
              component={AddSet}
            />
            <Route
              path='/add-card'
              component={AddCard}
            />
          </div>
        </div>
      </keeperContext.Provider>
    );
  }
}

export default App;
