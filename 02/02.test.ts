import { IDChecker, IDChecker2 } from './02';
import { input } from './input';

describe('Day 2: Gift Shop', () => {
  describe('Given an ID checker', () => {
    it('should be able to check if an ID is valid', () => {
      // expect(IDChecker.isValid('0')).toBe(false);
      expect(IDChecker.isValid('1')).toBe(true);
      expect(IDChecker.isValid('11')).toBe(false);
      expect(IDChecker.isValid('12')).toBe(true);
      expect(IDChecker.isValid('121')).toBe(true);
      expect(IDChecker.isValid('1212')).toBe(false);

      expect(IDChecker.isValid('55')).toBe(false);
      expect(IDChecker.isValid('6464')).toBe(false);
      expect(IDChecker.isValid('123123')).toBe(false);
      expect(IDChecker.isValid('1234')).toBe(true);
    });

    describe('Given a range of IDs', () => {
      it('should find the invalid ID in the range', () => {
        expect(IDChecker.checkRange('11-22')).toEqual(['11', '22']);
        expect(IDChecker.checkRange('95-115')).toEqual(['99']);
        expect(IDChecker.checkRange('998-1012')).toEqual(['1010']);
        expect(IDChecker.checkRange('1188511880-1188511890')).toEqual(['1188511885']);
        expect(IDChecker.checkRange('222220-222224')).toEqual(['222222']);
        expect(IDChecker.checkRange('1698522-1698528')).toEqual([]);
        expect(IDChecker.checkRange('446443-446449')).toEqual(['446446']);
        expect(IDChecker.checkRange('38593856-38593862')).toEqual(['38593859']);
        expect(IDChecker.checkRange('565653-565659')).toEqual([]);
      });
    });

    describe('Given a list of ranges', () => {
      it('should adds the invalid IDs to the total', () => {
        let ranges = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124'
        expect(IDChecker.checkRanges(ranges)).toEqual(1227775554);
        expect(IDChecker.checkRanges(input)).toEqual(54641809925);
      });
    });

    describe('Given an ID is invalid if it is made only of some sequence of digits repeated at least twice', () => {
      

      it('should be able to check if an ID is valid', () => {
        expect(IDChecker2.isValid('1')).toBe(true);
        expect(IDChecker2.isValid('11')).toBe(false);
        expect(IDChecker2.isValid('111')).toBe(false);
        expect(IDChecker2.isValid('1111')).toBe(false);
        expect(IDChecker2.isValid('1212')).toBe(false);
        expect(IDChecker2.isValid('11111')).toBe(false);
        expect(IDChecker2.isValid('11211')).toBe(true);
        expect(IDChecker2.isValid('111111')).toBe(false);
        expect(IDChecker2.isValid('123123')).toBe(false);
        expect(IDChecker2.isValid('121212')).toBe(false);
        expect(IDChecker2.isValid('12341234')).toBe(false);
        expect(IDChecker2.isValid('123123123')).toBe(false);
        expect(IDChecker2.isValid('1212121212')).toBe(false);
        expect(IDChecker2.isValid('1111111')).toBe(false);
        expect(IDChecker2.isValid('111121111')).toBe(true);
      });
      it('should find the invalid ID in the range', () => {
        expect(IDChecker2.checkRange('11-22')).toEqual(['11', '22']);
        expect(IDChecker2.checkRange('95-115')).toEqual(['99', '111']);
        expect(IDChecker2.checkRange('998-1012')).toEqual(['999', '1010']);
        expect(IDChecker2.checkRange('1188511880-1188511890')).toEqual(['1188511885']);
        expect(IDChecker2.checkRange('222220-222224')).toEqual(['222222']);
        expect(IDChecker2.checkRange('1698522-1698528')).toEqual([]);
        expect(IDChecker2.checkRange('446443-446449')).toEqual(['446446']);
        expect(IDChecker2.checkRange('38593856-38593862')).toEqual(['38593859']);
        expect(IDChecker2.checkRange('565653-565659')).toEqual(['565656']);
        expect(IDChecker2.checkRange('824824821-824824827')).toEqual(['824824824']);
        expect(IDChecker2.checkRange('2121212118-2121212124')).toEqual(['2121212121']);
      });
      it('should adds the invalid IDs to the total', () => {
        let ranges = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124'
        expect(IDChecker2.checkRanges(ranges)).toEqual(4174379265);
        expect(IDChecker2.checkRanges(input)).toEqual(73694270688);
      });
    });

  });
});