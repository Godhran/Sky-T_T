
const CALL = async (url, method, params) => {
    const body = JSON.stringify(params);

    return new Promise(async (res, rej) => {
        const timeout = setTimeout(() => {
            rej({message: "Request timed out."})
        }, 30000)

        fetch(url, {
            method,
            body
        }).then(resp => {

            clearTimeout(timeout);

            if (!resp.ok) {
                throw resp
            }
            resp.json().then((responseData) => {
                res(responseData);
            })
        }).catch(err => {
            clearTimeout(timeout);
            err.json().then(errorMessage => {
                rej(errorMessage)
            })
        })
    })
}

const API = {
    get: (url, params) => {
        return CALL(url, 'GET', params);
    },
    post: (url, params) => {
        return CALL(url, 'POST', params);
    },
    patch: (url, params) => {
        return CALL(url, 'PATCH', params);
    },
    delete: (url, params) => {
        return CALL(url, 'DELETE', params);
    },
}

export {API};
