import React, { Component }from 'react';
import { Route, Link } from 'react-router-dom';
import Instructions from './Instructions/instructions';
import About from './About/about';
import AddCard from './AddCard/add-card';
import AddSet from './AddSet/add-set';
import Cards from './Cards/cards';

import './App.css';

class App extends Component {
  render(){
    const sets = [
      {
        id: 1,
        title: 'Zendikar Rising'
      },
      {
        id: 2,
        title: 'Core 2021'
      }
    ]
    const cards = [
      {
        id: 1,
        name: 'Grim Tutor',
        set_id: 2,
        rarity: 'mythic',
        type: 'sorcery',
      },
      {
        id: 2,
        name: 'Lotus Cobra',
        set_id: 1,
        rarity: 'rare',
        type: 'creature',
      },
      {
        id: 3,
        name: 'Spoils of adventure',
        set_id: 1,
        rarity: 'rare',
        type: 'creature',
      }
    ]
    const handleAddSet = newSet => {
      sets.push(newSet)
    }
    const handleAddCard = newCard => {
      cards.push(newCard)
    }
    return (
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
              render={(props) => <Cards {...props} sets={sets} cards={cards} />}
            />
          )}
          
          <Route
            path='/add-set'
            render={(props) => <AddSet {...props} addSet={handleAddSet} sets={sets}/>}
          />
          <Route
            path='/add-card'
            render={(props) => <AddCard {...props} addCard={handleAddCard} cards={cards} sets={sets}/>}
          />
        </div>



      </div>
    );
  }
}

export default App;
