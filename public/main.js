// let response;
// const channels = [];
// const channelIds = [];
// const playlists = [];
// const vids = [];
// /**
//  * Sample JavaScript code for youtube.subscriptions.list
//  * See instructions for running APIs Explorer code samples locally:
//  * https://developers.google.com/explorer-help/guides/code_samples#javascript
//  */

// function authenticate() {
//   return gapi.auth2.getAuthInstance()
//     .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
//     .then(function () { console.log("Sign-in successful"); },
//       function (err) { console.error("Error signing in", err); });
// }
// function loadClient() {
//   gapi.client.setApiKey("AIzaSyCiBbjgErATrxftURahHOb2QnQswVPmY2c");
//   return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//     .then(function () { console.log("GAPI client loaded for API"); },
//       function (err) { console.error("Error loading GAPI client for API", err); });
// }
// // Make sure the client is loaded and sign-in is complete before calling this method.
// function execute() {
//   return gapi.client.youtube.subscriptions.list({
//     "part": "snippet,contentDetails",
//     "mine": true,
//     "maxResults": 15
//   })
//     .then(function (response) {
//       this.response = response;
//       for (let i = 0; i < this.response.result.items.length; i++) {
//         channelIds.push(this.response.result.items[i].snippet.channelId);
//         channels.push(this.response.result.items[i]);
//         const p = document.createElement("p");
//         // console.log(response.result.items[i]);
//       }
//     })
//     .then(function (response) {
//       // Handle the results here (response.result has the parsed body).
//       console.log("Response", this.response);
//     },
//       function (err) { console.error("Execute error", err); });
// }
// gapi.load("client:auth2", function () {
//   gapi.auth2.init({ client_id: "693361181160-606m03ck0og0l1ati77naa9li3c4heul.apps.googleusercontent.com" });
// });
// function getVids() {
//   return gapi.client.youtube.videos.list({
//     "part": "snippet,contentDetails,statistics",
//     "maxResults": 13,
//     "myRating": "like"
//   }).then(function (response) {
//     // const cards = document.getElementsByClassName("card"); // array of all cards


//     for (let i = 0; i < response.result.items.length; i++) {
//       const vidLink = `https://www.youtube.com/embed/${response.result.items[i].id}`;
//       vids.push(`https://www.youtube.com/embed/${response.result.items[i].id}`);
//     }

//     const inner = document.getElementById("inner")
//     for (let link of vids) {
//       const iframe = document.createElement("iframe")
//       iframe.src = link;
//       iframe.allowFullscreen = true;

//       const item = document.createElement("div")
//       const group = document.createElement("div")
//       const card = document.createElement("div")
//       inner.appendChild(item)
//       item.appendChild(group)
//       group.appendChild(card);
//       card.appendChild(iframe);
//       inner.className = "carousel-inner"
//       item.className = "carousel-item"
//       group.className = "card-group"
//       card.className = "card"

//     }
//     // Handle the results here (response.result has the parsed body).
//     console.log("Response", response);
//   },
//     function (err) { console.error("Execute error", err); });
// }
// gapi.load("client:auth2", function () {
//   gapi.auth2.init({ client_id: "693361181160-606m03ck0og0l1ati77naa9li3c4heul.apps.googleusercontent.com" });
// });

// JS for Spotify API

// WHAT CODE DOES:
// 
/* 
    Gets users playlist and displays it in the index.html
*/
// First
fetch('https://api.spotify.com/v1/me/playlists', {
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: "Bearer BQBBD8hI-nP5_1eyRZtPVxHwmN0ODty2Dmi2FhJ-QVqimwQ1Y1MGCR0ZEbpIMjE8zreRrL15ek2BxT89RMfikNbv-lrrhj_9AEEtLmKa2wqGvRyIk6MtufoFf6XbcCBbmW2gfGym0DyZS6WS5OGwFlGo1X5gLwigSKbivFCLQsZGp2U"
  },
}).then(function (respon) {
  return respon.json();


})
  .then(function (myJson) {
    // Makes var to the amount of playlist in the account. So if user has 3 playlist, it matches it.
    let playlistLength = myJson.items.length;

    for (let i = 0; i < playlistLength; i++) {

      // embedUrl = the link to original link to spotify playlist
      let embedUrl = myJson.items[i].external_urls.spotify;
      // splits link to spotify playlist, since the only requirement for accessing full playlist
      //  is adding the "word embed/".
      // Example https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd -> https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd
      const splitter = "https://open.spotify.com/"
      // split converts string into an array in order to decide where to place "embed/"
      let split = embedUrl.split(splitter)
      split[0] = "embed/"
      split.unshift(splitter)
      // .join turn array back to string, ('') = not including any spaces 
      embedUrl = split.join('');
      console.log(embedUrl);

      userData(embedUrl)

    }
  });


const userData = (data) => {
  divPlaylist = document.getElementById("divPlaylist")
  iframe = document.createElement("iframe")
  iframe.src = data;
  iframe.width = "300px";
  iframe.height = "380px";
  iframe.allow = "encrypted-media";
  iframe.allowTransparency = "true"
  divPlaylist.appendChild(iframe);
}

