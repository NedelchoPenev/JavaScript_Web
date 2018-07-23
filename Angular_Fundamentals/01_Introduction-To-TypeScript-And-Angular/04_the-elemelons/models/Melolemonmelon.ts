import { Watermelon } from './Watermelon'

export class Melolemonmelon extends Watermelon {
  private elements: string[];
  private index: number;

  constructor(weight: number, melonSort: string) {
    super(weight, melonSort)

    this.elements = [
      'Water',
      'Fire',
      'Earth', 
      'Air'
    ]
    this.index = 0
  }

  getElement = () => this.elements[this.index]

  swap = () => {
    this.index++
    this.index = this.index % this.elements.length
  }
}