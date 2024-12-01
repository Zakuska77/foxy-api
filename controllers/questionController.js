const db = require("../configs/db");



async function getQuestionByLanguage(language, level, type) {
  const query = db("question")
    .select("*")
    .leftJoin(
      "multiple_choice",
      "question.question_id",
      "multiple_choice.question_id"
    )
    .leftJoin(
      "multiple_choice_image",
      "question.question_id",
      "multiple_choice_image.question_id"
    )
    .where("question.language", language)

  if (level) {
    query.andWhere("question.level", level);
  }
  if (type) {
    query.andWhere("question.type", type);
  }
  // console.log(query.toString());
  //console.log(query);
  return query;
}

async function getQuestionTypes() {
  try {
    const result = await db.raw(`
            SELECT enumlabel
            FROM pg_enum
            WHERE enumtypid = 'type'::regtype
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

module.exports = {getQuestionTypes, getQuestionByLanguage };
