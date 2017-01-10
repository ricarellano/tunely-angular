angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);

AlbumsShowController.$inject = ['$http', '$routeParams'];

function AlbumsShowController ($http, $routeParams) {
  var vm = this;
  vm.newSong = {};
    var albumId = $routeParams.id;

  $http({
    method: 'GET',
    url: '/api/albums/'+$routeParams.id
  }).then(function successCallback(json) {
    // console.log(json);
    vm.album = json.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createSong =function (){
    $http({
      method:'POST',
      url: '/api/albums/'+ $routeParams.id + '/songs',
      data: vm.newSong
    }).then(function successCallback(response){
      console.log('response create book', response);
       vm.album.songs.push(response.data);
    }, function errorCallback(error){
      console.log('There was an error getting the data', error);
    });
  }

 vm.updateSong = function (song){
   $http({
     method: 'PUT',
     url: '/api/albums/'+ albumId + '/songs/' + song._id,
     data: song
   }).then(function successCallback(updateSong){

    console.log(updateSong);
   }, function errorCallback(response){
     console.log('There was an error deleting the data', response);
   });
 }


  vm.deleteSong = function (song) {
    $http({
      method: 'DELETE',
      url: '/api/albums/'+ albumId + '/songs/' + song._id
    }).then(function successCallback(json) {
      console.log(json);
       var index = vm.album.songs.indexOf(song);
       vm.album.songs.splice(index,1)
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  }

}
