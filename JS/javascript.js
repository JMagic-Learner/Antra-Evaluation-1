let postResult = []; // host all posts

// STEP 1 = Ping Fetch
let content_body_main = document.getElementById("content-body");
let results_body = document.getElementById("results-display")
let load_body = document.getElementById("load-display");
let artistSearch;
let artist;
let album;
let image;
let loadLimit = 4;

function renderHTML(jsonData) {
  content_body_main.innerHTML = "";
  generateList(postResult); // STEP 4: use json from fetch, into a function to generate html template
}



// STEP 5: Received JSON DATA, map jsonData array. 
function generateList(jsonData) {
  let arrayLevel1 = jsonData.results;
  let arrayTest=[];

  if (arrayLevel1.length===loadLimit) {
    load_body.innerHTML="";
    for (let i = 0; i <= loadLimit-1; i++) {
      arrayTest.push(arrayLevel1[i]);
    }
  } else if (arrayLevel1.length >= loadLimit ) {
   
    for (let i = 0; i <= loadLimit-1; i++) {
      arrayTest.push(arrayLevel1[i]);
    }
  createLoadButton();
  loadMoreResults();
  loadAllResults(arrayLevel1.length);
  } else {
    console.log("We have found no other results");
    load_body.innerHTML="";   // If there are no more results to load, do not display the load_body
    for (let i = 0; i < arrayLevel1.length; i++ ) {
      arrayTest.push(arrayLevel1[i]);
    }
    
    
  }
  console.log(arrayTest);
  console.log(jsonData)
  let numberResults = arrayLevel1.length
  results_body.innerHTML = `Results Found: ${arrayTest.length} / ${numberResults} for ${artistSearch}`;
  createResultsDisplay(arrayTest);
  
}

// READING COMMENTS/TEXT
let artistSearchInput = document.getElementById("textbox-search");
let submitButton = document.getElementById("submit");


// This function allows you to display the text box and title
function inputLogging() {
  artistSearchInput.addEventListener(
    'keypress',
    (e) => {
      console.log("Your comment box reads " + e.target.value);
      return e.target.value;
    }
  );

}

function loadMoreResults() {
  let loadButton = document.querySelector('.load-more-button');
  console.log("LoadMoreResults have been cliceked");
  loadButton.addEventListener('click', () => {
  loadLimit = loadLimit+4;
  renderHTML();
  })
}

function loadAllResults(length) {
  let AllButton = document.querySelector('.load-all-button');
  console.log("LoadAllResults have been clicked");
  AllButton.addEventListener('click', () => {
  loadLimit = length;
  renderHTML();
  })
}

function searchForArtist() {
  submitButton.addEventListener('click', () => {
    loadLimit=4;
    console.log("Button has been clicked");
    console.log(artistSearchInput.value);
    artistSearch = artistSearchInput.value
    let loading = document.createElement('div');
    results_body.appendChild(loading);
    loading.classList.add("loader")
    startAPISearch();
    
  })
}

function startAPISearch() {
  fetch(`https://itunes.apple.com/search?term=${artistSearch}&media=music&entity=album&attribute=artistTerm&limit=200`) // Fetch is a promise/ targets the HTTPS request
      .then(response => response.json())  // Response comes back in a object (response). // Response.json is a function
      .then((json) => {
        postResult = json; // STEP2: assign the raw json to postResult
        renderHTML(postResult); // STEP 3: Begin function chain to render HTML
      });
}

function createLoadButton() {
  let LoadMore = document.createElement('button')
  let LoadAll = document.createElement('button')
  let loadContainer = document.createElement('div')
  load_body.innerHTML="";
  LoadMore.innerHTML="Load More";
  LoadAll.innerHTML="Load All";
  load_body.appendChild(loadContainer);
  loadContainer.appendChild(LoadMore);
  loadContainer.appendChild(LoadAll);
  LoadMore.classList.add("load-more-button");
  LoadAll.classList.add("load-all-button");
  loadContainer.classList.add("load-more-container");
}

function createResultsDisplay(arrayResults) {
  arrayResults.forEach((item) => {
    // for (let i= 0;  i<= arrayLevel1.length; i++) {
    artist = item.collectionName
    album = item.artistName
    image = item.artworkUrl100
    // artist = arrayLevel1[i].collectionName
    // album = arrayLevel1[i].artistName
    // image = arrayLevel1[i].artworkUrl100
    let AlbumBody = document.createElement('div')
    let AlbumContainer = document.createElement('div');
    let AlbumContainer2 = document.createElement('div');
    let unordered = document.createElement('ul');
    AlbumBody.classList.add("album-body");
    AlbumContainer.classList.add("album-container");
    AlbumContainer2.classList.add("album-container2");
    let albumDisplay = document.createElement('li');
    let artistDisplay = document.createElement('li');
    let imageDisplay = document.createElement('img');
    artistDisplay.classList.add('container-child');
    albumDisplay.classList.add('container-child');
    imageDisplay.classList.add('container-child');
    albumDisplay.innerHTML = `Album Name: ${album}`;
    artistDisplay.innerHTML = `Artist Name: ${artist}`;
    imageDisplay.src = `${image}`;

    content_body_main.appendChild(AlbumBody);

    AlbumBody.appendChild(AlbumContainer);
    AlbumBody.appendChild(AlbumContainer2)
    AlbumContainer.appendChild(imageDisplay);
    AlbumContainer2.appendChild(unordered)
    unordered.appendChild(artistDisplay);
    unordered.appendChild(albumDisplay);
  }
  )
}

inputLogging();
searchForArtist();


