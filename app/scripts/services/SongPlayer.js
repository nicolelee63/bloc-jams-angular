(function() {
     function SongPlayer(Fixtures) {
        var SongPlayer = {};
         
        var currentAlbum = Fixtures.getAlbum();
         
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
         
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
         
        SongPlayer.currentSong = null;
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function playSong
        * @desc plays song
        * @param none
        */
        var playSong = function(){
            currentBuzzObject.play();
            song.playing=true;
        }
        
        /**
        * @function pauseSong
        * @desc pauses song
        * @param {Object} song
        **/
        var pauseSong = function(song){
            currentBuzzObject.pause();
            song.playing = false;
        }
        
    
        /**
        * @function stopSong
        * @desc stops song
        * @param none
        */
        var stopSong = function(){
            currentBuzzObject.stop();
            song.playing=null;
        }
        
        SongPlayer.currentSong = null;
        SongPlayer.currentTime = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            SongPlayer.currentSong = song;
        };
         
    SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
            setSong(song);
            playSong();
        } else if(SongPlayer.currentSong === song) {
            if (currentBuzzObject.isPaused()) {
                currentBuzzObject.play();
            }
        }
    }; 
    
    SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        pauseSong(song);
    };
    
    SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;
        
        if (currentSongIndex < 0) {
            stopSong();
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
    };
    
    SongPlayer.next = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;
        
        if (currentSongIndex > Object.keys(currentAlbum).length) {
            stopSong();
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
         .factory('SongPlayer', ['Fixtures',SongPlayer]);
 })();