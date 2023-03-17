const BASE_URL = "http://localhost:3000";

const server = {
  getSongs() {
    const url = `${BASE_URL}/songs`;
    return fetch(url).then((res) => res.json());
  },
  getSong(id) {
    const url = `${BASE_URL}/songs/${id}`;
    return fetch(url).then((res) => res.json());
  },
  addSong(song) {
    const url = `${BASE_URL}/songs`;
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    });
  },
  updateSong(payload, id) {
    const url = `${BASE_URL}/songs/${id}`;
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  },
  removeSong(id) {
    const url = `${BASE_URL}/songs/${id}`;
    return fetch(url, {
      method: "DELETE",
    });
  },
};
