Vue.component('test-component',{
    data: function() {
        return {
            value: 0
        }
    },
    props: {
        custom: Number
    },
    created: function() {
        this.trip();
    },
    methods: {
        trip: function() {
            this.value = this.custom * 3;
        }
    },
    template:
    '<div> \
        <p>Value: {{value}}, and prop {{custom}}</p>\
    </div>'
});