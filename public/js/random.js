var route   = document.getElementById('js-random-route'),
    call    = document.getElementById('js-random-call'),
    home    = document.getElementById('js-random-home'),
    list    = document.getElementById('js-random-list')

function updateMapURL(address) {
    let maps = 'https://maps.google.com'

    // https://www.habaneroconsulting.com/stories/insights/2011/opening-native-map-apps-from-the-mobile-browser
    if (bowser.iphone) {
        address = '?saddr=Current Location&daddr=' + address
    } else if (bowser.android) {
        maps = 'geo:'
    } else {
        maps += '?q='
    }

    route.addEventListener("click", function() {
        location.href = maps + encodeURIComponent(address)
    })
}

function updatePhone(number) {
    call.addEventListener("click", function() {
        location.href = 'tel:' + number
    })
}

home.addEventListener("click", function() {
    location.href = '/'
})

list.addEventListener("click", function() {
    location.href = '/list'
})
