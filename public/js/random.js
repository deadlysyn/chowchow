var route   = document.getElementById('js-random-route'),
    call    = document.getElementById('js-random-call'),
    home    = document.getElementById('js-random-home'),
    list    = document.getElementById('js-random-list')

function updateMapURL(address) {
    let maps = 'https://maps.google.com?q='

    // https://www.habaneroconsulting.com/stories/insights/2011/opening-native-map-apps-from-the-mobile-browser
    // http://www.anexinet.com/blog/opening-native-mapping-app-from-your-mobile-hybrid-app
    if (bowser.iphone) {
        //address = '?saddr=Current Location&daddr=' + address
        maps = 'maps:q='
    } else if (bowser.android) {
        maps = 'geo:0,0?q='
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
