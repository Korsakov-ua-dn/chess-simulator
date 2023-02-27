

// class Game {
//   // public knightPosition: Position;
//   public knightPosition: Position = ['b', 7];
//   private observers: PositionObserver[] = []

//   // constructor() {
//   //   if (!!localStorage.getItem('knight')) {
//   //     this.knightPosition = JSON.parse(localStorage.getItem('knight')!)
//   //   } else {
//   //     this.knightPosition = ['b', 7]
//   //   }
//   // }

//   public observe(o: PositionObserver): () => void {
//     this.observers.push(o)
//     this.emitChange()

//     return (): void => {
//       this.observers = this.observers.filter((t) => t !== o)
//     }
//   }

//   public moveKnight(toX: Letter, toY: number): void {
//     this.knightPosition = [toX, toY]
//     // localStorage.setItem('knight', JSON.stringify([toX, toY]))
//     this.emitChange()
//   }

//   public canMoveKnight(toX: Letter, toY: number): boolean {
//     const [x, y] = this.knightPosition
    
//     const indexX = letter.findIndex((el) => el === x)
//     const indexToX = letter.findIndex((el) => el === toX)
//     const dx = indexToX - indexX
//     const dy = toY - y

//     return (
//       (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
//       (Math.abs(dx) === 1 && Math.abs(dy) === 2)
//     )
//   }

//   private emitChange() {
//     const pos = this.knightPosition
//     this.observers.forEach((o) => o && o(pos))
//   }
// }

// export default Game;

export type Position = [Letter, number]
export type PositionObserver = ((position: Position) => void) | null

export const letter = ['a','b','c','d','e','f','g','h'] as const;
type ValueOf<T> = T[keyof T];
export type Letter = ValueOf<typeof letter>;