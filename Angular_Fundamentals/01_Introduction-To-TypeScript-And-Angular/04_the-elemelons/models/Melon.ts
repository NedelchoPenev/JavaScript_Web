export abstract class Melon {
    constructor(public weight: number, public melonSort: string) {}

    elementIndex() : number{
        return this.weight * this.melonSort.length
    }

    toString() : string {
        return `Element: ${this.constructor.name}
Sort: ${this.melonSort}
Element Index: ${this.elementIndex()}`
    }
}