function loadIssues(options) {
  const owner = options.owner;
  const repo = options.repo;
  const issue = options.issue;
  const render = options.render;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3.html+json'
  };

  const data = {
    error: null,
    comments: [],
  };

  function parseLinkHeader(link) {
    var entries = link.split(',');
    var links = {};

    for (var i in entries) {
      var entry = entries[i];
      var l = {};
      l.name = entry.match(/rel=\"([^\"]*)/)[1];
      l.url = entry.match(/<([^>]*)/)[1];
      l.page = parseInt(entry.match(/page=(\d+).*$/)[1], 10);
      links[l.name] = l;
    }

    return links;
  }

  function normalizeComment(item) {
    return {
      id: item.id,
      url: item.html_url,
      author: {
        login: item.user.login,
        avatarUrl: item.user.avatar_url,
        url: item.user.html_url
      },
      body: item.body_html,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    };
  }

  function getIssueComments(page) {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issue}/comments?page=${page || 1}`;
    return fetch(url, { headers: headers })
      .then((response, err) => {
        if (err || !response.ok) {
          if (err) {
            data.error = `${err}`;
          } else if (response.status === 401) {
            data.error = 'Unauthorized.';
          } else if (response.status === 403) {
            data.error = 'Rate limit exceeded.';
          } else {
            data.error = `HTTP error ${response.status}`;
          }
          return
        }

        const link = response.headers.get('Link');
        let nextPage = null;
        if (link) {
          linkData = parseLinkHeader(link);
          nextPage = linkData.page;
        }

        return response
          .json()
          .then((items) => {
            const newComments = items.map(normalizeComment);
            data.comments = data.comments.concat(newComments);

            if (nextPage) {
              return getIssueComments(nextPage);
            }
          })
          .catch((error) => {
            data.error = `${error}`;
          });
      });
  }

  getIssueComments().then(() => render(data));
}
