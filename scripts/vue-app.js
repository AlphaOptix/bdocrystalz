new Vue({
    el: '#app',
    data: {
        crystals: BDO.crystals
    },
    methods: {
        splitEffects: function (effects) {
            return effects.replace(/,/g,'<br />');
        }
    }
});