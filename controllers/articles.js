const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.body.user._id })
    .then((data) => { res.send({ data }); })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.body.user._id,
  }).then((data) => { res.send({ data }); }).catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId, (err, article) => {
    if (err || !article) return next(new NotFoundError(`id: ${req.params.articleId} не найден`));
    if (String(article.owner) !== String(req.body.user._id)) return next(new ForbiddenError());
    return Article.findByIdAndRemove(req.params.articleId)
      .then((data) => { res.send({ data }); })
      .catch(next);
  }).select('+owner').catch(next);
};
