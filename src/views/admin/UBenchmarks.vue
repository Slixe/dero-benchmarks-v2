<template>
<div id="ubenchmarks">
    <v-card dark class="bench elevation-5" :loading="loading">
        <v-card-title>
            <span>Unconfirmed Benchmarks</span>
            <v-spacer></v-spacer>
            <v-text-field class="search" v-model="search" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table v-model="selected" show-select :search="search" multi-sort :headers="headers" :items="benchmarks" :items-per-page="5">
            <template v-slot:item.timestamp="{ item }">
                <span>{{ new Date(item.timestamp).toLocaleDateString() }}</span>
            </template>
            <template v-slot:item.hashrate="{ item }">
                <span>{{ utils.fromHash(item.hashrate) }}</span>
            </template>
        </v-data-table>
        <div class="buttons">
            <v-btn @click="update(false)" color="red">Delete</v-btn>
            <v-btn @click="update(true)" color="green">Confirm</v-btn>
        </div>
    </v-card>
</div>
</template>

<script>
import * as utils from '../../utils'

export default {
    data() {
        return {
            utils,
            loading: true,
            search: "",
            selected: [],
            headers: [
                {
                    text: "Vendor",
                    align: "start",
                    value: "vendor"
                },
                {
                    text: "Model",
                    value: "model"
                },
                {
                    text: "Memory",
                    value: "memory"
                },
                {
                    text: "Hashrate (h/s)",
                    value: "hashrate"
                },
                {
                    text: "Watts (w)",
                    value: "watts"
                },
                {
                    text: "Miner",
                    value: "minerVersion"
                },
                {
                    text: "Submitted On",
                    value: "timestamp",
                    class: "Date"
                },
                {
                    text: "User",
                    value: "owner"
                }
            ],
            benchmarks: []
        }
    },
    mounted() {
        let token = localStorage.getItem("token")
        if (token == null)
        {
            this.$router.push("/admin/login")
            return
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + token)
        fetch(this.$api + "/api/unconfirmedBenchmarks", { headers: headers }).then(result => result.json()).then(json => {
            this.benchmarks = json
            this.loading = false
        })
    },
    methods: {
        update(confirm) {
            let headers = new Headers();
            let token = localStorage.getItem("token")
            headers.append("Authorization", "Bearer " + token)
            let localSelected = this.selected
            for (let bench of localSelected)
            {
                fetch(this.$api + "/api/" + (confirm ? "confirm" : "delete"), {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                        benchID: bench.id
                    })
                }).then(result => result.json()).then(json => {
                    this.$notify({
                        group: 'notifications',
                        type: json.success ? 'success' : 'error',
                        title:json.success ? 'Success' : 'Error',
                        text: json.message
                    })
                    setTimeout(() => this.alerts.shift(), 5000)
                    if (json.success) {
                        let index = this.benchmarks.findIndex(x => x.id == bench.id)
                        this.benchmarks.splice(index, 1)
                        this.selected.shift()
                    }
                })
            }
        }
    }
}
</script>
<style scoped>
.bench {
    margin: 10%;
    margin-top: 5%;
    margin-bottom: 2%;
    padding: 2%;
}
.buttons {
    display: flex;
    justify-content: space-evenly;
}
</style>