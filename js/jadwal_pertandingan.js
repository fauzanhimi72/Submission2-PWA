function resultMatchJSON(data) {
  var JadwalHTML = ''
  data.matches.forEach(function (match) {
    JadwalHTML += `
        <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div center-align>
              <h5 class="center-align">Matchday : ${match.matchday}</h5>
              <div class="center-align">Kick Off : ${convertDate(new Date(match.utcDate))}</div>

              <div class="row" style="margin:20px">
                <div class="col s5 truncate right-align">
                  <span class="blue-text">  ${match.homeTeam.name}</span>
                </div>
                <div class="col s2 ">
                  VS
                </div>
                <div class="col s5 truncate left-align">
                  <span class="blue-text">  ${match.awayTeam.name}</span>
                </div>
              </div>
              <div class="center-align">
                <a class="waves-effect waves-light btn" style="background:#6D0F0F;" href="./detail_pertandingan.html?id=${match.id}">Lihat Detail</a>
              </div>
            </div>
          </div>
        </div>
      </div>`
  });
  document.getElementById("jadwal-content").innerHTML = JadwalHTML;
}
