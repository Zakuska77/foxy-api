const db = require("../configs/db");

async function getFacts(language) {

    const result = await db("facts").select("*").where("language", language);
    return result;
  }
  // async function getFactbyID(id) {
  //   const result = await db("Facto").select("*").where("idFacto", id);;
  //   return result;
  // }

  async function getFactsAll() {

    const result = await db("facts").select("*")
    return result;
  }
  async function getFactbyID(id) {
   const result = await db("Facto").select("*").where("idFacto", id);;
  return result;
   }

module.exports = { getFacts , getFactsAll , getFactbyID };