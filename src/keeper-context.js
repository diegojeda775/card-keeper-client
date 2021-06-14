import React from 'react'

export default React.createContext({
    sets: [],
    cards: [],
    loading: '',
    addSet: () => {},
    addCard: () => {},
    deleteCard: () => {},
    updateCard: () => {}
})