Vue.component('new-name-form', {
    data: function() {
        return {
            name: '',
            saying: ''
        }
    },
    methods: {
        postName: function() {
            let data = {
                name: this.name,
                saying: this.saying
            };
            axios.post('./add-name', data)
                .then(res => alert("Name and saying added"))
                .catch(error => {if (error) alert("Error adding name")});
        }
    },
    template: 
    '<form> \
        <input class="form-control" type="text" placeholder="Name" v-model="name"> \
        <br> \
        <input class="form-control" type="text" placeholder="Saying" v-model="saying"> \
        <br> \
        <button type="submit" @click.prevent="postName" class="btn btn-success">Submit</button> \
    </form>'
});