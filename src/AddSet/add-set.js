import React, { Component } from 'react'
import keeperContext from "../keeper-context";
import config from '../config';
import './add-set.css'

export default class AddSet extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: null
        }
    }

    static contextType = keeperContext

    handleSubmit = e => {
        e.preventDefault();

        const newSet ={
            title: this.state.title,
        };

        fetch(`${config.API_ENDPOINT}/sets`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newSet)
        })
        .then(res => {
            if (!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(newSet => {
            this.context.addSet(newSet);
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
            <div className='add-set'>
                <h4>Add Set Form</h4>
                <form>
                    <label htmlFor='title'>Title:</label>
                    <input 
                        type='text'
                        name='title'
                        id='title'
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
