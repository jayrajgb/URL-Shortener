const urlModel = require('../models/url');
const shortid = require('short-unique-id');

async function handleGetAllUrls(req, res){
    const data = await urlModel.find({});

    const html = `
    <ul>
        ${data.map((url)=>{
            return (`<li>${url.originalUrl} - ${url.shortenedUrl}</li>`)
        }).join("")}
    </ul>`

    return res.send(html);
}

async function handleGenerateUrl(req, res){
    const originalUrl = req.body.url;
    const uid = new shortid({length: 8});
    const shortenedUrl = uid.rnd();

    const newUrl = await urlModel.create({
        originalUrl: originalUrl,
        shortenedUrl: shortenedUrl,
        visited: []
    })

    return res.send(newUrl);    
}

async function handleGetUrl(req, res){
    const shortenedUrl = req.params.id;

    const getUrlInfo = await urlModel.findOneAndUpdate(
        {shortenedUrl: shortenedUrl},
        // update
        {
            $push: {
                visited: {timestamp: Date.now()}
            }
        }
    )

    return res.status(200).redirect(getUrlInfo.originalUrl);
}

async function handleGetAnalytics(req, res){
    const url = await urlModel.findOne({shortenedUrl: req.params.id});

    return res.send(`${url.originalUrl}: Visits = ${url.visited.length}`);
}

async function handleGetAllAnalytics(req, res){
    const data = await urlModel.find({});

    const html = `<ul>
        ${data.map((url)=>{
            return (`<li>${url.originalUrl}: Visits = ${url.visited.length}</li>`)
        }).join("")}
    </ul>`

    res.send(html);
}

module.exports = {
    handleGetAllUrls,
    handleGenerateUrl,
    handleGetUrl,
    handleGetAnalytics,
    handleGetAllAnalytics
}