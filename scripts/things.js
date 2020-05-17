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

if (document.body.id === 'collection-5ea854d8d5af594196d4fdc2') {
  document.querySelectorAll('h3').forEach((element, index) => {
    element.addEventListener('click', () => {
      element.classList.toggle('question-active')
    })
  })
}


document.querySelectorAll('figure.design-layout-poster a').forEach((element, index) => {
  const href = element.getAttribute('href')
  if (href.includes('youtube') || href.includes('vimeo')) {
    console.log(element)

    element.classList.add('play-button')
    element.setAttribute('target', '_blank')

    element.parentElement.parentElement.parentElement.classList.add('play-button-wrapper')
    element.parentElement.parentElement.parentElement.parentElement.classList.add('play-button-outer-wrapper')

    const iframe = document.createElement('iframe')
    iframe.frameBorder = 0
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    iframe.allowFullscreen = true
    iframe.style = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 88; opacity: 0; transition: opacity 666ms; pointer-events: none;'

    const close = document.createElement('button')
    close.style = 'position: fixed; top: 88px; right: 20px; z-index: 89; opacity: 0; transition: opacity 666ms; pointer-events: none; background: transparent; color: #00F5E0; border: none; outline: none;'
    close.classList.add('heading')
    close.innerText = '✕ Close'
    close.addEventListener('click', e => {
      iframe.src = undefined
      iframe.style.opacity = 0
      iframe.style.pointerEvents = 'none'
      close.style.opacity = 0
      close.style.pointerEvents = 'none'
      // document.body.style.overflowY = 'auto'
    })

    document.body.appendChild(iframe)
    document.body.appendChild(close)

    element.addEventListener('click', e => {
      e.preventDefault()

      iframe.src = element.href
      iframe.style.opacity = 1
      iframe.style.pointerEvents = 'auto'
      close.style.opacity = 1
      close.style.pointerEvents = 'auto'
      // document.body.style.overflowY = 'hidden'
    })
  }
})

document.querySelectorAll('.sqs-gallery-controls a').forEach((element, index) => {
  const img = document.createElement('img')

  if (element.classList.contains('previous')) {
    img.src = '/assets/305Fitness_GetCertified_Icons_LeftArrow-06.svg'
  } else {
    img.src = '/assets/305Fitness_GetCertified_Icons-05.svg'
  }

  element.appendChild(img)
})


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

