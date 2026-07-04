document.addEventListener('DOMContentLoaded', function() {
  var tagButtons = document.querySelectorAll('.tag-button');
  var searchInput = document.getElementById('search-input');
  var clearSearch = document.getElementById('clear-search');
  var posts = document.querySelectorAll('.post');
  var noPostsMessage = document.getElementById('no-posts-message');

  var currentTag = 'all';
  var currentSearch = '';

  function updateFilters() {
    var visibleCount = 0;
    var query = currentSearch.toLowerCase().trim();

    posts.forEach(function(post) {
      // Filter by tag
      var postTags = (post.dataset.tags || '').split(',');
      var matchesTag = (currentTag === 'all' || postTags.includes(currentTag));

      // Filter by search query (match in title, abstract, or tags)
      var textToSearch = '';
      var lessonNameEl = post.querySelector('.lesson-name');
      if (lessonNameEl) {
        textToSearch += lessonNameEl.textContent;
      }
      textToSearch += ' ' + (post.dataset.tags || '').replace(/,/g, ' ');
      
      var matchesSearch = true;
      if (query !== '') {
        matchesSearch = textToSearch.toLowerCase().includes(query);
      }

      if (matchesTag && matchesSearch) {
        post.style.display = 'block';
        visibleCount++;
      } else {
        post.style.display = 'none';
      }
    });

    // Toggle no posts found message
    if (noPostsMessage) {
      if (visibleCount === 0) {
        noPostsMessage.style.display = 'block';
      } else {
        noPostsMessage.style.display = 'none';
      }
    }
  }

  // Tag button click handlers
  tagButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Manage active visual state for buttons
      tagButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      this.classList.add('active');

      currentTag = this.dataset.tag;
      updateFilters();
    });
  });

  // Set default active tag button visual state
  var defaultActive = document.querySelector('.tag-button[data-tag="all"]');
  if (defaultActive) {
    defaultActive.classList.add('active');
  }

  // Search input handlers
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      currentSearch = this.value;
      
      // Toggle clear button visibility
      if (clearSearch) {
        if (currentSearch !== '') {
          clearSearch.style.display = 'block';
        } else {
          clearSearch.style.display = 'none';
        }
      }
      
      updateFilters();
    });
  }

  // Clear search handler
  if (clearSearch) {
    clearSearch.addEventListener('click', function() {
      if (searchInput) {
        searchInput.value = '';
        currentSearch = '';
        this.style.display = 'none';
        searchInput.focus();
        updateFilters();
      }
    });
  }
});