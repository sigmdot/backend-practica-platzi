const mysql = require("mysql");
const config = require("../config");
const error = require("../network/errors");
const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);
  connection.connect((e) => {
    if (e) {
      console.error("[ERROR DB]", e);
      setTimeout(handleCon, 2000);
    }

    console.log("Base conectada con éxito");
  });

  connection.on("error", (e) => {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleCon();
    } else {
      throw error(e, null, null, next);
    }
  });
}

handleCon();

// FUNCIONES

function list(tabla) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function get(tabla, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla} WHERE id='${id}'`, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function query(tabla, q, join) {
  let joinQuery = '';
  if(join){
    console.log(join, 'Query join');
    const key = Object.keys(join)[0]; // Obtengo el nombre del array USER
    console.log('Ob', Object.keys(join)); 
    console.log(key,'Key query');
    const val = join[key]; // ACA OBTENGO EL USER_TO
    console.log(join[key],'k');
    console.log(val,'Val');
    joinQuery = `JOIN ${key} ON ${tabla}.${val} = ${key}.id`; // ACA HAGO EL QUERY PARA HACER UN JOIN A LA TABLA USER_FOLLOW
  }
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla} ${joinQuery} WHERE ${tabla}.?`, q, (e, result) => {
      if (e) return reject(e);
      resolve(result[0] || null);
    });
  });
}

function insert(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${tabla} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function update(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${tabla} SET ? WHERE id=?`,
      [data, data.id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

async function upsert(table, data) {
  let row = [];
  if (data.id) {
    console.log(table,data.id);
    row = await get(table,data.id);
    console.log(row);
  }
  if (row.length === 0) {
    return insert(table, data);
  }
  return update(table, data);
}

module.exports = {
  list,
  get,
  query,
  upsert,
};
