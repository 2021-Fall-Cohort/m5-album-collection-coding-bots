import Album from "./Album";
import apiActions from "../api/apiActions"



export default {
DisplayAlbums,
SetupDeleteButton,
SetupAddAlbum
}

const pageContent = document.getElementById('pageContent');
const title = document.getElementById('title');

function DisplayAlbums(albums){
return `
        <section class='addAlbums'>
            <label><strong>Name:</strong></label>
            <input type='text' id='AlbumName' placeholder='Enter a name for the album' />
            <button id='btnAddAlbum'>Add Album</button>
        </section>
        <ol>
            ${albums.map(album => {
                console.log(album)
                return `
                    <li>
                        <h4>
                            ${album.title} <button id="${album.id}" class="album_delete">Delete</button>

                        </h4>
                    </li>
                `;
            }).join('')}
        </ol>
    `;

}

export function SetupDeleteButton(){
    let albumDeleteButtons = document.querySelectorAll(".album_delete");

    albumDeleteButtons.forEach(element => {
        element.addEventListener('click', function(){
            let id = element.id;

            apiActions.deleteRequest("https://localhost:44313/api/albums/", id, data => {
               
                pageContent.innerHTML = DisplayAlbums(data);
                SetupAddAlbum();
                SetupDeleteButton();
            });
        });
    });
}


export function SetupAddAlbum(){
    const btnAddAlbum = document.getElementById("btnAddAlbum");
    btnAddAlbum.addEventListener("click", function (){
        //console.log('add artist functionality goes here...');
        const newAlbum = {
            Name: document.getElementById("title").value
        }

        apiActions.postRequest("https://localhost:44313/api/albums/", newAlbum, data => {

            pageContent.innerHTML = Album.DisplayAlbum(data);
            Album.SetupEditButton();
          
        });
    });
}


