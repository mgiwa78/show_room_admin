export function formatDateToWords(dateString: any) {
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const date: Date = new Date(dateString)
  const year: number = date.getUTCFullYear()
  const month: number = date.getUTCMonth()
  const day: number = date.getUTCDate()
  const hours: number = date.getUTCHours()
  const minutes: number = date.getUTCMinutes()
  const seconds: number = date.getUTCSeconds()

  const monthString: string = months[month]
  const formattedDate: string = `${monthString} ${day}, ${year}`
  const formattedTime: string = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return `${formattedDate} ${formattedTime}`
}
