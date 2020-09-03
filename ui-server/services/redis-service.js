const redis = require("redis");
const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});
const { promisify } = require("util");
client.on("error", function(error) {
    console.error(error);
});

const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);
const del = promisify(client.del).bind(client);
const setJson = async (key, json) => {
    return await set(key, JSON.stringify(json));
}
const getJson = async(key) => {
    let data = await get(key);
    return JSON.parse(data);
}
module.exports = {
    set:set,
    get:get,
    del:del,
    setJson: setJson,
    getJson: getJson,
    client:client
}