const elasticsearch = require('@elastic/elasticsearch'); 
require('dotenv').config();

const elasticClient = new elasticsearch.Client({
    cloud: {
        id: process.env.CLOUDID2
    },
    auth: {
        username: process.env.UNAME,
        password: process.env.PASSWORD2
    }
});

elasticClient.info()
// .then(response => console.log(response))
.catch(error => console.log(error))

module.exports = elasticClient;