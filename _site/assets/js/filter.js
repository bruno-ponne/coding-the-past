document.querySelectorAll('.tag-button').forEach(function(button) {
  button.addEventListener('click', function() {
      var tag = this.dataset.tag;
      document.querySelectorAll('.post').forEach(function(post) {
          var postTags = post.dataset.tags.split(',');
          if (tag === 'all' || postTags.includes(tag)) {
              post.style.display = 'block';
          } else {
              post.style.display = 'none';
          }
      });
  });
});