export class ProblemResolver {
  private problems: string[][] = [[]];
  private cephalopodNotation: string[][] = [[]];
  private originalProblems: string = '';

  setProblems(problems: string): void {
    this.problems = [];
    const lines = problems.split('\n');
    lines.forEach((line) => {
      const values = line.split(/\s+/).filter(Boolean);
      values.forEach((value, index) => {
        if(!this.problems[index]) {
          this.problems[index] = [];
        }
        this.problems[index].push(value);
      });
    });
    this.originalProblems = problems;
  }

  getProblemsAsString(): string[] {
    const problems = [...this.problems]
    return problems.map((problem, index) => {
      const operator = problem.pop()
      return problem.join(operator);
    });
  }

  resolveProblem(problem: string): number {
    return eval(problem);
  }

  resolveProblems(): number {
    return this.getProblemsAsString().reduce((acc, curr) => {
      return acc + this.resolveProblem(curr);
    }, 0);
  }
    
  resolveProblemsWithCephalopodNotation(): number {
    if(!this.originalProblems) {
      return 0;
    }
    const lines = this.originalProblems.split('\n').map(line => line.split(''));
    const operators = lines.pop();
    const nbColumns = lines[0].length;
    const operations = []
    let operator = ''
    let numbers = []
    for(let i = 0; i < nbColumns; i++) {
      operator = operators?.[i]?.trim() || operator;
      const number = lines.map(line => line[i]).join('').trim();
      if(Number(number)) {
        numbers.push(number);
      } else {
        operations.push(numbers.join(operator));
        numbers = []
      }
    }
    operations.push(numbers.join(operator));

    return operations.map(operation => eval(operation)).reduce((acc, curr) => acc + curr, 0);
  }
}