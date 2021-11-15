var Artist = null;

export default {
    DisplayArtist,
    EditArtist,
    SetupEditButton
}


const pageContent = document.getElementById('pageContent');
const title = document.getElementById('title');

function DisplayArtist(artist){
    console.log(artist);
    Artist = artist;
    if(artist.albums == null){
        artist.albums = [];
    }
    
    return `
        <h3>${artist.name}</h3>
        <button id="btnEditOwner">Edit</button>
        <ul>
            ${artist.albums.map(album => {
                return `
                    <li>
                        ${album.title}
                    </li>
                `
            }).join('')}
        </ul>
    `
}


export function EditArtist(artist){
    return `
        <input type="hidden" value="${artist.id}" id="owner_id" />
        <input type="text" value="${artist.name}" id="owner_name" />
        <h4>Artist Name</h4>
        ${artist.albums.map(album => {
            return `
                <input type="text" value="${album.title}" name="artist_albums" id="${album.id}" />
            `
        }).join('')}
        <button id="btnSaveArtist">Update</button>
    `;
}


export function SetupSaveButton(){
    let btnSave = document.getElementById("btnSaveArtist");
    btnSave.addEventListener("click", function(){
        let artistId = document.getElementById("artist_id").value;
        let artistName = document.getElementById("artist_name").value;

        const editArtist = {
            Id: artistId,
            Name: artistName
        }

        fetch('https://localhost:44313/api/artists/' + artistId, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editArtist)
        })
        .then(response => response.json())
        .then(data => {
            pageContent.innerHTML = DisplayArtist(data);
            SetupEditButton();
        });
    });
}

export function SetupEditButton(){
    let btnEdit = document.getElementById("btnEditArtist");
    btnEdit.addEventListener("click", function(){
        pageContent.innerHTML = EditArtist(Artist);
        SetupSaveButton();
    });
}


