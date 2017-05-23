(function() {
     function SongPlayer(Fixtures) {
         
         var SongPlayer = {};
         
         var currentAlbum = Fixtures.getAlbum();
    
         //@desc Buzz object audio file
         //@type {Object}
         var currentBuzzObject = null
         
         
         //@function setSong 
         //@desc Stops currently playing song and loads new audio file as currentBuzzObject
         //@param {Object} song
         var setSong = function(song) {
             if (currentBuzzObject) {
                  stopSong(SongPlayer.currentSong);
             }
             
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });
             
             SongPlayer.currentSong = song;
         };
         
         //@desc activate song object from list of songs
         //@type {Object}
         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
         };
         
         //@desc holds current song number
         //@type {Number}
         SongPlayer.currentSong = null;
         
         //@function playSong
         //@desc plays current song and sets song.playing to true
         //@param {Object} song
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
               
         };
         
         //@function stopSong
         //@desc stops current song and sets song.playing to null
         //@param {Object} song
         var stopSong = function(song) {
              currentBuzzObject.stop();
              song.playing = null;
         };
         
         //@function SongPlayer.play
         //@desc play current song if paused, or selected song
         //@param {Object} song
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);
             } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
             }
         };
         
         //@function SongPlayer.pause
         //@desc Pauses current song
         //@param {Object}
         SongPlayer.pause = function(song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };
         
         //@function SongPlayer.previous
         //@desc Plays previous song
         //@param {Object} 
         SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
             
            if (currentSongIndex < 0) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
                }
         };
         
         //@function SongPlayer.next
         //@desc skips to next song
         //@param {Object} 
         SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                playSong(song);
            }
         };
         
         return SongPlayer;
     }
     
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();