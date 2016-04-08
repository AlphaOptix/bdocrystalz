/**
 * Created by bwilhite on 4/7/16.
 */
angular
    .module('crystalApp',['ngSanitize'])
    .controller('crystalCtrl',function($sce){
        var vm = this;

        var crystals = window.BDO.crystals;
        for(var i = 0; i < crystals.length; i++){
            crystals[i].ItemEffect = $sce.trustAsHtml(crystals[i].ItemEffect.replace(/\s\&\s/g, '<br />'));
        }
        vm.crystals = crystals;
    });