var route   = document.getElementById('route'),
    call    = document.getElementById('call'),
    back    = document.getElementById('back'),
    list    = document.getElementById('list')

function updateMapURL(address) {
    var maps = 'https://maps.google.com?q='

    // https://www.habaneroconsulting.com/stories/insights/2011/opening-native-map-apps-from-the-mobile-browser
    if (bowser.iphone) {
        address = '/?saddr=Current Location&daddr=' + address
    } else if (bowser.android) {
        maps = 'geo:'
    }

    var url     = maps + encodeURIComponent(address)
        route   = document.getElementById("route")

    route.addEventListener("click", function() {
        location.assign(url)
    })
}

function updatePhone(number) {
    call.addEventListener("click", function() {
        location.assign('tel:' + number)
    })
}

back.addEventListener("click", function() {
    location.href = '/'
})

list.addEventListener("click", function() {
    location.href = '/list'
})
