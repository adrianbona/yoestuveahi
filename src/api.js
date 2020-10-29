export class PostsAPI {
  fetchPosts = () => {
    return new Promise((resolve, reject) => {
      const url = 'https://jsonplaceholder.typicode.com/posts/';
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      fetch(url, options)
        .then(res => {
          return res.json();
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => console.log(error));
    });
  };
}
