var home = document.getElementById('js-list-home')

home.addEventListener("click", function() {
    location.href = '/'
})

function route(address) {
    let maps = 'https://maps.google.com'

    // https://www.habaneroconsulting.com/stories/insights/2011/opening-native-map-apps-from-the-mobile-browser
    if (bowser.iphone) {
        address = '?saddr=Current Location&daddr=' + address
    } else if (bowser.android) {
        maps = 'geo:'
    } else {
        maps += '?q='
    }

    location.href = maps + encodeURIComponent(address)
}

function call(number) {
    location.href = 'tel:' + number
}
