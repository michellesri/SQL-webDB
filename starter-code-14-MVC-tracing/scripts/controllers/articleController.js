(function(module) {
  var articlesController = {};

  Article.createTable(); //creates table in sql database

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path? It's in the middleware chain for /articles/:id. It gets
  //called before articlesController.index. Finds an article by
  //the params id and sets it to the context object as ctx.articles
  // This method loads by the id
  articlesController.loadById = function(ctx, next) {
    //function that calls findWhere. findwhere looks for the id and gets data back from sql server.
    // then passes the ctx.artcles with the data from sql back to articleview.index on line 7-- which then renders the data to the page

///////
    // var articleData = function(article) {
    //   ctx.articles = article;
    //   next();
    // };
///////

    Article.findWhere('id', ctx.params.id, function(article) {
      ctx.articles = article;
      next();
    });
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere(
      'author', ctx.params.authorName.replace('+', ' '), authorData
    );
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };

  module.articlesController = articlesController;
})(window);
