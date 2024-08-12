function getRelativeTime(publishedTime) {
  const now = new Date()
  const published = new Date(publishedTime)

  // Time difference in milliseconds
  const timeDifference = now - published

  // Time constants
  const oneMinute = 60 * 1000
  const oneHour = 60 * oneMinute
  const oneDay = 24 * oneHour
  const oneWeek = 7 * oneDay

  // If within the same week
  if (timeDifference < oneWeek) {
    if (timeDifference < oneDay) {
      if (timeDifference < oneHour) {
        if (timeDifference < oneMinute) {
          return 'Just now'
        }
        const minutesAgo = Math.floor(timeDifference / oneMinute)
        return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`
      }
      const hoursAgo = Math.floor(timeDifference / oneHour)
      const minutesLeft = Math.floor((timeDifference % oneHour) / oneMinute)
      return `${hoursAgo} hour${
        hoursAgo > 1 ? 's' : ''
      } and ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''} ago`
    }
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    if (timeDifference < 2 * oneDay) {
      return `Yesterday at ${published.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`
    }
    return `${daysOfWeek[published.getDay()]} at ${published.toLocaleTimeString(
      [],
      { hour: '2-digit', minute: '2-digit' }
    )}`
  }

  // If more than a week
  const monthNames = [
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

  if (now.getFullYear() !== published.getFullYear())
    return `${published.getDate()} ${
      monthNames[published.getMonth()]
    } ${published.getFullYear()} at ${published.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`

  return `${published.getDate()} ${
    monthNames[published.getMonth()]
  } at ${published.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`
}

export default getRelativeTime
