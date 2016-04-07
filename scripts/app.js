/**
 * Created by bwilhite on 4/7/16.
 */
angular
    .module('crystalApp',[])
    .controller('crystalCtrl',function(){
        var vm = this;

        vm.crystals = window.BDO.crystals;
    });