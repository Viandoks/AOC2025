export class TachyonManifold {
  private diagram: string = '';
  private numberOfSplits: number = 0;
  private timelines: number = 0

  setDiagram(diagram: string): void {
    this.diagram = diagram;
    this.numberOfSplits = 0;
    this.timelines = 0;
  }

  getDiagram(): string {
    return this.diagram;
  }

  runSimulationLine(currentLine: string, nextLine: string): string {
    const outputLineArray = [...currentLine];
    const nextLineArray = [...nextLine];
    const outputLine = outputLineArray.reduce((acc, char, index) => {
      const nextChar = nextLineArray[index];
      if(char === '|' || char === 'S') {
        if(nextChar === '^') {
          this.numberOfSplits++;
          outputLineArray[index-1] = outputLineArray[index-1] === '^' ? '^' : '|';
          outputLineArray[index+1] = outputLineArray[index+1] === '^' ? '^' : '|';
          acc[index] = '^';
        } else {
          acc[index] = '|';
        }
      } else {
        acc[index] = nextChar;
      }
      return acc;
    }, outputLineArray).join('');
    return outputLine;
  }

  runSimulation(): string {
    const lines = this.diagram.split('\n');
    let currentLine = lines[0];
    let quantiumResultArray: number[] = lines[0].split('').map(char => char === 'S' ? 1 : 0);
    for(let i = 1; i < lines.length; i++) {
      currentLine = this.runSimulationLine(currentLine, lines[i]);

      quantiumResultArray = this.convertToQuantiumLine(quantiumResultArray, currentLine);
    }
    this.timelines = quantiumResultArray.reduce((acc, curr) => acc + curr, 0);
    return currentLine;
  }

  getNumberOfSplits(): number {
    return this.numberOfSplits;
  }

  convertToQuantiumLine(inputLine: number[], outputLine: string): number[] {
    const outputLineArray = [...outputLine];
    const result = [...inputLine];
    for(let i = 0; i < outputLineArray.length; i++) {
      if(outputLineArray[i] === '^') {
        result[i-1] += result[i];
        result[i+1] += result[i];
        result[i] = 0;
      }
    }
    return result
  }

  getTimelines(): number {
    return this.timelines;
  }
}