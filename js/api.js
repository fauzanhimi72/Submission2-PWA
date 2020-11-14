var api_base_url = "https://api.football-data.org/v2/";
var endpoint_pertandingan_terakhir = `${api_base_url}teams/81/matches?status=FINISHED&limit=1`;
var endpoint_pertandingan_mendatang = `${api_base_url}teams/61/matches?status=SCHEDULED&limit=1`;
var id_liga = 2019;
var endpoint_jadwal_upcoming = `${api_base_url}competitions/${id_liga}/matches?status=SCHEDULED&limit=20`;
var endpoint_match = `${api_base_url}matches/`;

var fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': 'e823a7e13b5e4ad09a8add788a57aa58'
        }
    });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getPertandinganTerakhir() {
    if ('caches' in window) {
        caches.match(endpoint_pertandingan_terakhir).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    hasilTerakhirMatchJSON(data);
                });
            }
        });
    }

    fetchApi(endpoint_pertandingan_terakhir)
        .then(status)
        .then(json)
        .then(function (data) {
            hasilTerakhirMatchJSON(data)
        })
        .catch(error);
}

function getPertandinganMendatang() {
    if ('caches' in window) {
        caches.match(endpoint_pertandingan_mendatang).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    upcomingMatchJSON(data);
                });
            }
        });
    }

    fetchApi(endpoint_pertandingan_mendatang)
        .then(status)
        .then(json)
        .then(function (data) {
            upcomingMatchJSON(data)
        })
        .catch(error);
}

function getMatchLeague() {
    return new Promise(function (resolve, reject) {

        if ('caches' in window) {
            caches.match(endpoint_jadwal_upcoming).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resultMatchJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(endpoint_jadwal_upcoming)
            .then(status)
            .then(json)
            .then(function (data) {
                resultMatchJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}

function getDetailMatchById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        if ('caches' in window) {
            caches.match(endpoint_match + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resultDetailMatchJSON(data);
                        resolve(data)
                    });
                }
            });
        }
        fetchApi(endpoint_match + idParam)
            .then(status)
            .then(json)
            .then(function (data) {
                resultDetailMatchJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}
