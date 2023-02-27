import type { FC, ReactNode } from 'react'

export interface SquareProps {
  black: boolean
  children?: ReactNode
}

const squareStyle = {
  width: '100%',
  height: '100%',
}

export const Cell: FC<SquareProps> = ({ black, children }) => {
  const backgroundColor = black ? '#bbb699' : '#ffefd5'
  return (
    <div
      style={{
        ...squareStyle,
        backgroundColor,
      }}
    >
      {children}
    </div>
  )
}
