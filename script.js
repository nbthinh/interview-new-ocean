var app = new Vue({
    el: "#app",
    data: {
        listProfiles: [],
        paginationLoaded: false,
        currentPage: 1,
        currentListDisplay: [],
        numOfPaginations: 0,
        maxProfilesPerPage: 10
    },
    methods: {
        async getListProfiles() {
            const apiUrl = "https://ms-handson.azurewebsites.net/api/frontend/triggers/When_a_HTTP_request_is_received/invoke/users?api-version=2022-05-01&sp=/triggers/When_a_HTTP_request_is_received/run&sv=1.0&sig=gybnal1FlnemchB72aclaRMeO6Ed5UJOSp2ySwaQ-fM";
            const data = await fetch(
                apiUrl
            );
            console.log("checker data = ", data);
            if (data && !!data.ok) {
                return data.json()
            }
            else {
                return []
            }
        },
        isCurrentPage(page) {
            if (page == this.currentPage) return "active";
            else return ""
        },
        handleChangePage(page) {
            this.currentPage = page;
            this.currentListDisplay = this.listProfiles.slice( (page - 1)*this.maxProfilesPerPage, page*this.maxProfilesPerPage)
        }
    },
    computed: {
        getEachProfileWidth() {
            return screen.width;
        }
    },
    async created() {
        let data = await this.getListProfiles();
        this.listProfiles = data;
        if (this.listProfiles.length > 0) {
            this.currentListDisplay = this.listProfiles.slice(0, this.maxProfilesPerPage);
            this.numOfPaginations = Math.ceil(this.listProfiles.length/this.maxProfilesPerPage);
            this.paginationLoaded = true;
        }
    },
    mounted() {
        console.log("mounted");
    }
})