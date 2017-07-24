import React, { Component } from 'react';
import '../css/App.css';
import ClozeCard from '../js/ClozeCard';
import CardList from './CardList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    try {
      var card = new ClozeCard(this.state.fullText, this.state.clozeText);
    } catch (e) {
      console.error(e.message);
      alert('Invalid cloze!');
      return;
    }
    this.setState(prevState => {
      return {
        cards: prevState.cards.concat([card]),
        fullText: '',
        clozeText: ''
      };
    });
  }

  handleInputChange(e) {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Flashcard Generator</h1>
        <form className="cardForm">
          <input
            type="text"
            name="fullText"
            value={this.state.fullText}
            onChange={this.handleInputChange}
            placeholder="Enter the full text"
          />
          <input
            type="text"
            name="clozeText"
            value={this.state.clozeText}
            onChange={this.handleInputChange}
            placeholder="Enter the cloze portion"
          />
          <input type="submit" onClick={this.handleSubmit} />
        </form>
        {this.state.cards && <CardList cards={this.state.cards} />}
      </div>
    );
  }
}

export default App;
