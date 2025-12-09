export class Playground {
  private _junctionBoxes: JunctionBox[] = [];
  private _circuits: JunctionBox[][] = [];

  public get junctionBoxes(): JunctionBox[] {
    return this._junctionBoxes;
  }

  setInput(input: string): void {
    const junctionBoxes = input.split('\n').map(line => line.split(',').map(Number));
    this._junctionBoxes = junctionBoxes.map(junctionBox => new JunctionBox(junctionBox[0], junctionBox[1], junctionBox[2]));
    this.conputeAllDistances();
    this._circuits = [];
  }

  conputeAllDistances(): void {
    this._junctionBoxes.forEach(junctionBox => {
      junctionBox.computeDistances(this._junctionBoxes);
    });
  }

  getJunctionBox(index: number): JunctionBox {
    return this._junctionBoxes[index];
  }

  getJunctionBoxById(id: string): JunctionBox {
    return this._junctionBoxes.find(j => j.id === id) as JunctionBox;
  }

  getNextTwoClosestJunctionBoxes(): [string, string] {
    let shortestRelation = Infinity;
    let shortestRelationJunctionBox: JunctionBox;
    const closestJunctionBoxes = this._junctionBoxes.reduce((closestJunctionBoxes: [JunctionBox | null, JunctionBox | null], junctionBox: JunctionBox) => {
      const closestJunctionBox = junctionBox.getClosestJunctionBox(this._junctionBoxes);
      if(closestJunctionBox.distance < shortestRelation && closestJunctionBox.junctionBox?.id !== junctionBox.id) {
        shortestRelation = closestJunctionBox.distance;
        shortestRelationJunctionBox = closestJunctionBox.junctionBox as JunctionBox;
        closestJunctionBoxes[0] = junctionBox;
        closestJunctionBoxes[1] = shortestRelationJunctionBox;
      }
      return closestJunctionBoxes;
    }, [null, null]);
    if(closestJunctionBoxes[0] && closestJunctionBoxes[1]) {
      this.addCircuit([closestJunctionBoxes[0], closestJunctionBoxes[1]]);
    }
    return [closestJunctionBoxes?.[0]?.id || '', closestJunctionBoxes[1]?.id || ''];
  }

  get circuits(): string[][] {
    return this._circuits.map(c => c.map(j => j.id));
  }

  addCircuit(circuit: JunctionBox[]): void {
    circuit[0].addConnection(circuit[1])
    circuit[1].addConnection(circuit[0])
    const existingCircuitIndexA = this._circuits.findIndex(c => c.includes(circuit[0]));
    const existingCircuitIndexB = this._circuits.findIndex(c => c.includes(circuit[1]));
    if(existingCircuitIndexA === existingCircuitIndexB && existingCircuitIndexA !== -1) {
      // do nothing
    } else if(existingCircuitIndexA !== -1 && existingCircuitIndexB !== -1) {
      const mergedCircuit = [...this._circuits[existingCircuitIndexA], ...this._circuits[existingCircuitIndexB]];
      this._circuits[existingCircuitIndexA] = mergedCircuit;
      this._circuits.splice(existingCircuitIndexB, 1);
    } else if(existingCircuitIndexA !== -1) {
      this._circuits[existingCircuitIndexA].push(circuit[1]);
    } else if(existingCircuitIndexB !== -1) {
      this._circuits[existingCircuitIndexB].push(circuit[0]);
    } else {
      this._circuits.push(circuit);
    }
  }

  makeNShortestConnections(n: number): void {
    for(let i = 0; i < n; i++) {
      this.getNextTwoClosestJunctionBoxes();
    }
  }

  getCircuitLengths(): number {
    const circuitValues = this._circuits.map(c => c.length).sort((a, b) => b - a);
    return circuitValues[0] * circuitValues[1] * circuitValues[2];
  }

  makeAllConnections(): number {
    let last = ['', ''];
    while( this._circuits.length > 1 || this._junctionBoxes.map(j => j.connections.length).some(c => !c)) {
      last = this.getNextTwoClosestJunctionBoxes();
    }
    const box1 = this.getJunctionBoxById(last[0]);
    const box2 = this.getJunctionBoxById(last[1]);
    return box1.x * box2.x;
  }
}

export class JunctionBox {
  private _id: string;
  private _x: number;
  private _y: number;
  private _z: number;
  private _connections: Set<string> = new Set();
  private _distances: Map<string, number> = new Map();

  constructor(x: number, y: number, z: number) {
    this._id = `${x.toString().padStart(3, '0')}${y.toString().padStart(3, '0')}${z.toString().padStart(3, '0')}`;
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get id(): string {
    return this._id;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get z(): number {
    return this._z;
  }

  get connections(): string[] {
    return Array.from(this._connections);
  }

  get distances(): [string, number][] {
    return Array.from(this._distances.entries());
  }

  computeDistances(junctionBoxes: JunctionBox[]): void {
    let distances: [string, number][] = [];
    junctionBoxes.forEach(junctionBox => {
      distances.push([junctionBox.id, this.getEuclideanDistanceToTargetJunctionBox(junctionBox)]);
    });
    this._distances = new Map(distances.sort((a, b) => a[1] - b[1]));
  }

  getEuclideanDistanceToTargetJunctionBox(targetJunctionBox: JunctionBox): number {
    return Math.sqrt(Math.pow(this._x - targetJunctionBox.x, 2) + Math.pow(this._y - targetJunctionBox.y, 2) + Math.pow(this._z - targetJunctionBox.z, 2));
  }

  getClosestJunctionBox(junctionBoxes: JunctionBox[]): { distance: number, junctionBox: JunctionBox | null } {
    for(const distance of this.distances) {
      if(distance[0] === this.id || this._connections.has(distance[0])) continue;
      return { distance: distance[1], junctionBox: junctionBoxes.find(j => j.id === distance[0]) as JunctionBox };
    }
    return { distance: Infinity, junctionBox: null };
  }

  addConnection(junctionBox: JunctionBox): void {
    this._connections.add(junctionBox.id);
  }
}