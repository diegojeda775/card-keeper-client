import React, { Component }from 'react';
import { Route, Link } from 'react-router-dom';
import Instructions from './Instructions/instructions';
import About from './About/about';
import AddCard from './AddCard/add-card';
import AddSet from './AddSet/add-set';
import Cards from './Cards/cards';
import config from './config';
import keeperContext from "./keeper-context";
import EditCard from './EditCard/edit-card';
import './App.css';


class App extends Component {
  state = {
    sets: [],
    cards: [],
    loading: true
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
        this.setState({ sets, cards });
        this.setState({loading: false});
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

  handleUpdateCard = (index, updatedCard) => {
    const listCards = [...this.state.cards];
    listCards[index] = updatedCard;
    this.setState({
      cards: listCards
    })
  } 
  render() { 
    const value = {
      sets: this.state.sets,
      cards: this.state.cards,
      loading: this.state.loading,
      addSet: this.handleAddSet,
      addCard: this.handleAddCard,
      deleteCard: this.handleDeleteCard,
      updateCard: this.handleUpdateCard
    }   
    
    return (
      <keeperContext.Provider value={value}>
        <div className="app">
          <nav className="app-nav-header">
            <div className='nav-title'>
              <Link to='/'>
                <h1>Card Keeper</h1>
              </Link>
            </div>
            <ul className='nav-list'>
              <li className='nav-item'>
                <Link to='/'>Home</Link>
              </li>
              <li className='nav-item'>
                <Link to='/cards'>Cards</Link>
              </li>
              <li className='nav-item'>
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

            <Route
              path='/cards/:cardId/edit'
              component={EditCard}
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
