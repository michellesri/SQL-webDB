(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];

  reposObj.requestRepos = function(callback) {
    /* TODOne: How would you like to fetch your repos? Someone say AJAX?!
      Do not forget to call the callback! */
    $.ajax({
      url:'https://api.github.com/users/geoffreyemerson/repos',
      type:'GET',
      headers: {
        Authorization: 'token ' + github_token
      }
    })
    .done( function(data) {
      console.log('Github data:',data);
      reposObj.allRepos = data;
      callback();
    });
  };

  reposObj.withTheAttribute = function(key) {
    return reposObj.allRepos.filter(function(repo) {
      return repo[key];
    });
  };

  module.reposObj = reposObj;
})(window);
