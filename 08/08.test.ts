import { Playground, JunctionBox } from './08';
import { readInput } from '../utils';

const testInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`


describe('Day 8: Playground', () => {
  describe('Given a playground', () => {
    let playground: Playground;
    beforeEach(() => {
      playground = new Playground();
    });
    it('should be able to create a playground', () => {
      expect(playground).toBeInstanceOf(Playground);
    });
    describe('When the input is set', () => {
      beforeEach(() => {
        playground.setInput(testInput);
      });
      it('should be able to get the junction boxes', () => {
        const junctionBoxes = playground.junctionBoxes;
        expect(junctionBoxes.length).toEqual(20);
      });
      it('should be able to get a junction box', () => {
        const junctionBox = playground.getJunctionBox(0);
        expect(junctionBox).toBeInstanceOf(JunctionBox);
        expect(junctionBox.x).toEqual(162);
        expect(junctionBox.y).toEqual(817);
        expect(junctionBox.z).toEqual(812);
        expect(junctionBox.id).toEqual('162817812');
      });
      describe('getEuclideanDistance', () => {
        it('should be able to get the euclidean distance between two junction boxes', () => {
          const junctionBox1 = playground.getJunctionBoxById('162817812');
          const junctionBox2 = playground.getJunctionBoxById('425690689');
          expect(junctionBox1.getEuclideanDistanceToTargetJunctionBox(junctionBox2)).toEqual(316.90219311326956);
        });
        it('should get the smallest euclidean distance between a junction box and all other junction boxes', () => {
          const junctionBox = playground.getJunctionBoxById('162817812');
          const junctionBoxes = playground.junctionBoxes;
          expect(junctionBox.getClosestJunctionBox(junctionBoxes).distance).toEqual(316.90219311326956)
          expect(junctionBox.getClosestJunctionBox(junctionBoxes).junctionBox?.id).toEqual('425690689');
        });
        it('should get the shortest relation between all junction boxes', () => {
          expect(playground.getNextTwoClosestJunctionBoxes()).toEqual(expect.arrayContaining(['162817812', '425690689']));
          expect(playground.circuits).toEqual(expect.arrayContaining([['162817812', '425690689']]));
          expect(playground.getNextTwoClosestJunctionBoxes()).toEqual(expect.arrayContaining(['162817812', '431825988']));
          expect(playground.circuits).toEqual(expect.arrayContaining([['162817812', '425690689', '431825988']]));
          expect(playground.getNextTwoClosestJunctionBoxes()).toEqual(expect.arrayContaining(['906360560', '805096715']));
          expect(playground.circuits).toEqual(expect.arrayContaining([['162817812', '425690689', '431825988'], ['906360560', '805096715']]));
          expect(playground.getNextTwoClosestJunctionBoxes()).toEqual(expect.arrayContaining(['431825988', '425690689']));
          expect(playground.circuits).toEqual(expect.arrayContaining([['162817812', '425690689', '431825988'], ['906360560', '805096715']]));

        });
        describe('making the n shortest connections', () => {
          beforeEach(() => {
            playground.makeNShortestConnections(10)
          });
          it('should be able to make the n shortest connections', () => {
            expect(playground.getCircuitLengths()).toEqual(40);
          });
        });
        describe('making all connections', () => {
          it('should be able to make all connections', () => {
            expect(playground.makeAllConnections()).toEqual(25272);
          });
        });
      });
      describe('given a circuit exists', () => {
        let a: JunctionBox;
        let b: JunctionBox;
        let c: JunctionBox;
        let d: JunctionBox;
        let e: JunctionBox;
        let f: JunctionBox;
        let g: JunctionBox;
        let h: JunctionBox;
        beforeEach(() => {
          a = new JunctionBox(1, 1, 1);
          b = new JunctionBox(2, 2, 2);
          c = new JunctionBox(3, 3, 3);
          d = new JunctionBox(4, 4, 4);
          e = new JunctionBox(5, 5, 5);
          f = new JunctionBox(6, 6, 6);
          g = new JunctionBox(7, 7, 7);
          h = new JunctionBox(8, 8, 8);
          playground.addCircuit([a, b]);
        });
        it('should be able to get the circuit', () => {
          expect(playground.circuits).toEqual([[a.id, b.id]]);
        });
        it('should be able to add a circuit', () => {
          playground.addCircuit([c, d]);
          expect(playground.circuits).toEqual([[a.id, b.id], [c.id, d.id]]);
        });
        it('should be able to add a circuit to an existing circuit', () => {
          playground.addCircuit([b, c]);
          expect(playground.circuits).toEqual([[a.id, b.id, c.id]]);
        });
        describe('given another circuit exists', () => {
          beforeEach(() => {
            playground.addCircuit([c, d]);
          });
          it('should be able to merge two circuits', () => {
            playground.addCircuit([b, c]);
            expect(playground.circuits).toEqual([[a.id, b.id, c.id, d.id]]);
            playground.addCircuit([e, f]);
            expect(playground.circuits).toEqual([[a.id, b.id, c.id, d.id], [e.id, f.id]]);
            playground.addCircuit([g, h]);
            expect(playground.circuits).toEqual([[a.id, b.id, c.id, d.id], [e.id, f.id], [g.id, h.id]]);
            playground.addCircuit([c, h]);
            expect(playground.circuits).toEqual([[a.id, b.id, c.id, d.id, g.id, h.id], [e.id, f.id]]);
            playground.addCircuit([d, f]);
            expect(playground.circuits).toEqual([[a.id, b.id, c.id, d.id, g.id, h.id, e.id, f.id]]);
          });
        });
      });
    });
    describe('Run Day 8', () => {
      beforeEach(() => {
        playground.setInput(readInput('08/input.txt'));
      });
      it('should be able to solve part 1', () => {
        playground.makeNShortestConnections(1000)
        expect(playground.getCircuitLengths()).toEqual(115885);
      });
      it('should be able to solve part 2', () => {
        expect(playground.makeAllConnections()).toEqual(274150525);
      });
    });
  });
});