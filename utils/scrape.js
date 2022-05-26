const request = require('request-promise-native');
const cheerio = require('cheerio');

function scrape(url){
    return new Promise(async(resolve, reject)=>{
        const imdb = [];
        if(!url){
            // throw new Error('No URL');
            return reject(new Error('No URL'));
        }
        request({
            uri: url,
            headers:{
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
            },
            gzip: true
        })
        .then((response)=>{
            let $ = cheerio.load(response);
            let title = $('div[class="sc-94726ce4-0 cMYixt"]>div>h1').text();
            let rating = $('div[class="sc-f6306ea-0 cNGXvE rating-bar__base-button"]>a').text().split('/')[0];
            // let summary = $('div[class="sc-16ede01-9 bbiYSi sc-910a7330-11 GYbFb"]>div[class="sc-16ede01-7 hrgVKw"]>span[class="sc-16ede01-0 fMPjMP"]').text();
            let release = $('div[class="sc-94726ce4-3 eSKKHi"]').text().substring(0,4);
            
            imdb.push({
                title, rating, release
            });
            if(!imdb[0].title){
                // throw new Error('No movie found')
                return reject(new Error('No movie found'));
            }
            return resolve(imdb);
        })
        .catch((err)=>{
            return reject(new Error('Invalid URL'));
        });
    });
};

module.exports = scrape;