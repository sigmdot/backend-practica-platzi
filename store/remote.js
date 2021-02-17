const request = require('request');

function createRemoteDB(host,port) {
    const URL = 'http://'+host+':'+port;
    function list(tabla) {
        return req('GET',tabla);
    }

    function req(method, tabla, data) {
        let url = URL + '/' + tabla;
        body = '';

        return new Promise((resolve, reject)=>{
            request({
                method,
                headers:{
                    'content-type':'application/json'
                },
                url,
                body,
            },(err,request,body)=>{
                if(err){
                    console.error('ERROR CON LA BASE REMOTA',err);
                    return reject(err.message)
                }
                const resp = JSON.parse(body);
                return resolve(resp.body);
            })
        })
    }

    return{
        list
    }
}

module.exports = createRemoteDB;