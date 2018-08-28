var endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
    cities = [],
    searchInput = document.querySelector('.search'),
    suggestions = document.querySelector('.suggestions');

fetch(endpoint)
    .then(function (blob) {
        return blob.json();
    })
    .then(function (data) {
        return cities.push(...data);
    })
    .catch(function (error) {
        console.error(error);
    });

function findMatches(wordToMatch, cities) {
    return cities.filter(function (place) {
        var regexp = new RegExp(wordToMatch, 'gi');
        return place.city.match(regexp) || place.state.match(regexp);
    })
}

function displayMatches() {
    if(searchInput.value === ''){
        suggestions.style.display = 'none';
    }
    else{
        suggestions.style.display = 'block';
    }
    var matchArray = findMatches(this.value, cities);
    suggestions.innerHTML = matchArray.map(function (place) {
        return "<li>" + place.city + ", " + place.state+ "</li>";
    }).join(' ');
}

searchInput.addEventListener('keyup', displayMatches);