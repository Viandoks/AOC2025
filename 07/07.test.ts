import { TachyonManifold } from './07';
import { readInput } from '../utils';

describe('Day 7: Laboratories', () => {
  const testInput = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

  describe('Given a tachyon manifold', () => {
    let tachyonManifold: TachyonManifold;
    beforeEach(() => {
      tachyonManifold = new TachyonManifold();
    });
    it('should be able to create a tachyon manifold', () => {
      expect(tachyonManifold).toBeInstanceOf(TachyonManifold);
    });
    it('should be able to set the diagram of the tachyon manifold', () => {
      tachyonManifold.setDiagram(testInput);
      expect(tachyonManifold.getDiagram()).toEqual(testInput);
    });
    it('should be able to run a simulation of one line from the diagram', () => {
      tachyonManifold.setDiagram(testInput);
      expect(tachyonManifold.runSimulationLine('.......S.......', '...............')).toEqual('.......|.......');
      expect(tachyonManifold.getNumberOfSplits()).toEqual(0);
      expect(tachyonManifold.runSimulationLine('.......|.......', '...............')).toEqual('.......|.......');
      expect(tachyonManifold.getNumberOfSplits()).toEqual(0);
      expect(tachyonManifold.runSimulationLine('.......||......', '...............')).toEqual('.......||......');
      expect(tachyonManifold.getNumberOfSplits()).toEqual(0);
      expect(tachyonManifold.runSimulationLine('.......|.......', '.......^.......')).toEqual('......|^|......');
      expect(tachyonManifold.getNumberOfSplits()).toEqual(1);
      expect(tachyonManifold.runSimulationLine('.......|.......', '.......^.......')).toEqual('......|^|......');
      expect(tachyonManifold.getNumberOfSplits()).toEqual(2);
      expect(tachyonManifold.runSimulationLine('.......|.......', '.......^^......')).toEqual('......|^^|.....');
      expect(tachyonManifold.getNumberOfSplits()).toEqual(4);
      expect(tachyonManifold.runSimulationLine('.......|.......', '.^...........^.')).toEqual('.^.....|.....^.');
      expect(tachyonManifold.getNumberOfSplits()).toEqual(4);
      expect(tachyonManifold.runSimulationLine('......|.|......', '......^.^......')).toEqual('.....|^|^|.....');
      expect(tachyonManifold.getNumberOfSplits()).toEqual(6);
      expect(tachyonManifold.runSimulationLine('......|^|......', '...............')).toEqual('......|.|......');
      expect(tachyonManifold.getNumberOfSplits()).toEqual(6);
    });
    it('should be able to check the timelines of a line', () => {
      tachyonManifold.setDiagram(testInput);
      expect(tachyonManifold.convertToQuantiumLine([0], '.')).toEqual([0]);
      expect(tachyonManifold.convertToQuantiumLine([0,1,0], '...')).toEqual([0,1,0]);
      expect(tachyonManifold.convertToQuantiumLine([0,1,0], '|^|')).toEqual([1,0,1]);
      expect(tachyonManifold.convertToQuantiumLine([0,3,0], '|^|')).toEqual([3,0,3]);
      expect(tachyonManifold.convertToQuantiumLine([2,0,2,0,2], '|^|^|')).toEqual([2,0,2,0,2]);
      expect(tachyonManifold.convertToQuantiumLine([0,0,2,0,2,0,0], '.|^|^|.')).toEqual([0,2,0,4,0,2,0]);
      expect(tachyonManifold.convertToQuantiumLine([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], '.......|.......')).toEqual([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]);
      expect(tachyonManifold.convertToQuantiumLine([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], '......|^|......')).toEqual([0,0,0,0,0,0,1,0,1,0,0,0,0,0,0]);
      expect(tachyonManifold.convertToQuantiumLine([0,0,0,0,0,0,1,0,1,0,0,0,0,0,0], '.....|^|^|.....')).toEqual([0,0,0,0,0,1,0,2,0,1,0,0,0,0,0]);
    });
    describe('When the diagram is set', () => {
      beforeEach(() => {
        tachyonManifold.setDiagram(testInput);
      });
      it('should be able to run the simulation of the entire diagram', () => {
        expect(tachyonManifold.runSimulation()).toEqual('|.|.|.|.|.|||.|');
        expect(tachyonManifold.getNumberOfSplits()).toEqual(21);
        expect(tachyonManifold.getTimelines()).toEqual(40);
        tachyonManifold.setDiagram('');
        expect(tachyonManifold.getNumberOfSplits()).toEqual(0);

        const input = readInput('07/input.txt');
        tachyonManifold.setDiagram(input);
        expect(tachyonManifold.getDiagram()).toEqual(input);
        tachyonManifold.runSimulation()
        expect(tachyonManifold.getNumberOfSplits()).toEqual(1524);
        expect(tachyonManifold.getTimelines()).toEqual(32982105837605);
      });
    });
  });
});