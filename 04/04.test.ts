import { describe, beforeEach, it, expect } from '@jest/globals';
import { PaperRollGrid } from './04';
import { input } from './input';

describe('Day 4: Printing Department', () => {
  describe('Given a grid of paper rolls', () => {
    let testInput: string[] = [
      '..@@.@@@@.',
      '@@@.@.@.@@',
      '@@@@@.@.@@',
      '@.@@@@..@.',
      '@@.@@@@.@@',
      '.@@@@@@@.@',
      '.@.@.@.@@@',
      '@.@@@.@@@@',
      '.@@@@@@@@.',
      '@.@.@@@.@.'
    ]
    let grid: PaperRollGrid;
    beforeEach(() => {
      grid = new PaperRollGrid();
      grid.setGrid(testInput);
    });
    it('should be able to create a new grid of paper rolls', () => {
      expect(grid.getGrid()).toEqual(testInput);
    });
    it('should be able to get the value of a cell in the grid', () => {
      expect(grid.getCellValue(-1, 0)).toEqual(undefined);
      expect(grid.getCellValue(0, 0)).toEqual('.');
      expect(grid.getCellValue(0, 1)).toEqual('.');
      expect(grid.getCellValue(0, 2)).toEqual('@');
      expect(grid.getCellValue(0, 3)).toEqual('@');
      expect(grid.getCellValue(0, 4)).toEqual('.');
      expect(grid.getCellValue(0, 5)).toEqual('@');
      expect(grid.getCellValue(0, 6)).toEqual('@');
    });
    it('should be able to get adjacent cells', () => {
      expect(grid.getAdjacentCells(0, 0)).toEqual(['.', '@', '@']);
      expect(grid.getAdjacentCells(0, 1)).toEqual(['.', '@', '@', '@', '@']);
      expect(grid.getAdjacentCells(0, 2)).toEqual(['.', '@', '@', '@', '.']);
      expect(grid.getAdjacentCells(2, 1)).toEqual(['@', '@', '@', '@', '@', '@', '.', '@']);
    });

    it('should get the number of rolls in adjacent cells', () => {
      expect(grid.getNumberOfRollsInAdjacentCells(0, 0)).toEqual(2);
      expect(grid.getNumberOfRollsInAdjacentCells(0, 1)).toEqual(4);
      expect(grid.getNumberOfRollsInAdjacentCells(0, 2)).toEqual(3);
      expect(grid.getNumberOfRollsInAdjacentCells(2, 1)).toEqual(7);
      expect(grid.getNumberOfRollsInAdjacentCells(5, 5)).toEqual(6);
    });
    it('should indentify a valid paper roll ', () => {
      expect(grid.isRemovablePaperRoll(0, 0)).toEqual(false);
      expect(grid.isRemovablePaperRoll(0, 2)).toEqual(true);
      expect(grid.isRemovablePaperRoll(2, 1)).toEqual(false);
    });
    it('should identify the valid paper rolls in the grid', () => {
      const validatedGrid = [
        '..xx.xx@x.',
        'x@@.@.@.@@',
        '@@@@@.x.@@',
        '@.@@@@..@.',
        'x@.@@@@.@x',
        '.@@@@@@@.@',
        '.@.@.@.@@@',
        'x.@@@.@@@@',
        '.@@@@@@@@.',
        'x.x.@@@.x.'
      ]
      expect(grid.getRemovableGrid()).toEqual(validatedGrid);
    });
    it("should return the number of valid paper rolls in the grid", () => {
      expect(grid.getNumberOfRemovablePaperRolls()).toEqual(13);
      grid.setGrid([]);
      expect(grid.getNumberOfRemovablePaperRolls()).toEqual(0);
      grid.setGrid(input);
      expect(grid.getNumberOfRemovablePaperRolls()).toEqual(1435);
    });

    it("should be able to run getNumberOfValidPaperRolls recusively", () => {
      expect(grid.getNumberOfRemovablePaperRolls(true)).toEqual(43);
      grid.setGrid([]);
      expect(grid.getNumberOfRemovablePaperRolls(true)).toEqual(0);
      grid.setGrid(input);
      expect(grid.getNumberOfRemovablePaperRolls(true)).toEqual(8623);
    });
  });
});