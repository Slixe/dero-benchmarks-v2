<template>
<v-card id="benchmarks" dark :loading="loading" elevation="5">
    <v-card-title class="top">
        <span>AstroBWT</span>
        <v-text-field class="search" v-model="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table dark height="100%" :search="search" multi-sort :headers="headers" :items="benchmarks" :items-per-page="10"> <!-- TODO fix overflow -->
        <template v-slot:item.timestamp="{ item }">
            <span>{{ new Date(item.timestamp).toLocaleDateString() }}</span>
        </template>
    </v-data-table>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            search: "",
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
        fetch(this.$api + "/api/benchmarks").then(result => result.json()).then(json => {
            if (!json) {
                this.$notify({
                    group: 'notifications',
                    type: 'error',
                    title: 'Error',
                    text: 'Cannot retrieve benchmarks from api!'
                })
            }
            this.benchmarks = json
            this.loading = false
        }).catch(() => {
            this.$notify({
                group: 'notifications',
                type: 'error',
                title: 'Error',
                text: 'Cannot retrieve benchmarks from api!'
            })
        })
    }
}
</script>

<style scoped>
.search {
    margin-left: auto;
    max-width: 250px;
}

@media (max-width: 600px) {
    .top {
        display: flex;
        flex-direction: column;
    }

    .search {
        width: 100%;
        max-width: 100%;
    }
}
</style>