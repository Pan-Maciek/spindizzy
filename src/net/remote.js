const postData = object => {
    if (!object) return null
    let data = ''
    for (var key in object)
        data += `&${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
    return data.substring(1)
}

/** Request data from server.
 * 
 * @param {{url:String, data, method: String}} options
 * @returns {Promise}
 */
const req = (options) => {
    return new Promise((resolve, reject) => {
        const xmlHttp = new XMLHttpRequest()
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                resolve(xmlHttp.responseText)
        }
        xmlHttp.open(options.method || 'GET', options.url, true)
        xmlHttp.send(postData(options.data))
    })
}

export default {

    /** Get data using axaj.
     * 
     * @param {{url:String, data, method: String}} options
     * @returns {Promise}
     */
    get(options) { return req(options) },

    /** Get data  using axaj and parser it using JSON.parse().
     * 
     * @param {{url:String, data, method: String}} options
     * @returns {Promise}
     */
    json(options) { return req(options).then(data => JSON.parse(data)) }
}