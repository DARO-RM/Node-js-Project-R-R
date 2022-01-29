var fs = require('fs');
var glob = require('glob');

exports.storelanguage = ()=>{
  var languageF = {};
  glob.sync( './language/*.json' ).forEach( function( file ) {
    //home
    let dash = file.split("/"); //read file
    if(dash.length == 3) {
      let dot = dash[2].split(".");
      if(dot.length == 2) {
        let lang = dot[0];
        fs.readFile(file, function(err, data) {
          languageF[lang] = JSON.parse(data.toString());
        });
      }
    }
  });  
  return languageF;
}

