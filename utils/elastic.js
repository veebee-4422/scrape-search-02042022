const elasticClient = require("../config/elasticConfig");

function elasticIndex(imdb){
    return new Promise(async(resolve, reject)=>{
        const result = await elasticClient.search({
            index: 'index_v4',
            "query": {
                "bool": {
                    "must": [{
                        "match": { "title": imdb[0].title }
                        },
                        {
                        "match": { "release": imdb[0].release }
                        }
                ]}
            }
        })
        if(!result.hits.hits[0]){
            await elasticClient.index({
                index: 'index_v4',
                document: imdb[0]
            })
            .catch((err)=>{
                return reject(new Error('Indexing failed'));
            });
        }
        return resolve();
    });
};

function elasticSearch(key){
    return new Promise(async(resolve, reject)=>{
        const result = await elasticClient.search({
            "index": "index_v4",
            "query": {
                "query_string" : {
                  "query": `*${key}*`, 
                  "fields": [ "title^5", "summary", "rating", "release^5" ],
                  "fuzziness": "AUTO"
                }
              }
        })
        .catch((err)=>{
            return reject(err);
        });
        if(!result) return reject(new Error('No result'));
        return resolve(result.hits.hits);
    });
};

module.exports = {elasticIndex, elasticSearch};