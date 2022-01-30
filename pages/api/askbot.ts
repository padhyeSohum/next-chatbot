import type { NextApiRequest, NextApiResponse } from 'next';
import { getData } from "../../src/intents-repo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const results = await getData(req.body.question);
    console.log(req.body.question);
    
    if (results.length > 0) {
        res.status(200).json(results[0].reply);
    }
    else {
        res.status(200).json(null)
    }

    console.log(results)
}
