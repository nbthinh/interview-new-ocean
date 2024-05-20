var app = new Vue({
    el: "#list-profiles-container",
    data: {
        listProfiles: []
    },
    methods: {
        async getListProfiles() {
            const apiUrl = "https://6a0e6368-50f5-471a-94d8-c334dd6b4d38.mock.pstmn.io/users?interview=true&vue=true&codeonline=true&location=nois"
            const data = await fetch(apiUrl);
            console.log("data = ", data);
            if (data && !!data.ok) {
                return data.json()
            }
            else {
                return []
            }
        }
    },
    async created() {
        let data = await this.getListProfiles();
        this.listProfiles = data;
        console.log("this.listProfiles = ", this.listProfiles);
    },
    mounted() {
        console.log("mounted");
    }
})