const last = '#AB45FF'
const colors = ['#FF5757', '#FE9900', '#FEED19', '#7AFF58', '#00F5E0', '#0094FE', last]

console.log('Things')

function extractScript(element) {
  const texts = element.innerHTML.split(' | ')
  element.innerHTML = texts[0]
  if (texts.length > 1) {
    element.innerHTML += '<span class="script">' + texts[1] + '</span>'
  }
}

document.querySelectorAll('.sqs-block-button-element--large').forEach(extractScript)
document.querySelectorAll('.sqs-block-image .image-block-outer-wrapper.image-block-v2 .image-title p').forEach(extractScript)


if (document.body.id === 'collection-5e63dd6d4f3cd622ab519e5e') {
  document.querySelectorAll('.sqs-block-html h1').forEach((element, index) => {
    element.style.color = colors[index]
  })

  document.querySelectorAll('.sqs-block-summary-v2').forEach((element, index) => {
    element.querySelectorAll('.summary-item').forEach((item) => {
      item.style.borderColor = colors[index]
    })
  })
}


function things() {

  document.querySelectorAll('[data-map]').forEach((element, index) => {
    const collection = element.getAttribute('data-map')
    fetch(`/${collection}?format=json`)
      .then(response => response.json())
      .then(data => {
        const map = new google.maps.Map(element, {
          styles: [ { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f5f5" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#dadada" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#c9c9c9" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] } ]
        })
        let bounds = new google.maps.LatLngBounds()

        data.items.forEach(item => {
          const marker = new google.maps.Marker({
            map,
            animation: google.maps.Animation.DROP,
            title: item.location.addressTitle,
            icon: `/assets/icon_${index+1}.svg`,
            position: {
              lat: item.location.mapLat,
              lng: item.location.mapLng,
            }
          })
          const infowindow = new google.maps.InfoWindow({
            content: item.excerpt
          })
          const box = document.querySelector(`a[href~="/${collection}/${item.urlId}"]`).parentElement.parentElement
          marker.addListener('click', () => {
            infowindow.open(map, marker)
            
            box.parentElement.parentElement.parentElement.scrollTo({ top: box.offsetTop - 33 })
          })

          bounds.extend(marker.getPosition())
        })

        map.fitBounds(bounds)
      })
    
  })
}

window.addEventListener('load', things)

