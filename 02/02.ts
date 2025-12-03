export class IDChecker {

  static isValid (id: string): boolean {
    if (id.length % 2) return true;
    const halfLength = id.length / 2;
    const firstHalf = id.slice(0, halfLength)
    const secondHalf = id.slice(halfLength, id.length)
    if(firstHalf === secondHalf) return false;
    // console.log(firstHalf, secondHalf)
    // for (let i = 0; i < halfLength; i++) {
    //   if (id[i] === id[i + halfLength]) return false;
    // }
    return true;
  }

  static checkRange (range: string): string[] {
    const [start, end] = range.split('-').map(Number)
    let invalidIDs: string[] = []
    for (let i = start; i <= end; i++) {
      if (!this.isValid(i.toString())) {
        invalidIDs.push(i.toString())
      }
    }
    return invalidIDs
  }

  private static getSumOfIDs (ids: string[]): number {
    return ids.reduce((sum, id) => sum + Number(id), 0)
  }

  static checkRanges (ranges: string): number {
    return ranges.split(',').reduce((sum, r) => {
      return sum + this.getSumOfIDs(this.checkRange(r))
    }, 0)
  }
}

export class IDChecker2 {
  static isValid (id: string): boolean {
    if(id.length === 1) return true
    const half = Math.floor(id.length/2)
    for(let i = 0; i <= half; i++) {
      const pattern = id.slice(0, half - i)
      const splitted = id.split(pattern)
      if(splitted.every(s => s === '')) return false
    }
    return true
  }

  static checkRange (range: string): string[] {
    const [start, end] = range.split('-').map(Number)
    let invalidIDs: string[] = []
    for (let i = start; i <= end; i++) {
      if (!this.isValid(i.toString())) {
        invalidIDs.push(i.toString())
      }
    }
    return invalidIDs
  }

  private static getSumOfIDs (ids: string[]): number {
    return ids.reduce((sum, id) => sum + Number(id), 0)
  }

  static checkRanges (ranges: string): number {
    return ranges.split(',').reduce((sum, r) => {
      return sum + this.getSumOfIDs(this.checkRange(r))
    }, 0)
  }
}