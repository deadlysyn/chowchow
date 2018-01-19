var form        = document.getElementById('form'),
    find        = document.getElementById('find'),
    price       = document.getElementById('price'),
    drive       = document.getElementById('drive'),
    donate      = document.getElementById('donate')
    latitude    = document.getElementById('latitude'),
    longitude   = document.getElementById('longitude'),
    loading     = document.getElementById('loading'),
    geoOpts     = {
        enableHighAccuracy: true,
        maximumAge: 300000,
        timeout: 20000
    }

if (!navigator.geolocation || !navigator.cookieEnabled) {
    location.href = '/nolocation'
} else {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOpts)
}

function geoSuccess(position) {
    latitude.value = position.coords.latitude
    longitude.value = position.coords.longitude
    loading.innerHTML = 'FIND <i class="fas fa-utensils fa-lg" aria-hidden="true"></i> FOOD'
}

function geoError(error) {
    loading.innerHTML = '<p style="font-size: 0.7rem">Unable to retrieve location:<br/> "' + error.message + '"</p>'
}

find.addEventListener("click", function() {
    form.submit()
})

price.addEventListener("click", function() {
    // yelp API price range: $/$$/$$$/$$$$
    let dollarIcon  = '<i class="fas fa-dollar-sign fa-lg" aria-hidden="true"></i>',
        max         = 4,
        count       = price.childElementCount,
        content     = ''

    if (count == max) {
        count = 1
    } else {
        count++
    }

    for (let i = 0; i < count; i++) {
        content += dollarIcon
    }

    price.innerHTML = content
    form.elements['price'].value = '$'.repeat(count)
})

drive.addEventListener("click", function() {
    let driveIcon   = '<i class="fas fa-dot-circle fa-lg"></i>',
        walkIcon    = '<i class="far fa-dot-circle fa-lg"></i>',
        elem        = form.elements['drive']

    if (elem.value == 'true') {
        elem.value = 'false'
        drive.innerHTML = walkIcon
    } else {
        elem.value = 'true'
        drive.innerHTML = driveIcon
    }
})

donate.addEventListener("click", function() {
    location.href = 'https://www.charitynavigator.org/index.cfm?bay=my.donations.makedonation&ein=363673599'
})
