let gridViewBtn = document.querySelector(".grid-view");
let tableViewBtn = document.querySelector(".table-view");
let gridViewContainer = document.querySelector(".grid-view-container");
let tableViewContainer = document.querySelector(".table-view-container");

gridViewBtn.addEventListener("click", () => {
  gridViewContainer.style.display = "flex";
  tableViewContainer.style.display = "none";
});

tableViewBtn.addEventListener("click", () => {
  gridViewContainer.style.display = "none";
  tableViewContainer.style.display = "block";
});

(function serverList() {
  server.getSongs().then((res) => {
    res.forEach((ex) => {
      let song = new Song(ex.artistName, ex.songName, ex.img, ex.id);
      song.getVoteCount = ex.votes;
      song.entryTopDate = ex.entryDate;
      serverTop.addSong(song);
    });
    createList(serverTop);
  });
})();

class Song {
  constructor(artist, name, img, id) {
    this.artist = artist;
    this.name = name;
    this.id = id;
    this.img = img;
  }

  #entryTopDate = new Date().toLocaleDateString();
  #votes = 0;

  get getVoteCount() {
    return this.#votes;
  }

  set getVoteCount(votes) {
    this.#votes = votes;
  }

  vote() {
    this.#votes += 1;
  }

  get entryTopDate() {
    return this.#entryTopDate;
  }

  set entryTopDate(date) {
    this.#entryTopDate = date;
  }
}

class MusicTop {
  #songs = [];

  addSong(song) {
    this.#songs.push(song);
  }

  getTop() {
    let songTop = this.#songs.sort((a, b) => {
      if (a.getVoteCount == b.getVoteCount) {
        let array = [a, b];
        array.sort((a, b) => {
          return b.entryTopDate - a.entryTopDate;
        });
      }
      return b.getVoteCount - a.getVoteCount;
    });
    return songTop;
  }

  getReverseTop() {
    let songTop = this.#songs.sort((a, b) => {
      if (a.getVoteCount == b.getVoteCount) {
        let array = [a, b];
        array.sort((a, b) => {
          return a.entryTopDate - b.entryTopDate;
        });
      }
      return a.getVoteCount - b.getVoteCount;
    });
    return songTop;
  }
}

class HtmlSong extends Song {
  getHtml() {
    return `<h3>Song Name: ${this.name}</h3> <p>Artist: ${this.artist} <br>Number of Votes: ${this.getVoteCount}<br> Creation date: ${this.entryTopDate}</p> <button>Vote</button>`;
  }
}

class MusicTopHtmlGenerator {
  static getHtml(musicTop) {
    let wholeList = "";

    if (musicTop.getTop) {
      musicTop.getTop().forEach((element, index) => {
        let listItem = `
        <div class="col">
        <div class="card grid-card mb-3" style="background-color: #3c4047; max-width: 440px">
          <div class="row g-0">
            <div class="col-md-6">
              <img src="${
                element.img
              }" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-6">
              <div class="card-body d-flex flex-column justify-content-center" style="padding: 8px; padding-left: 3px; padding-right: 13px;">
                <div class="align-self-end">
                  <button class="button-reset update-btn" style="color: #24e066;" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <svg id="${index}"  xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#24e066" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                  </button>
                  <button class="button-reset delete-btn">
                    <svg id="${index}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#24e066" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                </div>
                <h5 class="card-title"><span style="color: #24e066; font-weight: bold;">#${
                  index + 1
                }:</span> ${element.name}</h5>
                <p class="card-text" style="font-size: 14px;"><span style="color: #24e066; font-weight: bold;"> Artist:</span> ${
                  element.artist
                } </p>
                <p class="card-text d-flex align-content-center" style="font-size: 14px;">
                  <span style="color: #24e066; font-weight: bold;">Votes:</span>  
                  ${element.getVoteCount}
                  <button class="button-reset voting-btn" type="button">
                   <svg id="${index}" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#24e066" class="bi bi-arrow-up-short" viewBox="0 0 18 18">
                    <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
                  </svg>
                  </button>
                </p>
                <p class="card-text" style="font-size: 14px; color: #adaeae;"><small class="">Uploaded: ${
                  element.entryTopDate
                }</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>`;

        wholeList = wholeList + listItem;
      });
    } else {
      musicTop.forEach((element, index) => {
        let listItem = `
        <div class="col">
        <div class="card grid-card mb-3" style="background-color: #3c4047; max-width: 440px">
          <div class="row g-0">
            <div class="col-md-6">
              <img src="${
                element.img
              }" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-6">
              <div class="card-body d-flex flex-column justify-content-center" style="padding: 8px; padding-left: 3px; padding-right: 13px;">
                <div class="align-self-end">
                  <button class="button-reset update-btn" style="color: #24e066;" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <svg id="${index}"  xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#24e066" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                  </button>
                  <button class="button-reset delete-btn">
                    <svg id="${index}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#24e066" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                </div>
                <h5 class="card-title"><span style="color: #24e066; font-weight: bold;">#${
                  index + 1
                }:</span> ${element.name}</h5>
                <p class="card-text" style="font-size: 14px;"><span style="color: #24e066; font-weight: bold;"> Artist:</span> ${
                  element.artist
                } </p>
                <p class="card-text d-flex align-content-center" style="font-size: 14px;">
                  <span style="color: #24e066; font-weight: bold;">Votes:</span>  
                  ${element.getVoteCount}
                  <button class="button-reset voting-btn" type="button">
                   <svg id="${index}" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#24e066" class="bi bi-arrow-up-short" viewBox="0 0 18 18">
                    <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
                  </svg>
                  </button>
                </p>
                <p class="card-text" style="font-size: 14px; color: #adaeae;"><small class="">Uploaded: ${
                  element.entryTopDate
                }</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>`;

        wholeList = wholeList + listItem;
      });
    }
    return wholeList;
  }

