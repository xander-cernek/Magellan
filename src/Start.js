import React from "react";
import { Card } from "./Card";

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            display: false
        }
        this.handleChange = event => {
            this.setState({value: event.target.value}); 
        }
        this.handleSubmit = event => {
            this.setState({display: true});
            event.preventDefault();
        }
    }

    render() {
        let card;
        let form = <div>
        <form onSubmit={this.handleSubmit}>
            <label for="seed">Seed (blank for random)</label>
            <br/>
            <input type="text" id="seed" value={this.state.value} onChange={this.handleChange}></input>
            <br/>
            <button>Start</button>
        </form>
        {card}
    </div>
        if (this.state.display) {
            card = <Card seed={this.state.value} />
            form = <div></div>
        }
        return (
            <div>
                {form}
                {card}
            </div>

      )
    }
}

export { Start };