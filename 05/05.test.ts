import { describe, it, expect } from '@jest/globals';
import { Inventory } from './05';
import { input } from './input';

describe('Day 5: Cafeteria', () => {
  describe('Given an inventory', () => {
    let inventory: Inventory;
    let testInput: string = '3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32';
    beforeEach(() => {
      inventory = new Inventory();

    });
    describe('When the inventory is set', () => {
      beforeEach(() => {
        inventory.setInventory(testInput);
      });
      it('should be able to set the ranges of fresh items', () => {
        expect(inventory.getFreshItemRanges()).toEqual([[3, 5], [10, 20]]);
      });
      it('should be able to test an item against the ranges of fresh items', () => {
        expect(inventory.testItem(1)).toEqual(false);
        expect(inventory.testItem(5)).toEqual(true);
        expect(inventory.testItem(8)).toEqual(false);
        expect(inventory.testItem(11)).toEqual(true);
        expect(inventory.testItem(17)).toEqual(true);
        expect(inventory.testItem(32)).toEqual(false);
      });
      it('should return the fresh items', () => {
        expect(inventory.getFreshItems()).toEqual(['5', '11', '17']);
        expect(inventory.getFreshItems().length).toEqual(3);
        inventory.setInventory(input);
        expect(inventory.getFreshItems().length).toEqual(789);
      });

      it('should return all the fresh IDs in the inventory', () => {
        expect(inventory.getTotalOfFreshIds()).toEqual(14);
        inventory.setInventory(input);
        expect(inventory.getTotalOfFreshIds()).toEqual(343329651880509);
      });
    });
  });
});