  static getHtmlTable(musicTop) {
    let wholeList = "";

    if (musicTop.getTop) {
      musicTop.getTop().forEach((element, index) => {
        let listItem = `
        <tr>
        <th scope="row">
        ${index + 1}
        </th>
        <td>
          <img src="${element.img}" alt="..." width="50px" height="50px">
          ${element.name}
        </td>
        <td>${element.artist}</td>
        <td>Rock / Rap / Trap</td>
        <td>
        ${element.getVoteCount}
          <button class="button-reset voting-btn">
           <svg id="${index}" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#24e066" class="bi bi-arrow-up-short" viewBox="0 0 18 18">
            <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
          </svg>
          </button>
        </td>
        <td>${element.entryTopDate}</td>
        <td>
          <button class=" button-reset update-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <svg id="${index}" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#24e066" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </button>
          <button class=" button-reset delete-btn">
            <svg id="${index}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#24e066" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </td>
      </tr> 
        `;
        wholeList = wholeList + listItem;
      });
    } else {
      musicTop.forEach((element, index) => {
        let listItem = `
        <tr>
        <th scope="row">
        ${index + 1}
        </th>
        <td>
          <img src="${element.img}" alt="..." width="50px" height="50px">
          ${element.name}
        </td>
        <td>${element.artist}</td>
        <td>Rock / Rap / Trap</td>
        <td>
        ${element.getVoteCount}
          <button class="button-reset voting-btn">
           <svg id="${index}" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#24e066" class="bi bi-arrow-up-short" viewBox="0 0 18 18">
            <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
          </svg>
          </button>
        </td>
        <td>${element.entryTopDate}</td>
        <td>
          <button class=" button-reset update-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <svg id="${index}" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#24e066" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </button>
          <button class=" button-reset delete-btn">
            <svg id="${index}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#24e066" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </td>
      </tr> 
        `;
        wholeList = wholeList + listItem;
      });
    }
    return wholeList;
  }
}

let submitButton = document.querySelector("#submit-btn");
submitButton.addEventListener("click", newSongEntry);

function newSongEntry() {
  let songName = document.querySelector("#song").value;
  let artistName = document.querySelector("#artist").value;
  let imgLink = document.querySelector("#img-link").value;

  if (artistName == "" || songName == "" || imgLink == "") {
    alert("Please fill in all fields");
    return;
  }

  let newSong = new HtmlSong(songName, artistName, imgLink);

  let testSong = {
    artistName: artistName,
    songName: songName,
    entryDate: newSong.entryTopDate,
    votes: newSong.getVoteCount,
    img: imgLink,
  };

  server.addSong(testSong);
}

