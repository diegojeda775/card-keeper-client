import React from 'react'

export default React.createContext({
    sets: [],
    cards: [],
    addSet: () => {},
    addCard: () => {},
    deleteCard: () => {},
    updateCard: () => {}
})