import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const intents = await db
    .collection("intents")
    .find({})
    .sort({  })
    .limit(20)
    .toArray();

  res.json(intents);
};