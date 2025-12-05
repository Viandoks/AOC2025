export class Inventory {
  private ranges: number[][] = [];
  private itemsToTest: string[] = [];

  setInventory(inventory: string): void {
    const separator = /\n\n/;
    const [ranges, itemsToTest] = inventory.split(separator);
    this.ranges = minimizeValidIdRanges(ranges.split('\n').map(range => range.split('-').map(Number)));
    this.itemsToTest = itemsToTest.split('\n');

    function minimizeValidIdRanges(ranges: number[][]): number[][] {
      const sortedRanges = ranges.sort((a, b) => a[0] - b[0]);
      const minimizedValidIdRanges = [sortedRanges[0]];
      for (let i = 1; i < sortedRanges.length; i++) {
        const max = sortedRanges[i][1]
        const min = sortedRanges[i][0]
        const prevMax = sortedRanges[i - 1][1]
        if(max <= prevMax) {
          continue;
        }
        if(min <= prevMax) {
          minimizedValidIdRanges[minimizedValidIdRanges.length - 1][1] = max;
        } else {
          minimizedValidIdRanges.push(sortedRanges[i]);
        }
      }
      return minimizedValidIdRanges;
    }
  }

  getFreshItemRanges(): number[][] {
    return this.ranges
  }

  testItem(item: number): boolean {
    return this.ranges.some(range => item >= range[0] && item <= range[1]);
  }

  getFreshItems(): string[] {
    return this.itemsToTest.filter(item => this.testItem(Number(item)));
  }

  getTotalOfFreshIds(): number {
    return this.ranges.reduce((sum, range) => {
      return sum + (range[1] - range[0] + 1);
    }, 0);
  }
}