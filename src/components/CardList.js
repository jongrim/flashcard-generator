import React, { Component } from 'react';

const CardList = props => {
  return (
    <ul>
      {props.cards.map((card, index) => {
        return (
          <li>
            <Card partial={card.partial} cloze={card.cloze} />
          </li>
        );
      })}
    </ul>
  );
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partial: props.partial,
      cloze: props.cloze,
      display: props.partial
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.display === this.state.partial) {
      this.setState({ display: this.state.cloze });
    } else {
      this.setState({ display: this.state.partial });
    }
  }

  render() {
    return (
      <div className="card" onClick={this.handleClick}>
        <p>
          {this.state.display}
        </p>
      </div>
    );
  }
}

export default CardList;
