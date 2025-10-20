import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Icon from '@/components/ui/icon'
import Confetti from '@/components/Confetti'

const VOTE_API = 'https://functions.poehali.dev/66c9146c-c3e9-4e2c-8ab6-3c3c224c8216'

interface VoteResults {
  red: number
  blue: number
  total: number
  redPercent: number
  bluePercent: number
}

export default function Results() {
  const [results, setResults] = useState<VoteResults>({
    red: 0,
    blue: 0,
    total: 0,
    redPercent: 0,
    bluePercent: 0
  })

  const fetchResults = async () => {
    try {
      const response = await fetch(VOTE_API)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Failed to fetch results:', error)
    }
  }

  useEffect(() => {
    fetchResults()
    const interval = setInterval(fetchResults, 2000)
    return () => clearInterval(interval)
  }, [])

  const leader = results.red > results.blue ? 'red' : results.blue > results.red ? 'blue' : 'tie'

  return (
    <div className="min-h-screen bg-gradient-to-br from-battle-red via-background to-battle-blue relative overflow-hidden font-body">
      <Confetti />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <Icon name="ArrowLeft" size={18} />
              Назад к голосованию
            </Button>
          </Link>
          <Link to="/rules">
            <Button variant="outline" className="gap-2">
              <Icon name="BookOpen" size={18} />
              Правила
            </Button>
          </Link>
        </nav>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-4 tracking-tight drop-shadow-2xl">
            РЕЗУЛЬТАТЫ БИТВЫ
          </h1>
          <p className="font-body text-xl text-foreground/90">
            Обновляются в реальном времени
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {leader !== 'tie' && (
            <Card className="bg-card/95 backdrop-blur-sm p-8 text-center border-yellow-500/50 animate-scale-up">
              <Icon name="Crown" size={64} className="mx-auto mb-4 text-yellow-500" />
              <h2 className="font-display text-3xl font-bold mb-2">
                {leader === 'red' ? (
                  <span className="text-battle-red">🔴 КРАСНАЯ КОМАНДА ЛИДИРУЕТ!</span>
                ) : (
                  <span className="text-battle-blue">🔵 СИНЯЯ КОМАНДА ЛИДИРУЕТ!</span>
                )}
              </h2>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <Card className={`bg-card/95 backdrop-blur-sm p-8 border-2 transition-all ${leader === 'red' ? 'border-yellow-500 scale-105' : 'border-battle-red/50'}`}>
              <div className="text-center">
                <div className="text-6xl mb-4">🔴</div>
                <h3 className="font-display text-3xl font-bold text-battle-red mb-6">
                  Красная команда
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-7xl font-display font-black text-battle-red mb-2">
                      {results.red}
                    </div>
                    <div className="text-muted-foreground">голосов</div>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-battle-red transition-all duration-500"
                      style={{ width: `${results.redPercent}%` }}
                    />
                  </div>
                  <div className="text-3xl font-bold text-battle-red">
                    {results.redPercent}%
                  </div>
                </div>
              </div>
            </Card>

            <Card className={`bg-card/95 backdrop-blur-sm p-8 border-2 transition-all ${leader === 'blue' ? 'border-yellow-500 scale-105' : 'border-battle-blue/50'}`}>
              <div className="text-center">
                <div className="text-6xl mb-4">🔵</div>
                <h3 className="font-display text-3xl font-bold text-battle-blue mb-6">
                  Синяя команда
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-7xl font-display font-black text-battle-blue mb-2">
                      {results.blue}
                    </div>
                    <div className="text-muted-foreground">голосов</div>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-battle-blue transition-all duration-500"
                      style={{ width: `${results.bluePercent}%` }}
                    />
                  </div>
                  <div className="text-3xl font-bold text-battle-blue">
                    {results.bluePercent}%
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="bg-card/95 backdrop-blur-sm p-8 text-center">
            <div className="flex items-center justify-center gap-4 text-2xl font-bold">
              <Icon name="Users" size={32} />
              <span>Всего проголосовало:</span>
              <span className="text-4xl font-display text-primary">{results.total}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
