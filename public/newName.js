Vue.component('new-name-form', {
    // data: function() {
    //     return {
    //         name: '',
    //         saying: ''
    //     }
    // },
    methods: {
        postName: function() {
            let data = {
                // name: this.name,
                // saying: this.saying
                name: this.$refs.name.value,
                saying: this.$refs.saying.value
            };
            if (data.name && data.saying) {
                let self = this;
                axios.post('./add-name', data)
                    .then(res => {
                        self.$emit('new-name', data.name);
                    })
                    .catch(error => {if (error) alert("Error adding name")});
            }
        }
    },
    template: 
    '<form> \
        <input class="form-control" type="text" placeholder="Name"  ref="name"> \
        <br> \
        <input class="form-control" type="text" placeholder="Saying"  ref="saying"> \
        <br> \
        <button type="submit" @click.prevent="postName" class="btn btn-success">Submit</button> \
    </form>'
});