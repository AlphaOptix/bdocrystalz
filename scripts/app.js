angular
    .module('crystalApp',['ngSanitize'])
    .controller('crystalCtrl',function(){
        var vm = this;

        var crystals = window.BDO.crystals;
        vm.effects = [];
        for(var i = 0; i < crystals.length; i++){
            var effects = crystals[i].effect.split(' & ');
            for(var j = 0; j < effects.length; j++){
                var plusIndex = effects[j].indexOf('+');
                var effect = effects[j].substr(0,plusIndex).trim();
                if(effect!=""&&vm.effects.map(function(e){return e.name}).indexOf(effect)==-1){
                    vm.effects.push({name:effect, value:effect});
                }
            }
            crystals[i].effect = crystals[i].effect.replace(/\s\&\s/g, '<br />');
        }
        vm.effects.sort(sortByName);
        vm.effects.unshift({name:"All", value:""});
        vm.crystals = crystals;
        vm.search = {};
        vm.search.effect = "";

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

            if (compares.socket&&compares.socket != "") {
                out = out.filter(function (value) {
                    return (value.socket == "Any" && compares.socket != "Costume") || value.socket == compares.socket;
                });
            }

            if (compares.grade&&compares.grade != "") {
                out = out.filter(function (value) {
                    return value.grade == compares.grade;
                });
            }

            if (compares.breakChance&&compares.breakChance != "") {
                out = out.filter(function (value) {
                    return value.breakChance == compares.breakChance;
                });
            }

            if (compares.effect&&compares.effect != "") {
                out = out.filter(function (value) {
                    var effects = value.effect.split('<br />');
                    var isGood = false;
                    for(var i = 0;i<effects.length; i++){
                        if(effects[i].toLowerCase().indexOf(compares.effect.toLowerCase() + " +") == 0){
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