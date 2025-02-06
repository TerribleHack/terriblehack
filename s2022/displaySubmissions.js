loadIssues({
  owner: 'terriblehack',
  repo: 'terriblehack',
  issue: 39,
  render: (data) => {
    const container = document.getElementById('projects');
    container.innerHTML = [];
    if (data.error) {
      container.innerHTML = data.error;
      return;
    }

    data.comments.forEach((comment) => {
      const submission = document.createElement('div');
      submission.classList.add('submission');

      const author = document.createElement('a');
      author.classList.add('author');
      author.setAttribute('href', comment.author.url);
      author.setAttribute('target', '_blank');
      author.setAttribute('title', `@${comment.author.login}`);
      author.setAttribute('style', `background-image: url('${comment.author.avatarUrl}')`);
      submission.appendChild(author);

      const content = document.createElement('div');
      content.classList.add('content')
      content.innerHTML = comment.body;
      submission.appendChild(content);

      [...submission.querySelectorAll('script')].forEach((node) => node.parentElement.removeChild(node));
      [...submission.querySelectorAll('a')].forEach((node) => node.setAttribute('target', '_blank'));

      container.appendChild(submission);
    });
  },
});
