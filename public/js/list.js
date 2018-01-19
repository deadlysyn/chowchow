var home = document.getElementById('js-list-home')

home.addEventListener("click", function() {
    location.href = '/'
})

function route(address) {
    let maps = 'https://maps.google.com?q='

    // https://www.habaneroconsulting.com/stories/insights/2011/opening-native-map-apps-from-the-mobile-browser
    // http://www.anexinet.com/blog/opening-native-mapping-app-from-your-mobile-hybrid-app
    if (bowser.iphone) {
        //address = '?saddr=Current Location&daddr=' + address
        maps = 'maps:q='
    } else if (bowser.android) {
        maps = 'geo:0,0?q='
    }

    location.href = maps + encodeURIComponent(address)
}

function call(number) {
    location.href = 'tel:' + number
}
