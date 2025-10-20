import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Icon from '@/components/ui/icon'
import Confetti from '@/components/Confetti'

export default function Rules() {
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
          <Link to="/results">
            <Button variant="outline" className="gap-2">
              <Icon name="BarChart3" size={18} />
              Результаты
            </Button>
          </Link>
        </nav>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-4 tracking-tight drop-shadow-2xl">
            ПРАВИЛА БИТВЫ
          </h1>
          <p className="font-body text-xl text-foreground/90">
            Как принять участие в голосовании
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-card/95 backdrop-blur-sm p-8 animate-scale-up">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-2xl font-display font-bold">
                1
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold mb-3">Посмотрите видео команд</h3>
                <p className="text-foreground/80 leading-relaxed">
                  На главной странице представлены видео двух команд — красной и синей. 
                  Каждая команда демонстрирует свои навыки преображения и мастерство.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm p-8 animate-scale-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl font-display font-bold">
                2
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold mb-3">Отдайте свой голос</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Выберите команду, которая вам понравилась больше, и нажмите кнопку голосования. 
                  Вы можете проголосовать только один раз за всю битву.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm p-8 animate-scale-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-2xl font-display font-bold">
                3
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold mb-3">Следите за результатами</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Результаты голосования обновляются в реальном времени. Посмотрите, какая команда 
                  лидирует, и следите за ходом битвы на странице результатов.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm p-8 border-yellow-500/50 animate-scale-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-4">
              <Icon name="AlertCircle" size={48} className="text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-display text-2xl font-bold mb-3 text-yellow-500">Важно знать</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="mt-1 flex-shrink-0 text-green-500" />
                    <span>Каждый участник может проголосовать только один раз</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="mt-1 flex-shrink-0 text-green-500" />
                    <span>Результаты обновляются автоматически каждые несколько секунд</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="mt-1 flex-shrink-0 text-green-500" />
                    <span>Голосование честное и прозрачное — все голоса учитываются</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="mt-1 flex-shrink-0 text-green-500" />
                    <span>Победителем становится команда с наибольшим количеством голосов</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <div className="text-center pt-8">
            <Link to="/">
              <Button size="lg" className="font-bold text-lg gap-2 bg-gradient-to-r from-battle-red to-battle-blue hover:opacity-90">
                <Icon name="Rocket" size={24} />
                Начать голосование
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
