const nanoid = require("nanoid").nanoid;
const auth = require("../auth");

const TABLA = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;

  //SI NO EXISTE LA STORE
  if (!store) {
    store = require("../../../store/dummy");
  }

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
    };

    console.log("Acá", body);

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.password && body.username) {
      console.log("Acá ratón");
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }
    return store.upsert(TABLA, user);
  }

  function follow(from, to, follow) {
    return store.upsert(
      TABLA + "_follow",
      {
        user_from: from,
        user_to: to,
      },
      true
    );
  }

  async function following(id) {
    let join = {};
    join[TABLA] = "user_to";
    const query = { user_from: id };

    return await store.query(TABLA + "_follow", query, join);
  }

  return {
    list,
    get,
    upsert,
    follow,
    following,
  };
};
