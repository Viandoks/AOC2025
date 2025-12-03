import { describe, beforeEach, it, expect } from '@jest/globals';
import { CircularDial, OutOfRangeError, InvalidInstructionError, CircularDial2 } from './01';
import { attachment } from './attachments';

describe('Day 1: Secret Entrance', () => {
  describe('Given a dial from 0 to 99', () => {
    let dial: CircularDial;
    let initPosition: number = 50;
    beforeEach(() => {
      dial = new CircularDial(0, 99, initPosition);
    });
    it('should be a CircularDial', () => {
      expect(dial).toBeInstanceOf(CircularDial);
    });
    it('should have a range of 100 numbers', () => {
      expect(dial.getRange()).toBe(100);
    });
    it('should be set to the init position by default', () => {
      expect(dial.getCurrentPosition()).toBe(dial.getInitPosition());
    });
    it('should be able to set the position', () => {
      dial.setPosition(50);
      expect(dial.getCurrentPosition()).toBe(50);
    });
    describe('When the set position is out of range', () => {
      it('should throw an error', () => {
        dial.setPosition(50);
        expect(() => dial.setPosition(100)).toThrow(OutOfRangeError);
        expect(dial.getCurrentPosition()).toBe(50);
        expect(() => dial.setPosition(-1)).toThrow(OutOfRangeError);
        expect(dial.getCurrentPosition()).toBe(50);
      });
    });
    describe('When the dial is turned', () => {
      it('should throw an error if the instructions are invalid', () => {
        expect(() => dial.turn('R')).toThrow(InvalidInstructionError);
        expect(() => dial.turn('L')).toThrow(InvalidInstructionError);
        expect(() => dial.turn('1')).toThrow(InvalidInstructionError);
      });
      it('should be able to turn the dial to the right 8 times (R8) and then to the left 19 times (L19)', () => {
        dial.setPosition(11);
        dial.turn('R8');
        expect(dial.getCurrentPosition()).toBe(19);
        dial.turn('L19');
        expect(dial.getCurrentPosition()).toBe(0);
      });
      describe('Given the dial is circular', () => {
        it('should be able to turn the dial over max and min values', () => {
          dial.setPosition(dial.getMax());
          dial.turn('R1');
          expect(dial.getCurrentPosition()).toBe(dial.getMin());

          dial.setPosition(dial.getMin());
          dial.turn('L1');
          expect(dial.getCurrentPosition()).toBe(dial.getMax());

          dial.setPosition(5);
          dial.turn('L10');
          expect(dial.getCurrentPosition()).toBe(95);
          dial.turn('R5');
          expect(dial.getCurrentPosition()).toBe(0);
        });
      });
      describe('Registering inputs', () => {
        initPosition = 50;
        it('register input when the dial points to 0 after the instructions are executed', () => {
          dial.setPosition(50);
          dial.turn('R50');
          expect(dial.getCode()).toBe(1);

          const instructions = ['L68', 'L30', 'R48', 'L5', 'R60', 'L55', 'L1', 'L99', 'R14', 'L82']
          let code = runInstructions(dial, instructions);
          expect(code).toBe(3);

          code = runInstructions(dial, attachment);
          expect(code).toBe(1118);
        });
      });
    });
  });

  describe('Given a circular dial of type 2 from 0 to 99', () => {
    let dial: CircularDial2;
    let initPosition: number = 50;
    beforeEach(() => {
      dial = new CircularDial2(0, 99, initPosition);
    });
    describe('Registering inputs', () => {
      initPosition = 50;
      it('register input when the dial points to 0 at any moment during the instructions', () => {
        dial.setPosition(50);
        dial.turn('R1000');
        expect(dial.getCode()).toBe(10);

        const instructions = ['L68', 'L30', 'R48', 'L5', 'R60', 'L55', 'L1', 'L99', 'R14', 'L82']
        let code = runInstructions(dial, instructions);
        expect(code).toBe(6);

        code = runInstructions(dial, attachment);
        expect(code).toBe(6289);
      });
    });

  });
  function runInstructions (dial: CircularDial, instructions: string[]): number {
    dial.reset();
    for (const instruction of instructions) {
      dial.turn(instruction);
    }
    return dial.getCode();
  }
});