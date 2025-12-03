export class BatteryBank {
  private banks: string[] = [];

  addBank (bank: string): void {
    this.banks.push(bank);
  }

  getBanks (): string[] {
    return this.banks;
  }

  getBank (index: number): string {
    return this.banks[index] || '';
  }

  reset (): void {
    this.banks = [];
  }

  getMaxJoltValueForBank (bank: string, nbOfCells: number = 2): string {
    let index = 0;
    let max = '0';
    for (let i = 0; i < bank.length - nbOfCells + 1; i++) {
      if (Number(bank[i]) > Number(max)) {
        index = i;
        max = bank[i];
      }
    }
    if(nbOfCells > 1) {
      const subBank = bank.slice(index + 1);
      max = max + this.getMaxJoltValueForBank(subBank, nbOfCells - 1);
    }
    return max
  }

  getJoltValue (nbOfCells: number = 2): number {
    let joltValue = 0;
    for (let i = 0; i < this.banks.length; i++) {
      joltValue += Number(this.getMaxJoltValueForBank(this.getBank(i), nbOfCells));
    }
    return joltValue;
  }
}