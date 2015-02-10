var Podcast = require('podcast');
var fs = require('fs');

fs.readFile('./webmaker.json', 'utf8', function (err, feedFileData) {
  fs.readFile('./podcasts.json', 'utf8', function (err, listFileData) {

    var feedOptions = JSON.parse(feedFileData);
    var podcastList = JSON.parse(listFileData);

    var feed = new Podcast(feedOptions);

    podcastList.forEach(function (entry) {
      feed.item(entry);
    });

    var xml = feed.xml();
    // fs.writeFile('./feed.xml', xml);
  });
});