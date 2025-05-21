const form = document.getElementById('activityForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const formData = new FormData(form);
    const data = {
      zila: formData.get("zila"),
      taluk: formData.get("taluk"),
      vikas: formData.get("vikas"),
      samyojak: formData.get("samyojak"),
      kalika: formData.get("kalika"),
      date: new Date().toISOString().split("T")[0],
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      distance: 0 // Optional: calculate this if needed
    };

    fetch("https://script.google.com/macros/s/AKfycbxF-oxZAUdkGE9WrdRjgCV2rGSIWN8knvfcGlWqe_SY7Urh-zwu8GIkFx15GiruOHzM/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.text())
    .then(msg => alert("Success: " + msg))
    .catch(err => alert("Error: " + err.message));
  });
});
