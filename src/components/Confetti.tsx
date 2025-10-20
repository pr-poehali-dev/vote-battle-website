import { useEffect, useState } from 'react'

interface ConfettiPiece {
  id: number
  left: number
  animationDelay: number
  color: string
}

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const colors = ['#dc2626', '#ef4444', '#f87171', '#2563eb', '#3b82f6', '#60a5fa', '#fbbf24', '#f59e0b']
    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
    setPieces(newPieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 opacity-70 animate-float"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            backgroundColor: piece.color,
            animationDelay: `${piece.animationDelay}s`,
            animationDuration: `${5 + Math.random() * 3}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}
    </div>
  )
}
