import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import Confetti from '@/components/Confetti'
import { toast } from 'sonner'

const VOTE_API = 'https://functions.poehali.dev/66c9146c-c3e9-4e2c-8ab6-3c3c224c8216'

interface VoteResults {
  red: number
  blue: number
  total: number
  redPercent: number
  bluePercent: number
}

const Index = () => {
  const [results, setResults] = useState<VoteResults>({
    red: 0,
    blue: 0,
    total: 0,
    redPercent: 0,
    bluePercent: 0
  })
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

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
    const interval = setInterval(fetchResults, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleVote = async (team: 'red' | 'blue') => {
    if (hasVoted) {
      toast.error('Вы уже проголосовали!')
      return
    }

    setIsVoting(true)
    try {
      const response = await fetch(VOTE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team })
      })
      
      if (response.ok) {
        const data = await response.json()
        setResults(data)
        setHasVoted(true)
        toast.success(team === 'red' ? '🔴 Голос за красную команду!' : '🔵 Голос за синюю команду!')
      }
    } catch (error) {
      toast.error('Ошибка голосования')
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-battle-red via-background to-battle-blue relative overflow-hidden font-body">
      <Confetti />
      
      <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/files/a169f676-3857-4b94-8a73-101fb1884edd.jpeg')] bg-cover bg-center opacity-10 z-0" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <nav className="flex justify-end gap-4 mb-8 animate-fade-in">
          <Link to="/results">
            <Button variant="outline" className="gap-2">
              <Icon name="BarChart3" size={18} />
              Результаты
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
          <h1 className="font-display font-black text-6xl md:text-8xl text-white mb-4 tracking-tight drop-shadow-2xl">
            ПЕРЕЗАГРУЗКА
          </h1>
          <div className="inline-block bg-gradient-to-r from-battle-red to-battle-blue p-1 rounded-2xl mb-6">
            <h2 className="font-display font-black text-5xl md:text-7xl text-white px-8 py-4 bg-background/90 rounded-xl">
              БИТВА
            </h2>
          </div>
          <p className="font-body text-xl md:text-2xl text-foreground/90 font-medium">
            Кто станет мастером преображения?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-6xl mx-auto">
          <Card className="bg-card/95 backdrop-blur-sm border-battle-red/50 overflow-hidden animate-scale-up hover:scale-105 transition-transform">
            <div className="aspect-video bg-black relative overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://disk.yandex.ru/i/jvzaF36uOEXAYQ"
                title="Красная команда"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold text-battle-red mb-4">Красная команда</h3>
              <Button 
                onClick={() => handleVote('red')}
                disabled={isVoting || hasVoted}
                className="w-full bg-battle-red hover:bg-battle-red/90 text-white font-bold text-lg py-6 animate-pulse-glow"
              >
                <Icon name="Heart" size={24} className="mr-2" />
                Голосовать за красных
              </Button>
            </div>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm border-battle-blue/50 overflow-hidden animate-scale-up hover:scale-105 transition-transform" style={{ animationDelay: '0.1s' }}>
            <div className="aspect-video bg-black relative overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://disk.yandex.ru/i/MduqiNnVit8s2Q"
                title="Синяя команда"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold text-battle-blue mb-4">Синяя команда</h3>
              <Button 
                onClick={() => handleVote('blue')}
                disabled={isVoting || hasVoted}
                className="w-full bg-battle-blue hover:bg-battle-blue/90 text-white font-bold text-lg py-6"
              >
                <Icon name="Heart" size={24} className="mr-2" />
                Голосовать за синих
              </Button>
            </div>
          </Card>
        </div>

        <Card className="max-w-4xl mx-auto bg-card/95 backdrop-blur-sm p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-between items-center mb-4">
            <div className="text-center flex-1">
              <div className="text-4xl font-display font-black text-battle-red">{results.red}</div>
              <div className="text-sm text-muted-foreground">голосов</div>
            </div>
            <div className="text-center flex-1">
              <Icon name="Trophy" size={48} className="mx-auto text-yellow-500" />
            </div>
            <div className="text-center flex-1">
              <div className="text-4xl font-display font-black text-battle-blue">{results.blue}</div>
              <div className="text-sm text-muted-foreground">голосов</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-battle-red font-bold">Красная команда</span>
                <span className="text-battle-red font-bold">{results.redPercent}%</span>
              </div>
              <Progress value={results.redPercent} className="h-3 bg-muted" style={{ '--progress-foreground': '#dc2626' } as any} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-battle-blue font-bold">Синяя команда</span>
                <span className="text-battle-blue font-bold">{results.bluePercent}%</span>
              </div>
              <Progress value={results.bluePercent} className="h-3 bg-muted" style={{ '--progress-foreground': '#2563eb' } as any} />
            </div>
          </div>

          <div className="text-center mt-6 text-muted-foreground">
            Всего голосов: {results.total}
          </div>
        </Card>

        <div className="text-center mt-8 text-muted-foreground text-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
          СЛЕДИ ЗА БИТВОЙ! 🔥
        </div>
      </div>
    </div>
  )
}

export default Index;