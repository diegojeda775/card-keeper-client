import React, { Component } from 'react'
import keeperContext from "../keeper-context";
import config from '../config';
// import './add-card.css'

export default class EditCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            set_id: '',
            rarity: '',
            type: ''
        }
    }

    static contextType = keeperContext

    getCard(){
        const { cardId } = this.props.match.params
        const cards = this.context.cards;
        const oneCard = cards.find(card => card.id === Number(cardId));
       
        this.setState({
            name: oneCard.name,
            set_id: oneCard.set_id,
            rarity: oneCard.rarity,
            type: oneCard.type
        })
       
            
        }
    
    componentDidMount() {
       this.getCard();  
    }

    handleSubmit = e => {
        e.preventDefault();

        const updatedCard ={
            name: this.state.name,
            set_id: this.state.set_id,
            rarity: this.state.rarity,
            type: this.state.type
        };
        fetch(`${config.API_ENDPOINT}/cards`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedCard)
        })
        .then(res => {
            if (!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(updatedCard => {
            this.context.addCard(updatedCard);
            this.goCards();
        })
        .catch(error => {
            console.log({ error })
        })
       
    }

    handleChange = e => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    goCards = to => {
        this.props.history.push('/cards');
    }

    renderForm(){
        return (
            <div className='add-card'>

                <h4>Edit Card Form</h4>
                <form className='add-card-form'>
                    <label htmlFor='name'>Name</label>
                    <input 
                        type='text'
                        name='name'
                        id='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                    />

                    <label htmlFor='set_id'>Set</label>
                    <select
                        name='set_id'
                        id='set_id'
                        value={this.state.set_id}
                        onChange={this.handleChange}
                        required
                    >
                        <option value={undefined}>...Select a Set</option>
                        {this.context.sets.map(set => <option key={set.id} value={set.id}>{set.title}</option>)} 
                    </select>

                    <label htmlFor='rarity'>Rarity</label>
                    <input
                        type='text'
                        name='rarity'
                        id='rarity'
                        value={this.state.rarity}
                        onChange={this.handleChange}
                        placeholder='eg. Mythic, Rare, Uncommon or Common'
                        required 
                    />

                    <label htmlFor='type'>Type</label>
                    <input 
                        type='text'
                        name='type'
                        id='type'
                        value={this.state.type}
                        onChange={this.handleChange}
                        required 
                    />
                </form>
                <div className='form-btns'>
                    <button type='submit' onClick={this.handleSubmit} className='btn-save'>Save</button>
                    <button onClick={this.goCards} className='btn-cancel'>Cancel</button>
                </div>
            </div>
        )
    }

    render() {
      
        const test = this.state.name
        return (
        <>
            {test && this.renderForm()}
        </>)
    }
}
