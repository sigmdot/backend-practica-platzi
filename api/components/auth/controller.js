const bcrypt = require("bcrypt");
const auth = require("../../../auth");
const error = require("../../../utils/error");
const TABLA = "auth";

module.exports = function (injectedStore) {
  let store = injectedStore;

  //SI NO EXISTE LA STORE
  if (!store) {
    store = require("../../../store/dummy");
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLA, authData);
  }

  async function login(username, pass) {
    const data = await store.query(TABLA, { username: username });
    return bcrypt.compare(pass, data.password).then((sonIguales) => {
      if (sonIguales) {
        return auth.sign(data);
      } else {
        throw error("Información inválida", 401);
      }
    });
  }

  return {
    upsert,
    login,
  };
};
