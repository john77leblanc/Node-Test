Vue.component('names-list', {
    props: {
        names: Array
    },
    // created: function() {
    //     this.request_names();
    // },
    // methods: {
    //     request_names: function() {
    //         let self = this;
    //         let req = {
    //             params: {
    //                 apiKey: "abc123"
    //             }
    //         };
    //         axios.get('./names', req)
    //             .then(res => self.names = res.data);
    //     }
    // },
    template:
    '<div> \
        <b>List of names available</b> \
        <br> \
        <span class="mr-3" v-for="name in names">{{name}}</span> \
        <test-component :custom="3"></test-component>\
    </div>'
});