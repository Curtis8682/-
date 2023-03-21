const QRCode = require('qrcode')

const options = {
  errorCorrectionLevel: 'H',
  type: 'terminal',
  quality: 0.95,
  margin: 1,
  color: {
    dark: '#000',
    light: '#FFF',
  },
}

// QRCode.toString('https://www.baidu.com').then(qrImage => {
//   console.log("terminal", qrImage)
// }).catch(err => {
//   console.error(err)
// })

// QRCode.toDataURL('qrcode test in nodejs', options)
//   .then(qrImage => {
//     console.log(qrImage)
//   })
//   .catch(err => {
//     console.error(err)
//   })

QRCode.toFile('../public/images/qrCode.png', "https://www.baidu.com", options)
  .then(() => {
    console.log('succeed')
  }).catch(err => {
    console.error(err)
  })
