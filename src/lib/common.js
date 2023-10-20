export async function fetchApi(url, data, method = "POST") {
    try {
        let param = JSON.parse(data)
        let queryString = method === "GET" ? Object.keys(param).map(key => key + '=' + param[key]).join('&') : '';
        let apiUrl =  url + (queryString ? '?' + queryString : '');
        let resData = await fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: method === "POST" ? JSON.parse(JSON.stringify(data)) : undefined
        })
        return { statusCode: resData.status, data: await resData.json() }
    } catch (e) {
        console.log("fetchApi===>", e)
        return { statusCode: 400, data: { message: 'Internal server error' } }
    }
}