import React from "react";
import './TestScript.css'
import { v4 as uuidv4 } from 'uuid';

class TestScripts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            started: false,
            seed: '',
            engine: initEngine(''),
            deck: defaultDeck(),
            scryfallResponse: [],
            firstSeven: [],
            results: []
         };
        this.handleSeedChange = this.handleSeedChange.bind(this);
        this.revealCards = this.revealCards.bind(this);
        this.handleDeckChange = this.handleDeckChange.bind(this);
        this.handleDeckSubmit = this.handleDeckSubmit.bind(this);
        this.handleRoll = this.handleRoll.bind(this);
    }

    handleSeedChange(event) {
        this.setState({ seed: event.target.value,
                        engine: initEngine(event.target.value)
        });
    }

    revealCards() {
        this.setState({ started: true });
        this.handleRoll();
    }
    
    handleDeckChange(event) {
        this.setState({ deck: event.target.value });
    }

    handleRoll(event) {
        if (event) {
            console.log(event.value);
        }
        this.setState({ firstSeven: roll(this.state) });
    }

    handleDeckSubmit() {
        let deckList = this.state.deck.split("\n");
        let identifiers = [];
        for (let i = 0; i < deckList.length; i++) {
            let numberOfCards = parseInt(deckList[i].slice(0, 1));
            for (let j = 0; j < numberOfCards; j++) {
                identifiers.push({ 'name': deckList[i].slice(2) })
            }
        }
        let jsonData = { "identifiers": identifiers };
        fetch('https://api.scryfall.com/cards/collection/', {  // Enter your IP address here
        
            method: 'POST', 
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    
        })
        .then(response => response.json().then(data => {
            this.setState({scryfallResponse: data['data']})
        }))
        .then(data => {
        // console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    render() {
        let cards;
        if (this.state.started) {
            cards = foo(this.state);
        }
        return(
            <div>
                <div id="deck-input-div">
                    <textarea id="deck-input" onChange={this.handleDeckChange} defaultValue={defaultDeck()}></textarea>
                    <button className="button-1" id="deck-submit-button" onClick={this.handleDeckSubmit}>Submit Deck</button>
                </div>
                <label htmlFor="seed-input">Input seed here (leave blank for random)</label>
                <input id="seed-input" onChange={this.handleSeedChange}></input>
                <button className="button-1" id="startbutton" onClick={this.revealCards}>Start</button>
                <div id="card-box">
                    {cards}
                </div>
                <div id="button-box">
                    <button value="keep" id="keep-button" className="button-1" onClick={this.handleRoll}>Keep</button>
                    <button value="mull" id="keep-button" className="button-1" onClick={this.handleRoll}>Mull</button>
                </div>
            </div>
        );
    }
}

function foo(props) {
    return(<div className="CardDisplayBar">
        {props.firstSeven.map(x => <div className="Card" key={uuidv4()}><img alt={x.name} src={x.image_uris.small}></img></div>)}
    </div>);
}

function initEngine(seed) {
    var rand = require('random-seed').create(seed);
    return rand;
}

function roll(props) {
    console.log(props.scryfallResponse);
    let deckCopy = props.scryfallResponse;
    for (let i = deckCopy.length - 1; i > 0; i--) {
        let j = props.engine(deckCopy.length)
        let temp = deckCopy[i];
        deckCopy[i] = deckCopy[j];
        deckCopy[j] = temp;
    }

    //Return the first 7
    return deckCopy.slice(0, 7);
}

function defaultDeck() {
    return `4 Amulet of Vigor
4 Arboreal Grazer
1 Azusa, Lost but Seeking
1 Boros Garrison
2 Boseiju, Who Endures
2 Castle Garenbrig
2 Cavern of Souls
1 Crumbling Vestige
2 Cultivator Colossus
4 Dryad of the Ilysian Grove
1 Expedition Map
2 Explore
4 Forest
2 Gruul Turf
4 Primeval Titan
1 Radiant Fountain
1 Relic of Progenitus
2 Selesnya Sanctuary
4 Simic Growth Chamber
1 Slayers' Stronghold
4 Summoner's Pact
1 Sunhome, Fortress of the Legion
1 Wooded Foothills
2 Tolaria West
4 Urza's Saga
2 Valakut, the Molten Pinnacle
1 Vesuva`
}

export { TestScripts };