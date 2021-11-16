import Albums from "./Albums";
import * as CONSTANTS from "./constants";
import Artists from "./Artists"
import Songs from "./Songs"
import apiActions from "../api/apiActions";

export default {
    SetupNavBar,
    SetupHeaderEventListeners,
    SetupHome
}



export function SetupNavBar(){
    return `
    <ul>
        <li id="navHome">Home</li> 
        <li id="navAlbums">Albums</li>
        <li id="navArtists">Artists</li>
        <li id="navSongs">Songs</li>
    </ul>
    `;
}


export function SetupHeaderEventListeners(){
    SetupHome();
    SetupAlbums();
    SetupArtists();
    SetupSongs();
title.innerText = "";
pageContent.innerHTML = `
     <h1>Hello World Productions</h1>
     <p>Welcome to our album collection!</p>
     `;
}



function SetupHome(){
    const pageContent = document.getElementById("pageContent")
    const btnHome = document.getElementById("navHome");
    btnHome.addEventListener("click", function(){
     pageContent.innerHTML = `
     <h1>Hello World Productions</h1>
     <p>Welcome to our album collection!</p>
     `
   });
}

function SetupAlbums(){
    const btnAlbums = document.getElementById("navAlbums")
    btnAlbums.addEventListener("click", function(){
        console.log("hello")

        fetch("https://localhost:44313/api/albums")
        .then(response => response.json())
        .then(data =>{
            CONSTANTS.Content.innerHTML = Albums.DisplayAlbums(data);
            pageContent.innerHTML = Albums.DisplayAlbums(data); // only a placeholder. Need data
        });
    });
}


function SetupArtists() {
    const btnArtists = document.getElementById("navArtists")
    btnArtists.addEventListener("click", function () {
        console.log("this one too")
        fetch("https://localhost:44313/api/artists")
        .then(response => response.json())
        .then(data =>{
            pageContent.innerHTML = Artists.DisplayArtists(data); 
            Artists.SetupArtistLinks();
            Artists.SetupAddArtist();
            Artists.SetupDeleteButton();
        });

    });
}


function SetupSongs() {
    const btnSongs = document.getElementById("navSongs")
    btnSongs.addEventListener("click", function () {
        console.log("songs works")
        apiActions.getRequest("https://localhost:44313/api/songs/", data => {
            pageContent.innerHTML = Songs.DisplaySongs(data);

        });
       
    });
}
