import React, { Component } from 'react'

export default class AddCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: null,
            name: null,
            set_id: null,
            rarity: null,
            type: null
        }
    }
    
    render() {
        return (
            <div classname='add-card'>
                <h4>Add Card Form</h4>
                <form>
                    <label>Name</label>
                    <input />
                    <label>Set</label>
                    <select>
                        
                    </select>
                    <label></label>
                    <input />
                    <label></label>
                    <input />
                </form>
            </div>
        )
    }
}
