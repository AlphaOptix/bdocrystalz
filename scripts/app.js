/**
 * Created by bwilhite on 4/7/16.
 */
angular
    .module('crystalApp',['ngSanitize'])
    .controller('crystalCtrl',function(){
        var vm = this;

        var crystals = window.BDO.crystals;
        for(var i = 0; i < crystals.length; i++){
            crystals[i].ItemEffect = crystals[i].ItemEffect.replace(/\s\&\s/g, '<br />');
        }
        vm.crystals = crystals;
        vm.search = {};
    })
    .filter('crystal', function(){
        return function(input, compares) {
            var out = input;

            if (compares.Slot&&compares.Slot != "") {
                out = out.filter(function (value) {
                    return (value.Slot == "Any" && compares.Slot != "Costume") || value.Slot == compares.Slot;
                });
            }

            if (compares.Rarity&&compares.Rarity != "") {
                out = out.filter(function (value) {
                    return value.Rarity == compares.Rarity;
                });
            }

            if (compares.BreakChance&&compares.BreakChance != "") {
                out = out.filter(function (value) {
                    return value.BreakChance == compares.BreakChance;
                });
            }

            if (compares.ItemEffect&&compares.ItemEffect != "") {
                out = out.filter(function (value) {
                    return value.ItemEffect.toLowerCase().indexOf(compares.ItemEffect.toLowerCase()) != -1;
                });
            }

            return out;
        }
    })
    .filter('unsafe', function($sce) { return $sce.trustAsHtml; });