function createList(topData) {
  let htmlToBeInjected = MusicTopHtmlGenerator.getHtml(topData);
  let htmlToBeInjectedTable = MusicTopHtmlGenerator.getHtmlTable(topData);

  let gridViewContainer = document.querySelector(".grid-view-container");
  gridViewContainer.innerHTML = "";

  gridViewContainer.innerHTML = htmlToBeInjected;

  let tableViewContainer = document.querySelector(".table-view-body");
  tableViewContainer.innerHTML = "";

  tableViewContainer.innerHTML = htmlToBeInjectedTable;

  votingButtonsAction();
  deleteSong();
  fillSongInfo();
}

function votingButtonsAction() {
  let votingBtn = document.querySelectorAll(".voting-btn");
  votingBtn.forEach((elem) => {
    elem.addEventListener("click", (element) => {
      let index = element.target.id;
      let id = serverTop.getTop()[index].id;
      serverTop.getTop()[index].vote();

      let testArray = serverTop.getTop();

      let newIndex = testArray.findIndex((elm) => elm.id == id);

      let updatedSong = {
        artistName: serverTop.getTop()[newIndex].artist,
        songName: serverTop.getTop()[newIndex].name,
        entryDate: serverTop.getTop()[newIndex].entryTopDate,
        id: serverTop.getTop()[newIndex].id,
        votes: serverTop.getTop()[newIndex].getVoteCount,
        img: serverTop.getTop()[newIndex].img,
      };

      server.updateSong(updatedSong, id);
    });
  });
}

function deleteSong() {
  let deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((elem) => {
    elem.addEventListener("click", (element) => {
      let index = element.target.id;
      let id = serverTop.getTop()[index].id;
      if (confirm("Are you sure you want to delete this song?") == true) {
        server.removeSong(id);
      }
    });
  });
}

let serverTop = new MusicTop();
let indexForUpdate;

function fillSongInfo() {
  let updateButton = document.querySelectorAll(".update-btn");
  updateButton.forEach((elem) => {
    elem.addEventListener("click", (element) => {
      let index = element.target.id;
      indexForUpdate = index;
      dataToBeUsed = serverTop.getTop()[index];
      document.querySelector("#song").value = dataToBeUsed.name;
      document.querySelector("#artist").value = dataToBeUsed.artist;
      document.querySelector("#img-link").value = dataToBeUsed.img;

      document.querySelector("#submit-btn").style.display = "none";
      document.querySelector("#upload-btn").style.display = "block";
    });
  });
}

let updateUploadBtn = document.querySelector("#upload-btn");
updateUploadBtn.addEventListener("click", updateSong);

function updateSong() {
  let songName = document.querySelector("#song").value;
  let artistName = document.querySelector("#artist").value;
  let imgLink = document.querySelector("#img-link").value;

  if (artistName == "" || songName == "" || imgLink == "") {
    alert("Please fill in all fields");
    return;
  }

  let updatedSong = {
    artistName: document.querySelector("#artist").value,
    songName: document.querySelector("#song").value,
    entryDate: serverTop.getTop()[indexForUpdate].entryTopDate,
    id: serverTop.getTop()[indexForUpdate].id,
    votes: serverTop.getTop()[indexForUpdate].getVoteCount,
    img: document.querySelector("#img-link").value,
  };
  setTimeout(server.updateSong(updatedSong, updatedSong.id), 1000);
}

let formReset = document.querySelector("#form-reset");
formReset.addEventListener("click", () => {
  document.querySelector("#submit-btn").style.display = "block";
  document.querySelector("#upload-btn").style.display = "none";

  document.querySelector("#song").value = "";
  document.querySelector("#artist").value = "";
  document.querySelector("#img-link").value = "";
});

function filterSongs() {
  let searchValue = `${document.querySelector("#search-value").value}`;

  const filteredList = serverTop.getTop().filter((elm) => {
    return elm.artist.includes(searchValue) || elm.name.includes(searchValue);
  });

  createList(filteredList);
}

let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", filterSongs);

console.log(serverTop);

let selectDropdown = document.querySelector("#dropdown-select");
selectDropdown.onchange = (ev) => {
  if (selectDropdown.value == "des") {
    createList(serverTop.getReverseTop());
  } else {
    createList(serverTop);
  }
};
