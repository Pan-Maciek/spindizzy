export default {
    get(options, callback) {
        return new Promise((resolve, reject) => {
            const xmlHttp = new XMLHttpRequest()
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    if (callback) callback(xmlHttp.responseText)
                    resolve(xmlHttp.responseText)
                }
            }
            xmlHttp.open(options.method || "GET", options.url, true)
            xmlHttp.send(null)
        })
    },
    json(options, callback) {
        return new Promise((resolve, reject) => {
            const xmlHttp = new XMLHttpRequest()
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    const data = JSON.parse(xmlHttp.responseText)
                    if (callback) callback(data)
                    resolve(data)
                }
            }
            xmlHttp.open(options.method || "GET", options.url, true)
            xmlHttp.send(null)
        })
    }
}