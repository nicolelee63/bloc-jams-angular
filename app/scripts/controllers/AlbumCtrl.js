(function() {
    function AlbumCtrl() {
        this.albumData.push(angular.copy(albumPicasso));
    }
 
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();