import d3 from 'd3'

const generateLineChartByTime = (el, data, opt) => {

    // define sizing arguments
    const { width, height, top, right, bottom, left, duration } = opt
    const innerWidth = width - left - right
    const innerHeight = height - top - bottom

    // regulate and sort data
    const regulatedData = []
    for (const x in data) {
        regulatedData.push({
            date: new Date(+x),
            value: data[x]
        })
    }

    // sort by date accending
    const sortedData = regulatedData.sort((x, y) => x.date - y.date)

    // x and y
    const x = d3.time.scale().range([0, innerWidth])
    const y = d3.scale.linear().range([innerHeight, 0])
    const vMax = d3.max(sortedData, d => d.value)
    x.domain([sortedData[0].date, sortedData[sortedData.length - 1].date])    
    y.domain([0, vMax])
    const xAxis = d3.svg.axis().scale(x)
        .tickFormat(d3.time.format('%H :%M'))        
    const yAxis = d3.svg.axis().scale(y)
        .tickValues(d3.range(0, vMax + 1, Math.ceil(vMax / 5)))        
        .tickFormat(d3.format('d'))
        .orient('left')        

    // the line
    const line = d3.svg.line()
        .interpolate('monotone')
        .x(d => x(d.date))
        .y(d => y(d.value))

    // the area
    const area = d3.svg.area()
        .interpolate('monotone')
        .x(d => x(d.date))
        .y0(innerHeight)
        .y1(d => y(d.value))

    // paint group
    const g = d3.select(el).append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
            .attr('transform', 'translate(' + left + ', ' + top + ')')
    
    // paint x and y axis
    g.append('g')        
        .attr('transform', 'translate(0,' + innerHeight + ')')
        .call(xAxis)
        .style('fill', 'none')
        .style('stroke', '#000')        
        .style('shape-rendering', 'crispEdges')
    g.append('g')
        .call(yAxis)
        .style('fill', 'none')
        .style('stroke', '#000')        
        .style('shape-rendering', 'crispEdges')     
    
    // styling ticks
    g.selectAll('g.tick')
        .style('font-size', '11px')        
        .style('font-family', 'sans-serif')

    // paint line and area
    g.append('path')
        .datum(sortedData)        
        .attr('d', line)
        .style('fill', 'none')
        .style('stroke', 'rgba(50, 222, 134, 1)')
        .style('stroke-width', '1.5px')
    g.append('path')
        .datum(sortedData)                
        .attr('d', area)
        .style('fill', 'rgba(50, 222, 134, 0.2)')

    // curtain
    g.append('rect')
        .attr('x', -innerWidth)
        .attr('y', -innerHeight)
        .attr('width', innerWidth)
        .attr('height', innerHeight)        
        .attr('transform', 'rotate(180)')
        .style('fill', '#fff')
        .transition()
        .duration(duration)
        .ease('linear')
        .attr('width', 0)        
}

const generateBarChartByTime = (el, data, opt) => {

}

export { generateLineChartByTime }