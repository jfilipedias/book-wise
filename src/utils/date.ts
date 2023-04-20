import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDateToString(date: Date) {
  return format(date, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })
}

export function formatDateDistanceToNow(date: Date) {
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: ptBR,
  })
}
