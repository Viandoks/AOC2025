import { ProblemResolver } from './06';
import { readInput } from '../utils';

describe('Day 6: Santa\'s Workshop', () => {
  const input = readInput('06/input.txt');
  describe('Given a problem resolver', () => {
    let problemResolver: ProblemResolver;
    beforeEach(() => {
      problemResolver = new ProblemResolver();
    });
    describe('When the problems are set', () => {
      beforeEach(() => {
        problemResolver.setProblems('123 328  51 64 \n 45 64  387 23 \n  6 98  215 314\n*   +   *   +  ');
      });
      it('should be able to get the problems as string', () => {
        expect(problemResolver.getProblemsAsString()).toEqual([
          '123*45*6',
          '328+64+98',
          '51*387*215',
          '64+23+314',
        ]);
      });
      it('should be able to resolve a problem', () => {
        expect(problemResolver.resolveProblem('123*45*6')).toEqual(33210);
        expect(problemResolver.resolveProblem('328+64+98')).toEqual(490);
        expect(problemResolver.resolveProblem('51*387*215')).toEqual(4243455);
        expect(problemResolver.resolveProblem('64+23+314')).toEqual(401);
      });
      it('should be able to resolve all the problems', () => {
        expect(problemResolver.resolveProblems()).toEqual(4277556);
        problemResolver.setProblems('');
        expect(problemResolver.resolveProblems()).toEqual(0);
        problemResolver.setProblems(input);
        expect(problemResolver.resolveProblems()).toEqual(3968933219902);
      });
      describe("Cephalopod Notation", () => {
        it('translate to human readable notation', () => {
          expect(problemResolver.resolveProblemsWithCephalopodNotation()).toEqual(3263827);
          problemResolver.setProblems('');
          expect(problemResolver.resolveProblemsWithCephalopodNotation()).toEqual(0);
          problemResolver.setProblems(input);
          expect(problemResolver.resolveProblemsWithCephalopodNotation()).toEqual(6019576291014);
        })
      });
    });
  });
});