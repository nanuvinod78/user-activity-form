const form = document.getElementById("activityForm");

form.addEventListener("submit", function (e) {
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
      distance: 0 // Optional: you can calculate from a fixed point
    };

    fetch("https://script.google.com/macros/s/AKfycbzWqxkZm_St8zRbanXFuYhxm5WHR4rH3MucTQ8g85rVnj2-nsv6KFiAYDI-2UqgY2Bu/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.text())
      .then(message => alert("Success: " + message))
      .catch(error => alert("Error: " + error.message));
  });
});
