const MS_IN_A_SECOND = 1000
const MS_IN_A_MIN = 60 * 1000
const MS_IN_A_HOUR = 60 * 60 * 1000
const MS_IN_A_DAY = 24 * 60 * 60 * 1000

const regulateTimestampByDay = timestamp => MS_IN_A_DAY * Math.floor(timestamp / MS_IN_A_DAY)    

const regulateTimestampByHour = timestamp => MS_IN_A_HOUR * Math.floor(timestamp / MS_IN_A_HOUR)

const regulateTimestampByMinute = timestamp => MS_IN_A_MIN * Math.floor(timestamp / MS_IN_A_MIN)

export { regulateTimestampByDay, regulateTimestampByHour, regulateTimestampByMinute }