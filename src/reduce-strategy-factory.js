const getCountByTimestampReducer = (timestampRegulator) => {
    return (memo, x) => {        
        const regulatedTime = timestampRegulator.call(null, +x.timestamp * 1000)        
        if (typeof memo[regulatedTime] === 'undefined') {
            memo[regulatedTime] = 1
        } else {
            memo[regulatedTime]++
        }
        return memo
    }
}

export { getCountByTimestampReducer }