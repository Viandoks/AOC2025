export class OutOfRangeError extends Error { }
export class InvalidInstructionError extends Error { }

export interface Dial {
  getRange(): number;
  setPosition(position: number): void;
  getMin(): number;
  getMax(): number;
  getCurrentPosition(): number;
  registerInput(input: string): void;
  reset(): void;
}

export class CircularDial implements Dial {
  private code: number;
  private pad: Array<number>;
  protected currentPosition: number;
  private initPosition: number;
  constructor (min: number, max: number, initPosition: number = min) {
    this.pad = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    this.initPosition = initPosition;
    this.currentPosition = this.initPosition;
    this.code = 0;
  }

  getRange (): number {
    return this.pad.length;
  }

  setPosition (position: number): void {
    if (position < this.getMin() || position > this.getMax()) {
      throw new OutOfRangeError();
    }
    this.currentPosition = position;
  }

  turn (instructions: string): void {
    if (!instructions.match(/[RL]\d+/)) {
      throw new InvalidInstructionError();
    }
    const direction = instructions.match(/[RL]/)?.[0];
    const steps = Number(instructions.match(/\d+/)?.[0]);
    for (let i = 0; i < steps; i++) {
      if (direction === 'R') {
        this.currentPosition = (this.currentPosition + 1) % this.getRange();
      } else {
        this.currentPosition = (this.currentPosition - 1 + this.getRange()) % this.getRange();
      }
    }
    if(this.currentPosition === 0) {
      this.registerInput();
    }
  }

  getMin (): number {
    return this.pad[0];
  }

  getMax (): number {
    return this.pad[this.pad.length - 1];
  }

  getCurrentPosition (): number {
    return this.currentPosition;
  }

  registerInput (): void {
    this.code += 1;
  }

  getCode (): number {
    return this.code;
  }

  reset (): void {
    this.currentPosition = this.initPosition;
    this.code = 0;
  }

  getInitPosition (): number {
    return this.initPosition;
  }
}
  
export class CircularDial2 extends CircularDial {
  
  turn (instructions: string): void {
    if (!instructions.match(/[RL]\d+/)) {
      throw new InvalidInstructionError();
    }
    const direction = instructions.match(/[RL]/)?.[0];
    const steps = Number(instructions.match(/\d+/)?.[0]);
    for (let i = 0; i < steps; i++) {
      if (direction === 'R') {
        this.currentPosition = (this.currentPosition + 1) % this.getRange();
      } else {
        this.currentPosition = (this.currentPosition - 1 + this.getRange()) % this.getRange();
      }
      if(this.currentPosition === 0) {
        this.registerInput();
      }
    }
  }
}