fetch("https://api.avalai.ir/user/credit", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer aa-Exsz4qyYtGHpePcYrXdWdbFLqNqW29qMmJkiLizTq42k1buv",
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));