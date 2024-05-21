var app = new Vue({
    el: "#app",
    data: {
        listProfiles: [],
        paginationLoaded: false,
        currentPage: 1,
        currentListDisplay: [],
        numOfPaginations: 0,
        maxProfilesPerPage: 10,
        searchField: ""
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
        },
        handleSearchProfiles(e) {
            this.searchField = e.target.value;
            if (this.searchField.trim() === "") {
                this.currentListDisplay = this.listProfiles.slice( (this.currentPage - 1)*this.maxProfilesPerPage, this.currentPage*this.maxProfilesPerPage)
                return;
            }
            let searchList = [];
            let lowerSearchText = this.searchField.toLowerCase();
            for (let i = 0; i < this.listProfiles.length; i++) {
                let currProfile = this.listProfiles[i];
                if (!!currProfile.first_name && currProfile.first_name.toLowerCase().includes(lowerSearchText)) {
                    searchList.push(currProfile);
                    continue;
                }
                if (!!currProfile.last_name && currProfile.last_name.toLowerCase().includes(lowerSearchText)) {
                    searchList.push(currProfile);
                    continue;
                }
                // console.log("currProfile = ", currProfile);
            }
            this.currentListDisplay = searchList;
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