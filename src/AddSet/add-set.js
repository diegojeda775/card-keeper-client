import React, { Component } from 'react'

export default class AddSet extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: null,
            title: null
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        const newSet ={
            id: this.state.id,
            title: this.state.title,
        };

        this.props.addSet(newSet);
        this.goCards();
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

    componentDidMount(){
        this.setState({
            id: this.props.sets.length + 1
        })
    }

    render() {
        return (
            <div className='add-set'>
                <h4>Add Set Form</h4>
                <form>
                    <label htmlFor='title'>Title</label>
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
