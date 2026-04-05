import React, { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { format, addDays, isSameDay, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'

interface DateStripProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
  startDate?: Date
  endDate?: Date
}

export const DateStrip: React.FC<DateStripProps> = ({
  selectedDate,
  onDateChange,
  startDate = new Date(2026, 5, 11), // 11 Junio 2026
  endDate = new Date(2026, 6, 19),   // 19 Julio 2026
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Generar array de fechas
  const dates = React.useMemo(() => {
    const list: Date[] = []
    let current = startOfDay(startDate)
    const end = startOfDay(endDate)
    
    while (current <= end) {
      list.push(current)
      current = addDays(current, 1)
    }
    return list
  }, [startDate, endDate])

  // Scroll automático al seleccionar (centrar)
  useEffect(() => {
    const activeElement = scrollRef.current?.querySelector('[data-active="true"]')
    if (activeElement && scrollRef.current) {
      activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [selectedDate])

  return (
    <div className="relative w-full bg-card/50 backdrop-blur-sm border-y shadow-inner">
      <div 
        ref={scrollRef}
        className="flex items-center gap-1 overflow-x-auto no-scrollbar py-4 px-8 scroll-smooth"
      >
        {dates.map((date) => {
          const active = isSameDay(date, selectedDate)
          const dayName = format(date, 'eee', { locale: es })
          const dayNum = format(date, 'd')
          const monthName = format(date, 'MMM', { locale: es })

          return (
            <button
              key={date.toISOString()}
              onClick={() => onDateChange(date)}
              data-active={active}
              className={cn(
                "flex flex-col items-center justify-center min-w-[4.5rem] h-20 rounded-2xl transition-all duration-300",
                "border-2 hover:border-primary/30",
                active 
                  ? "bg-primary border-primary text-primary-foreground shadow-lg scale-110 z-10" 
                  : "bg-background/20 border-transparent text-muted-foreground"
              )}
            >
              <span className={cn(
                "text-[10px] uppercase font-black tracking-tight",
                active ? "text-primary-foreground/80" : "text-muted-foreground/60"
              )}>
                {dayName}
              </span>
              <span className="text-xl font-black leading-none my-1">
                {dayNum}
              </span>
              <span className={cn(
                "text-[10px] uppercase font-bold",
                active ? "text-primary-foreground/90" : "text-muted-foreground/50"
              )}>
                {monthName}
              </span>
            </button>
          )
        })}
      </div>
      
      {/* Gradients to indicate more scroll */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  )
}
