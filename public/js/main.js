var latitude    = document.getElementById("latitude"),
    longitude   = document.getElementById("longitude"),
    loading     = document.getElementById("loading"),
    options     = {
        enableHighAccuracy: true,
        maximumAge: 300000,
        timeout: 20000
    }

function success(position) {
    latitude.value = position.coords.latitude
    longitude.value = position.coords.longitude
    loading.innerHTML = '<button type="submit">FIND <i class="fas fa-utensils" aria-hidden="true"></i> FOOD</button>'
}

function error(error) {
    loading.innerHTML = '<p>Unable to retrieve location:<br/> "' + error.message + '"</p>'
}

if (!navigator.geolocation) {
    location.assign('/nolocation')
} else {
    navigator.geolocation.getCurrentPosition(success, error, options)
}

if (!navigator.cookieEnabled) {
    location.assign('/nocookies')
}
