require('dotenv').config()
const twitterClient = require('./init')
const needle = require('needle')

const token = process.env.BEARER_TOKEN;

const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'

async function getRequest() {

    // Edit query parameters below
    // specify a search query, and any additional fields that are required
    // by default, only the Tweet ID and text fields are returned
    const params = {
        'query': '#zemmour2022 #EricZemmour #JeVotePourZemmour',
        'tweet.fields': "author_id,created_at,entities,geo,id",
        'max_results' : 10
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

(async () => {

    try {
        // Make request
        const response = await getRequest();
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
    
})();