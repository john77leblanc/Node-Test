Vue.component('names-list', {
    data: function() {
        return {
            names: [],
        }
    },
    created: function() {
        this.request_names();
    },
    methods: {
        request_names: function() {
            let self = this;
            axios.get('./names')
                .then(res => self.names = res.data);
        }
    },
    template:
    '<div> \
        <b>List of names available</b> \
        <br> \
        <span class="mr-3" v-for="name in names">{{name}}</span> \
        <test-component :custom="3"></test-component>\
    </div>'
});