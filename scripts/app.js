angular
    .module('crystalApp',['ngSanitize'])
    .controller('crystalCtrl',function(){
        var vm = this;

        var crystals = window.BDO.crystals;
        vm.effects = [];
        for(var i = 0; i < crystals.length; i++){
            var itemEffects = crystals[i].ItemEffect.split(' & ');
            for(var j = 0; j < itemEffects.length; j++){
                var plusIndex = itemEffects[j].indexOf('+');
                var effect = itemEffects[j].substr(0,plusIndex).trim();
                if(effect!=""&&vm.effects.map(function(e){return e.name}).indexOf(effect)==-1){
                    vm.effects.push({name:effect, value:effect});
                }
            }
            crystals[i].ItemEffect = crystals[i].ItemEffect.replace(/\s\&\s/g, '<br />');
        }
        vm.effects.sort(sortByName);
        vm.effects.unshift({name:"All", value:""});
        vm.crystals = crystals;
        vm.search = {};
        vm.search.ItemEffect = "";

        function sortByName(a,b){
            if (a.name < b.name)
                return -1;
            else if (a.name > b.name)
                return 1;
            else
                return 0;
        }
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
                    var effects = value.ItemEffect.split('<br />');
                    var isGood = false;
                    for(var i = 0;i<effects.length; i++){
                        if(effects[i].toLowerCase().indexOf(compares.ItemEffect.toLowerCase() + " +") == 0){
                            isGood = true;
                        }
                    }
                    return isGood;
                });
            }

            return out;
        }
    })
    .filter('unsafe', function($sce) { return $sce.trustAsHtml; });