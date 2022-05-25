import './App.css';
import React from 'react';
import { TestScripts } from './TestScripts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return(
        <div className="App">
          <TestScripts />
        </div>
      );
    } 
}

export default App;
