const db = require("../configs/db");

async function getUsersAll() {
  const result = await db("users")
    .select("*")
  return result;
}
async function getUsers() {
  const result = await db("users")
    .select("username", "score", "photo")
    .orderBy("score", "desc");
  return result;
}

async function getUserById(id) {
  const result = await db("users")
    .select("users.*", "saves.*")
    .leftJoin("saves", "users.user_id", "saves.user_id")
    .where("users.user_id", id);

  return result.length > 0 ? result[0] : null;
}

async function getUserByEmail(email) {
  const result = await db("users")
    .select("user_id", "email", "password")
    .where("email", email);
  return result[0];
}

async function createUser(username, password, email) {
  const result = await db("users")
    .insert({ username, password, email })
    .returning("username");
  return result;
}

async function updateScore(userId, score) {
  await db("users").update({ score }).where("user_id", userId);
}

async function updateProfile(userId, last_name, first_name, photo, age) {
  await db("users").update({last_name, first_name, photo, age}).where("user_id", userId);
}
module.exports = {
  getUserById,
  getUsers,
  createUser,
  getUserByEmail,
  updateScore,
  updateProfile,
  getUsersAll
};
