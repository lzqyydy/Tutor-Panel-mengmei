
var axios = require('axios');
var fs = require('fs');

var filecount = 80;
var piccount = 0;

function padToThree(number) {
  if (number<=999) { number = ("00"+number).slice(-3); }
  return number;
}

function tryread(){
  if(fs.existsSync('urls/images'+padToThree(filecount+1)+'.txt')){
    fs.readFile('urls/images'+padToThree(filecount)+'.txt', 'utf8', (err, data) => {
      if (err) throw err;
      data = data.split('\n');
      piccount = 0;
      if (!fs.existsSync('imgs/'+ padToThree(filecount))) {
        fs.mkdirSync('imgs/'+ padToThree(filecount), 0744);
      }
      for (var i=0;i<data.length;i++){
        axios({
          method: 'get',
          url: data[i],
          responseType: 'stream'
        })
        .then(function(response) {
          response.data.pipe(fs.createWriteStream('imgs/'+ padToThree(filecount) + '/' + padToThree(piccount++) + '.jpg'))
        })
        .catch(function(error){
          console.log(error);
        });
      }
    });
    filecount++;
  }
  setTimeout(tryread,50000);
}

tryread();

