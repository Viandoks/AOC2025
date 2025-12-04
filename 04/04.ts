export class PaperRollGrid {
  private grid: string[] = [];

  setGrid (grid: string[]): void {
    this.grid = grid;
  }

  getGrid (): string[] {
    return this.grid;
  }

  getCellValue (row: number, column: number): string {
    return this.grid[row]?.[column];
  }

  getAdjacentCells (row: number, column: number): string[] {
    return [
      this.getCellValue(row - 1, column - 1),
      this.getCellValue(row - 1, column),
      this.getCellValue(row - 1, column + 1),
      this.getCellValue(row, column - 1),
      this.getCellValue(row, column + 1),
      this.getCellValue(row + 1, column - 1),
      this.getCellValue(row + 1, column),
      this.getCellValue(row + 1, column + 1),
    ].filter(cell => cell !== undefined);
  }

  getNumberOfRollsInAdjacentCells (row: number, column: number): number {
    return this.getAdjacentCells(row, column).filter(cell => cell === '@').length;
  }

  isRemovablePaperRoll (row: number, column: number): boolean {
    return this.getNumberOfRollsInAdjacentCells(row, column) < 4 && this.getCellValue(row, column) === '@';
  }

  getRemovableGrid (): string[] {
    return this.grid.map((row, rowIndex) => {
      return row.split('').map((cell, columnIndex) => {
        if (this.isRemovablePaperRoll(rowIndex, columnIndex)) {
          return 'x';
        }
        return cell;
      }).join('');
    });
  }

  getNumberOfRemovablePaperRolls (recursive = false): number {
    const originalGrid = this.getGrid();
    // console.log('originalGrid', originalGrid);
    const removableGrid = this.getRemovableGrid();
    // console.log('validatedGrid', validatedGrid);
    const count = removableGrid.reduce((sum, row) => {
      return sum + row.split('').filter(cell => cell === 'x').length;
    }, 0);

    if (recursive && count > 0) {
      this.setGrid(removableGrid);
      this.removePaperRolls();
      return count + this.getNumberOfRemovablePaperRolls(true);
    }
    this.setGrid(originalGrid);
    return count;
  }

  private removePaperRolls (): void {
    this.grid = this.grid.map(row => row.replaceAll('x', '.'));
  }
}