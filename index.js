'use strict';

// put your own value below!
const searchURL = 'https://api.github.com/users/';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(params[key])}`)
  return queryItems.join('/');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();

  for (let i = 0; i < responseJson.length; i++) {

    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
      <a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].html_url}</a>
      </li>`
    )
  }
  //display the results section  
  $('#results').removeClass('hidden');
};

function getUserHandle(query) {
  const params = {
    q: query,
    repos: "repos"
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('#js-search-term').val();
    getUserHandle(userName);
  });
}

$(watchForm);