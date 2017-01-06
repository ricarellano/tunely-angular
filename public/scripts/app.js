/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);
  // ^ the first argument is a string naming the controller,
  // the second argument is a function that defines the capacities
  // of the controller.
  AlbumsIndexController.$inject = ['$http'];




function AlbumsIndexController ($http) {
  var vm = this;
  vm.newAlbum = {};

  vm.newAlbum = {
      name: 'Viva Hate',
      artistName: 'Morrissey'
  };

  $http({
    method: 'GET',
    url:'/api/albums'
  }).then(function successCallback(response) {
    console.log("success!");
    vm.albums = response.data;
    console.log(response);


  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });


vm.createAlbum = function () {
  $http({
    method: 'POST',
    url: '/api/albums',
    data: vm.newAlbum
  }).then(function successCallback(response) {
    vm.albums.push(response.data);
     console.log(response.data);
    // what is the structure of this repsonse?
    // how do we add the response data to our albums array?
  }, function errorCallback(response) {
    console.log('There was an error posting the data', response);
  });
}

}
