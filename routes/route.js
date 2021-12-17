const express = require('express');
const articleRouter = express.Router();
const Articles = require('../models/schema');
const multer = require('multer');

//Image referral with multer
const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, '../frontend/public/images/' );
    },
    filename: (req, res, callback) => {
        callback(null, res.originalname);
    }
});

const upload = multer({storage: storage})


//All articles
articleRouter.get('/', (req, res) => {
    Articles.find()
    .sort({name: -1})
    .then(article => res.json(article))
    .catch(error => res.status(400).json(`Cannot get via the router! Error ${error}`))
})

//Add new article
    /*upload.single('') has to be the same as the
    <input filename =''> in the component we get the data from*/
articleRouter.post('/add', upload.single('itemImage'), (req, res) => {
    const newArticle = new Articles({
        title: req.body.title,
        textBody: req.body.textBody,
        itemImage: req.file.originalname,
        purchaseLink: 'empty',
    })

    newArticle
        .save()
        .then(() => res.json(`Article added`))
        .catch(error => res.status(400).json(`Upload error: ${error}`));
})

//Find Article by id
articleRouter.get('/:id', (req, res) => {
    Articles.findById(req.params.id)
    .then(article => res.json(article))
    .catch(error => res.status(400).json(`Can't find article, error ${error}`))
});

//Find Article by id and UPDATE
articleRouter.put('/:id', (req, res) => {
    Articles.findByIdAndUpdate(req.params.id)
    .then(article => {
        article.title = req.body.title,
        article.textBody = req.body.textBody,
        article.itemImage = req.body.itemImage,

        article.save()
        .then(() => res.json(`Article ${article.title} updated`))
        .catch(error => res.status(400).json(`Can't update this article, error ${error}`))
    })
    .catch(error => res.status(400).json(`Can't find this article, error ${error}`))
})

//Find article by id and delete
articleRouter.delete('/:id', (req, res) => {
    Articles.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Article destroyed`))
    .catch(error => res.status(400).json(`Can't erase this article, error ${error}`))
})

module.exports = articleRouter;
