import { letter } from './utils/letter';

type Color = 'black' | 'white';
export type PieceType = 'knight' | 'rook' | 'bishop';
export type Letter = (typeof letter)[number];
export type IPiece = { type: PieceType; color: Color; id: string };
export type Positions = Record<string, IPiece>;
