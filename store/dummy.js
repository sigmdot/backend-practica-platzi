const db = {
    user:[
        {
            id:'123',
            name:'Steffany Celis',
            username: 'Fanenitra',
        }
    ],
    auth:[

    ]
};

async function list (tabla){
    return db[tabla];
}

async function get(tabla,id){
    let col =await list(tabla);
    return col.find(item => item.id === id) || 'No se encontro el usuario';
}

async function upsert(tabla,data){
    db[tabla].push(data);
    return data;
}

async function remove(tabla,id){
    return true;
}

async function query(tabla,q) {
    let col = await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];
    return col.find(item => item[key] === q[key]) || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}