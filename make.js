var RSS = require('rss');
var fs = require('fs');
var uuid = require('node-uuid');

var rewritePodcastList = false;

var feedDescriptionFileName = './feed.json';
var episodeListFileName = './episodes.json';
var outputFileName = './feed.xml';

fs.readFile(feedDescriptionFileName, 'utf8', function (err, feedDescriptionFileData) {
  if (err) {
    console.error('Can\'t open feed description json file:');
    console.error(err);
  }
  else {
    fs.readFile(episodeListFileName, 'utf8', function (err, episodeListFileData) {

      if (err) {
        console.error('Can\'t open episode list json file:');
        console.error(err);
      }
      else {
        var feedDescription = JSON.parse(feedDescriptionFileData);
        var episodeList = JSON.parse(episodeListFileData);

        var feed = new RSS(feedDescription);

        episodeList.forEach(function (entry) {
          if (!entry.guid) {
            entry.guid = uuid.v4();
            rewritePodcastList = true;
          }
          feed.item(entry);
        });

        var xml = feed.xml({indent: true});
        fs.writeFile(outputFileName, xml);

        if (rewritePodcastList) {
          fs.writeFile(episodeListFileName, JSON.stringify(episodeList, null, 2));
        }
      }
    });
  }
});