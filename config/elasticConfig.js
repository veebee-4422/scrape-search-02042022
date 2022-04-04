const elasticsearch = require('@elastic/elasticsearch'); 
require('dotenv').config();

const elasticClient = new elasticsearch.Client({
    cloud: {
        id: process.env.CLOUDID
    },
    auth: {
        username: process.env.UNAME,
        password: process.env.PASSWORD
    }
});

elasticClient.info()
// .then(response => console.log(response))
.catch(error => console.log(error))

module.exports = elasticClient;