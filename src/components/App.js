import React, { Component } from 'react';
import '../css/App.css';
import ClozeCard from '../js/ClozeCard';
import CardList from './CardList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.loadCards(JSON.parse(localStorage.getItem('cards'))) || [],
      showHelp: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveCards = this.saveCards.bind(this);
    this.clearCards = this.clearCards.bind(this);
    this.focus = this.focus.bind(this);
    this.showHelp = this.showHelp.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.focus();
    try {
      var card = new ClozeCard(this.state.fullText, this.state.clozeText);
    } catch (e) {
      console.error(e.message);
      alert('Invalid card. The cloze term has to match part of the full text. See the Help section for more info.');
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

  saveCards(e) {
    e.preventDefault();
    localStorage.setItem('cards', JSON.stringify(this.state.cards));
  }

  loadCards(arr) {
    if (arr === null) return null;
    return arr.map(obj => {
      return new ClozeCard(obj.text, obj.cloze);
    });
  }

  clearCards(e) {
    e.preventDefault();
    localStorage.removeItem('cards');
    this.setState({ cards: [] });
  }

  focus() {
    this.textInput.focus();
  }

  showHelp(e) {
    e.preventDefault();
    this.setState(prevState => {
      return {
        showHelp: !prevState.showHelp
      };
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Flashcard Generator</h1>
        {this.state.showHelp &&
          <div className="helpCard">
            <h3>What are Cloze Tests?</h3>
            <p>
              <a href="https://en.wikipedia.org/wiki/Cloze_test">Cloze tests</a> are a way of learning new terms or
              concepts.
            </p>
            <p>
              The process is straightforward. Write out the full text of the item you are trying to learn. Then, write
              out which portion of the text should be learned. This text will be removed from the full text and replaced
              by the placeholder '...'
            </p>
            <p>
              From there, use the generated flashcards to study! You can save your cards so they'll still be here when
              you come back. This app even works locally, so you can use it offline. Enjoy!
            </p>
          </div>}
        <form className="cardForm">
          <input
            type="text"
            name="fullText"
            value={this.state.fullText}
            onChange={this.handleInputChange}
            ref={input => {
              this.textInput = input;
            }}
            placeholder="Enter the full text"
          />
          <input
            type="text"
            name="clozeText"
            value={this.state.clozeText}
            onChange={this.handleInputChange}
            placeholder="Enter the cloze portion"
          />
          <div>
            <input type="submit" onClick={this.handleSubmit} />
            {this.state.cards.length > 0 &&
              <button className="save" onClick={this.saveCards}>
                Save
              </button>}
            {this.state.cards.length > 0 &&
              <button className="clear" onClick={this.clearCards}>
                Clear
              </button>}
            <button className="help" onClick={this.showHelp}>
              {this.state.showHelp ? 'Close' : 'Help'}
            </button>
          </div>
        </form>
        {this.state.cards && <CardList cards={this.state.cards} />}
      </div>
    );
  }
}

export default App;
