import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.seed);
        var gen = require('random-seed');
        var rand4 = gen.create(this.props.seed);
        rand4.initState();
        this.state = {
            scryfallResponse: [],
            randomEngine: rand4,
            seed: this.props.seed
        };
        this.handleClick = e => {
            var deck = ["Amulet of Vigor",
            "Amulet of Vigor",
            "Amulet of Vigor",
            "Amulet of Vigor",
            "Arboreal Grazer",
            "Arboreal Grazer",
            "Arboreal Grazer",
            "Arboreal Grazer",
            "Azusa, Lost but Seeking",
            "Bojuka Bog",
            "Boros Garrison",
            "Boseiju, Who Endures",
            "Boseiju, Who Endures",
            "Castle Garenbrig",
            "Castle Garenbrig",
            "Cavern of Souls",
            "Cavern of Souls",
            "Crumbling Vestige",
            "Cultivator Colossus",
            "Cultivator Colossus",
            "Dryad of the Ilysian Grove",
            "Dryad of the Ilysian Grove",
            "Dryad of the Ilysian Grove",
            "Dryad of the Ilysian Grove",
            "Expedition Map",
            "Explore",
            "Forest",
            "Forest",
            "Forest",
            "Forest",
            "Gruul Turf",
            "Gruul Turf",
            "Primeval Titan",
            "Primeval Titan",
            "Primeval Titan",
            "Primeval Titan",
            "Radiant Fountain",
            "Relic of Progenitus",
            "Selesnya Sanctuary",
            "Selesnya Sanctuary",
            "Simic Growth Chamber",
            "Simic Growth Chamber",
            "Simic Growth Chamber",
            "Simic Growth Chamber",
            "Slayers' Stronghold",
            "Summoner's Pact",
            "Summoner's Pact",
            "Summoner's Pact",
            "Summoner's Pact",
            "Sunhome, Fortress of the Legion",
            "Tolaria West",
            "Tolaria West",
            "Turntimber Symbiosis",
            "Urza's Saga",
            "Urza's Saga",
            "Urza's Saga",
            "Urza's Saga",
            "Valakut, the Molten Pinnacle",
            "Valakut, the Molten Pinnacle",
            "Vesuva"
        ];

        for (let i = deck.length - 1; i > 0; i--) {
            let j = this.state.randomEngine(deck.length)
            let temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }

            var jsonData = {
              "identifiers": [
                {
                  "name": `${deck[0]}`
                },
                {
                  "name": `${deck[1]}`
                },
                {
                    "name": `${deck[2]}`
                },
                {
                    "name": `${deck[3]}`
                  },
                  {
                    "name": `${deck[4]}`
                  },
                  {
                      "name": `${deck[5]}`
                  },
                  {
                      "name": `${deck[6]}`
                  }
              ]
          }

        //   console.log(jsonData);
        
            // Send data to the backend via POST
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
        
          this.handleClick();
    }

    render() {
        return (
            <div>
                <div onClick={this.handleClick} style={{
            textAlign: 'center',
            width: '100px',
            border: '1px solid gray',
            borderRadius: '5px'
        }}>
            Keep
        </div>
        <div onClick={this.handleClick} style={{
            textAlign: 'center',
            width: '100px',
            border: '1px solid gray',
            borderRadius: '5px'
        }}>
            Mull
        </div>
        <div className="CardDisplayBar">{
        this.state.scryfallResponse.map(x => <div className="Card" key={uuidv4()}><img src={x.image_uris.small}></img></div>)}</div>
        </div>
        
        );
    };
  
  }
  
  export { Card };