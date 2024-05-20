var app = new Vue({
    el: "#list-profiles-container",
    data: {

        helloworld: "15000 VND"
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
            // return new Promise((resolve, reject) => {
            //     console.log("Hello world resolve = ",  resolve);
            //     resolve(data);
            // })
        }
    },
    async created() {
        let data = await this.getListProfiles();
        console.log("data = ", data);
        // console.log("data.json() = ", await data.json());
    },
    mounted() {
        console.log("mounted");
    }
})