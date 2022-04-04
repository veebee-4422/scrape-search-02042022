const router = require('express').Router();
const scrape = require('../utils/scrape');
const elasticIndex = require('../utils/elastic').elasticIndex;
const elasticSearch= require('../utils/elastic').elasticSearch;

router.get('/', (req, res, next)=>{
    res.render('home');
})
router.get('/scrape', (req, res, next)=>{
    res.render('scrape');
})
router.get('/search', (req, res, next)=>{
    res.render('search');
})

router.post('/scrape', async (req, res, next)=>{
    // scrape imdb page url = req.body.scrapeurl
    scrape(req.body.scrapeurl)
    .then(async (imdb)=>{
        // now index movie if it isnt indexed
        await elasticIndex(imdb);
        res.render('scrape-results', {url: req.body.scrapeurl, movie: imdb })
    })
    .catch((error)=>{
        console.log(error);
        res.render('scrape-results', {url: req.body.scrapeurl, movie: [{title:''}] });
    });
})

router.post('/search', async(req, res, next)=>{
    // find entry in elastic search using req.body.keywords
    elasticSearch(req.body.keywords)
    .then((movies)=>{
        res.render('search-results', {key: req.body.keywords, movies: movies});
    })
    .catch((error)=>{
        console.log(error);
        res.render('search-results', {key: req.body.keywords, movies: [] });
    });
})


module.exports = router;