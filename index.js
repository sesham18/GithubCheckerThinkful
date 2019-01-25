
'use strict';

const searchURL = 'https://api.github.com/users/';



function displayResults(responseJson) {
  
  var arr = responseJson;
  let lenTotal = responseJson.length;
  console.log(arr);
  //var val = Object.values(responseJson).filter(function(key){ return responseJson[key]===responseJson.name});
  var val = arr[3].name;
  console.log(val);
  for (let i = 0; i < lenTotal; i++){
    $('#results-list').append(
      `<li><h3><a href="${arr[i].name_url}">URL for Repo</a></h3>
      <p>${arr[i].name}</p>
      </li>`
    )
  };
  $('#results').removeClass('hidden');
};

function getNews(query) {
  const url = searchURL + query + '/repos';
  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      };
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
    const searchTerm = $('#js-search-term').val();
    getNews(searchTerm);
  });
}

$(watchForm);

function reProcess(){
  $('#results-list').hide();
};
