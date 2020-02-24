console.log('Things')

document.querySelectorAll('.sqs-block-button-element--large').forEach(element => {
  const texts = element.innerHTML.split(' | ')
  element.innerHTML = texts[0]
  if (texts.length > 1) {
    element.innerHTML += '<span>' + texts[1] + '</span>'
  }
})