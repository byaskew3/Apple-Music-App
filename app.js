let song;
let playSong;

// Spotify Client Creds
const clientId = '94e5fc60a83a4e7889fe541a27ebb48e';
const clientSecret = '01d0ddd8948f4a92a6508f90f930fb80';

const _getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'      
    })

    // Access the data given to us by the fetch response (Promise)
    const data = await result.json()
    return data.access_token
}

// Function to get Song info when image figure is clicked
/**
 * @param img_index
 * @param item_index
 * 
 * Function gets a song from spotify using the image index of our gallery. Then it finds
 * the correct item_index indside of the JSON response data from Spotify which will
 * produce a preview URL that will be used to play our selected song.
 * 
 */

async function clickedEvent(img_index, item_index) {
    // Get track name
    let track = document.getElementsByTagName('img')[img_index].attributes[1].value

    // Get our token
    let token = await _getToken();

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ])

    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
        method: 'GET',
        headers: headers
    })

    let result = await fetch(request);

    let response = await result.json();

    console.log(response)
    let song = response.tracks.items[item_index].preview_url

    // Before we play a song, first check if playSong is True, and if so, stop it
    if (playSong){
        stopSnippet();
    }
    songSnippet(song);
}

/**
 * @param id
 * @param event
 * 
 * id = image id for gallery image
 * event = Mouse event given by the action from our user
 * 
 * Our function will produce songs from the clickedEvent based on the index of the image
 * 
 * 
 */

function getSong(id, event) {
    switch(id){
        case 'div1': { // Anywhere the wind Blows
            event.stopPropagation();
            clickedEvent(0, 0)
            break;
        }
        case 'div2': { // N95
            event.stopPropagation();
            clickedEvent(1, 0)
            break;  
        }
        case 'div3': { // Lie Again
            event.stopPropagation();
            clickedEvent(2, 0)
            break;
        }
        case 'div4': { // Warm Embrace
            event.stopPropagation();
            clickedEvent(3, 0)
            break;
        }
        case 'div5': { // Leave the Door Open
            event.stopPropagation();
            clickedEvent(4, 0)
            break;
        }
        case 'div6': { // Mr. Carter
            event.stopPropagation();
            clickedEvent(5, 0)
            break;
        }
    }
}

/**
 * 
 *@param url
 *
 * url is the song preview url
 * 
 * function will return audio clip given by the url
 * 
 */

 function songSnippet(url){
     playSong = new Audio(url)
     return playSong.play();
 }

 /**
  * 
  * NO Params
  * 
  * Function returns an event to stop the song snippet
  * 
  */

 function stopSnippet(){
     return playSong.pause();
 }