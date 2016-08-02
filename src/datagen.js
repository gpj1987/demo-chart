var i, json = []
var start = new Date('2016-7-24 00:00:00').getTime(),
    end = new Date('2016-7-24 23:59:59').getTime(),
    std = end - start,
    mean = (start + end) / 2 

function genNum() {
    var result = 0
    for (var i = 0; i < 12; i++) {
        result += Math.random()
    }
    return result / 12
}

for (i = 0; i < 20000; i ++ ) {        
    t = mean + Math.floor(genNum() * std / 1000)    
    json.push({
        timestamp: '' + t
    })
    
}

process.stdout.write(JSON.stringify(json))