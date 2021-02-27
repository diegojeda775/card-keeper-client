import React, { Component } from 'react'
import keeperContext from "../keeper-context";
import config from '../config';

export default class AddCard extends Component {
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

    handleSubmit = e => {
        e.preventDefault();

        const newCard ={
            name: this.state.name,
            set_id: this.state.set_id,
            rarity: this.state.rarity,
            type: this.state.type
        };
        fetch(`${config.API_ENDPOINT}/cards`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCard)
        })
        .then(res => {
            if (!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(newCard => {
            this.context.addCard(newCard);
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


    render() {
        return (
            <div className='add-card'>
                <h4>Add Card Form</h4>
                <form>
                    <label htmlFor='name'>Name</label>
                    <input 
                        type='text'
                        name='name'
                        id='name'
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
                        onChange={this.handleChange}
                        placeholder='eg. Mythic, Rare, Uncommon or common'
                        required 
                    />

                    <label htmlFor='type'>Type</label>
                    <input 
                        type='text'
                        name='type'
                        id='type'
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
}
