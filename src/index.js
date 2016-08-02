import { getCountByTimestampReducer } from './reduce-strategy-factory'
import { regulateTimestampByMinute } from './time-regulator-factory'
import { generateLineChartByTime } from './chart-generator-factory'

const pvByMinutes = (el, opt) => {
    fetch(opt.url)
        .then(res => res.json())
        .then(json => {
            const pvCountsReducer = getCountByTimestampReducer(regulateTimestampByMinute)
            const data = json.reduce(pvCountsReducer, {})
            const options = Object.assign({}, {
                width: 800,
                height: 500,
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
                duration: 1500
            }, opt)
            generateLineChartByTime(el, data, options)
        })
}

window.LeTVCharts = {
    pvByMinutes
}