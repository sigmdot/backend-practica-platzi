const TABLA = "post";
const nanoid = require("nanoid").nanoid;

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
    console.log(id);
    return store.get(TABLA,id);
  }

  async function upsert(id,body) {
    const post={
      text: body.text,
      user:id
    }

    if(body.id){
      post.id = body.id;
    }
    else{
      post.id = nanoid();
    }

    return store.upsert(TABLA,post);
  }

  function getByUser(userId) {
    return store.query(TABLA,{user: userId});
  }


  return {
    list,
    get,
    upsert,
    getByUser,
  };
};
