import { describe, beforeEach, it, expect } from '@jest/globals';
import { BatteryBank } from './03';
import { input } from './input';

describe('Day 3: Lobby', () => {
  describe('Given a battery bank', () => {
    let batteryBank: BatteryBank;
    beforeEach(() => {
      batteryBank = new BatteryBank();
    });
    it('should be able to add a bank', () => {
      batteryBank.addBank('1234567890');
      expect(batteryBank.getBanks()).toEqual(['1234567890']);
      batteryBank.addBank('0987654321');
      expect(batteryBank.getBanks()).toEqual(['1234567890', '0987654321']);
      batteryBank.reset();
      expect(batteryBank.getBanks()).toEqual([]);
    });
    it('should be able to get a specific bank', () => {
      batteryBank.addBank('1234567890');
      batteryBank.addBank('0987654321');
      expect(batteryBank.getBank(0)).toEqual('1234567890');
      expect(batteryBank.getBank(1)).toEqual('0987654321');
      expect(batteryBank.getBank(2)).toEqual('');
    });
    it('should be able to get the max jolt value for a bank', () => {
      expect(batteryBank.getMaxJoltValueForBank('987654321111111')).toEqual('98');
      expect(batteryBank.getMaxJoltValueForBank('811111111111119')).toEqual('89');
      expect(batteryBank.getMaxJoltValueForBank('234234234234278')).toEqual('78');
      expect(batteryBank.getMaxJoltValueForBank('818181911112111')).toEqual('92');

      expect(batteryBank.getMaxJoltValueForBank('987654321111111', 12)).toEqual('987654321111');
      expect(batteryBank.getMaxJoltValueForBank('811111111111119', 12)).toEqual('811111111119');
      expect(batteryBank.getMaxJoltValueForBank('234234234234278', 12)).toEqual('434234234278');
      expect(batteryBank.getMaxJoltValueForBank('818181911112111', 12)).toEqual('888911112111');
    });
    describe('Given a list of banks', () => {
      it('should be able to get the max jolt value for a list of banks', () => {
        batteryBank.addBank('987654321111111');
        batteryBank.addBank('811111111111119');
        batteryBank.addBank('234234234234278');
        batteryBank.addBank('818181911112111');
        expect(batteryBank.getJoltValue()).toEqual(357);

        batteryBank.reset();
        expect(batteryBank.getJoltValue()).toEqual(0);
        input.forEach(bank => {
          batteryBank.addBank(bank);
        });
        expect(batteryBank.getJoltValue()).toEqual(17405);

        batteryBank.reset();
        expect(batteryBank.getJoltValue()).toEqual(0);
        input.forEach(bank => {
          batteryBank.addBank(bank);
        });
        expect(batteryBank.getJoltValue(12)).toEqual(171990312704598);
      });
    });
  });
});