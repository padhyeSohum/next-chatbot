const { MongoClient } = require('mongodb');

const intentsRepo = () => {

    const url = process.env.MONGODB_URI;

    const loadData = (data) => {
        return new Promise (async (resolve, reject) => {
            try {
                const client = new MongoClient(url);
                await client.connect()
                const chatbotDB = client.db(process.env.MONGODB_DB);
                const results = await chatbotDB.collection("intents").insertMany(data);
                resolve(results);
                client.close();
            }

            catch (err) {
                reject(err);
            }
        })
    }

    const getData = (query) => {
        return new Promise (async (resolve, reject) => {
            try {
                const client = new MongoClient(url);
                await client.connect()
                const chatbotDB = client.db("NextJS%20Chatbot")
                const items = chatbotDB.collection("intents").find({intent: query})
                resolve(await items.toArray());
                client.close();
            }
    
            catch (err) {
                reject(err);
            }
        })
    }

    const addData = (item) => {
        return new Promise (async (resolve, reject) => {
            try {
                const client = new MongoClient(url);
                await client.connect()
                const chatbotDB = client.db("NextJS%20Chatbot")
                const results = await chatbotDB.collection("intents").insertOne(item);
                resolve(results);
                client.close();
            }
    
            catch (err) {
                reject(err);
            }
        })
    }

    return {
        loadData,
        getData,
        addData
    }
}

module.exports = intentsRepo();