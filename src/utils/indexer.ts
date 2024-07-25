export class Indexer {
  private index: number;

  constructor(startIndex?: number) {
    this.index = startIndex || 0;
  }

  public getNext() {
    const result = this.index;
    this.index += 1;
    return result;
  }

  public get lastIndex(): number {
    return this.index - 1;
  }
}
