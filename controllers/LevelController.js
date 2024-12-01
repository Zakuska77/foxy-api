const db = require("../configs/db");

async function getLevel() {
  try {
    const result = await db.raw(`
        SELECT enumlabel
        FROM pg_enum
        WHERE enumtypid = 'levels'::regtype
    `);

    data = result.rows;
    const array = [];
    data.forEach((element) => {
      array.push(element.enumlabel);
    });
    return array;
  } catch (error) {
    console.error("Error fetching enum values:", error);
    throw error;
  }
}

module.exports = { getLevel };
