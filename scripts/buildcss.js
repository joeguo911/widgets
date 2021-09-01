var fs = require('fs')
var path = require('path')
const currentDir = path.resolve('./')

function copy(srcPath, targetPath) {
  var readStream = fs.createReadStream(srcPath)
  var writeStream = fs.createWriteStream(targetPath)
  readStream.pipe(writeStream)
}

function moveCSSToDist (dir) {
  var files = fs.readdirSync(dir)
  files.forEach((file)=> {
    var fullpath = path.join(dir, file)
    var stas = fs.statSync(fullpath)
    if(stas.isDirectory()) {
      moveCSSToDist(fullpath)
    } else if (file.match(/\.css$/)){
      var targetPath = fullpath.replace('src', 'dist/esm')
      console.log('fullpath------', fullpath)
      console.log('targetPath-----', targetPath)
      copy(fullpath, targetPath)
    }
    console.log(file)
  })
}

moveCSSToDist(currentDir + '/src')