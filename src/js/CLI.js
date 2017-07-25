'use strict';
const fs = require('fs');
const inquirer = require('inquirer');
const ClozeCard = require('./ClozeCard');
const cardsData = require('./cards.json');
const cards = cardsData.map(card => new ClozeCard(card.text, card.cloze));

inquirer
  .prompt([
    {
      name: 'full',
      message: 'Enter the full text for the card'
    },
    {
      name: 'cloze',
      message: 'Enter the portion to remove'
    }
  ])
  .then(answers => {
    const card = new ClozeCard(answers.full, answers.cloze);
    cards.push(card);
    fs.writeFile('./cards.json', JSON.stringify(cards), err => {
      if (err) throw err;
      console.log('Data saved to cards.json!');
      console.log('Current card list:');
      cards.forEach(card => console.log(card));
    });
  })
  .catch(err => {
    console.log(err);
  });
