var app = new Vue({
    el: "#app",
    data: {
        listProfiles: [],
        paginationLoaded: false,
        currentPage: 1,
        currentListDisplay: [],
        numOfPaginations: 0
    },
    methods: {
        async getListProfiles() {
            const apiUrl = "https://6a0e6368-50f5-471a-94d8-c334dd6b4d38.mock.pstmn.io/users?interview=true&vue=true&codeonline=true&location=nois"
            const data = await fetch(apiUrl);
            // console.log("data = ", data);
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
            this.currentListDisplay = this.listProfiles.slice( (page - 1)*10, page*10)
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
            this.currentListDisplay = this.listProfiles.slice(0, 10);
            console.log("this.listProfiles = ", Math.ceil(this.listProfiles.length/10));
            this.numOfPaginations = Math.ceil(this.listProfiles.length/10);
            this.paginationLoaded = true;
        }
    },
    mounted() {
        console.log("mounted");
    }
})