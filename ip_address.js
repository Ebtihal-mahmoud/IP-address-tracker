$(function () {
  let mapid = $("#mapid");
  $("#arrow").click(function () {
    return fullip();
  });
  $("input").keypress(function (event) {
    let keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode === 13) fullip();
  });
  fullip();
  function ipval() {
    let inputVal = $("input").val();
    inputVal.length < 1 ? "" : inputVal;
    return inputVal;
  }

  function address() {
    let http =
      "https://geo.ipify.org/api/v1?apiKey=at_lwixmPOKc6QjKnCKkxfxwALi7nSVd";
    let ipAddress = "&ipAddress=" + ipval();
    let domain = "&domain=" + ipval();
    return http + ipAddress + domain;
    //console.log(http + ipAddress);
  }
  function fullip() {
    $.getJSON(address(), function (data) {
      let ip = data.ip;
      let location =
        data.location.city +
        ", " +
        data.location.region +
        ", " +
        data.location.country +
        ", " +
        data.location.postalCode;
      let timezone = "UTC " + data.location.timezone;
      let isp = data.isp;
      $("#ip").text(ip);
      $("#lo").text(location);
      $("#zone").text(timezone);
      $("#isp").text(isp);
      // console.log(ip);
      // console.log(location);
      // console.log(timezone);
      // console.log(isp);
      // console.log([data.location.lat, data.location.lng]);
      let myIcon = L.icon({
        iconUrl: "images/icon-location.svg",
        iconSize: [38, 45],
      });
      L.marker([data.location.lat, data.location.lng], { icon: myIcon }).addTo(
        mymap
      );
      // mymap.locate({ setView: true, maxZoom: 13 });
      mymap.flyTo([data.location.lat, data.location.lng], 13);
      // mymap.bindPopup("<p>hello</p>").openPopup();
    });
  }
  //fullip();
  // address();
});
