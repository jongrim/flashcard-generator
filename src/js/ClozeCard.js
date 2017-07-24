export default class ClozeCard {
  constructor(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.partial = this.text.replace(cloze, '...');
    if (this.partial === this.text) {
      throw new Error('Invalid cloze!');
    }
  }
}
