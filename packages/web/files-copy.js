const path = require('path')
const fs = require('fs-extra')

let source = path.resolve(__dirname, 'build')
let destination = path.resolve(__dirname, '../api/client')

const copyFiles = () => {
  fs.copy(source, destination)
  .then(() => console.log('Copy completed!'))
  .catch(err => {
    console.log('An error occured while copying the folder.')
    return console.error(err)
  })
}

setTimeout(copyFiles, 3000)