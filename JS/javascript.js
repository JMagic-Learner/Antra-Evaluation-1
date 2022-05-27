let postResult = []; // host all posts

// STEP 1 = Ping Fetch
let content_body_main = document.getElementById("content-body");
let results_body = document.getElementById("results-display")
let artistSearch;
let artist;
let album;
let image;

function renderHTML(jsonData) {
     
     generateList(postResult); // STEP 4: use json from fetch, into a function to generate html template

}

// STEP 5: Received JSON DATA, map jsonData array. 
function generateList(jsonData) {
  let arrayLevel1 = jsonData.results;


  // console.log(arrayLevel1);
  //   console.log(arrayLevel1.length);
    console.log(jsonData)
    let numberResults = arrayLevel1.length
    // let resultsDisplay = document.createElement('p');
    let loading = document.createElement('div');
      loading.classList.add("loader")
    for (let time=0; time<=2000; time++) {
      if(time==2000){
        results_body.innerHTML = `Results Found: ${numberResults} for ${artistSearch}`;
        results_body.appendChild(loading);
      }
    }
 
  arrayLevel1.forEach((item) => {
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

function searchForArtist() {
  submitButton.addEventListener('click', ()=> {
    content_body_main.innerHTML="";
    console.log("Button has been clicked");
    console.log(artistSearchInput.value);
    artistSearch = artistSearchInput.value
    fetch(`https://itunes.apple.com/search?term=${artistSearch}&media=music&entity=album&attribute=artistTerm&limit=200`) // Fetch is a promise/ targets the HTTPS request
  .then(response => response.json())  // Response comes back in a object (response). // Response.json is a function
  .then((json) => {
    postResult = json; // STEP2: assign the raw json to postResult
    renderHTML(postResult); // STEP 3: Begin function chain to render HTML
  });
  })
}

  inputLogging();
  searchForArtist();


