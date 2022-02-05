<template>
<v-card id="calculator" dark>
    <h2 class="bot">Mining Calculator</h2>
    <v-divider style="margin: 20px;"></v-divider>
    <div class="content">
        <div>
            <v-text-field type="number" v-model="hashrate" label="Hashrate (h/s)" required></v-text-field>
            <v-data-table :headers="headers" :items="times" hide-default-footer disable-sort> <!-- TODO fix overflow -->
                <template v-slot:item.dero="{ item }">
                    <span>{{ (rewards * item.value).toFixed(5) }}</span>
                </template>
                <template v-slot:item.btc="{ item }">
                    <span>{{ (rewards * item.value * priceBtc).toFixed(8) }}</span>
                </template>
                <template v-slot:item.usd="{ item }">
                    <span>{{ (rewards * item.value * priceUsd).toFixed(2) }}</span>
                </template>
            </v-data-table>
        </div>
    </div>
</v-card>
</template>

<script>
import { getInfo, loadBlock } from '../utils'

export default {
    data() {
        return {
            headers: [
                {
                    text: "",
                    align: "start",
                    value: "period"
                },
                {
                    text: "DERO",
                    align: "start",
                    value: "dero"
                },
                {
                    text: "BTC",
                    align: "start",
                    value: "btc"
                },
                {
                    text: "USD",
                    align: "start",
                    value: "usd"
                },
            ],
            times: [
                {
                    period: "Daily",
                    value: 3600 * 24
                },
                {
                    period: "Weekly",
                    value: 3600 * 24 * 7
                },
                {
                    period: "Monthly",
                    value: 3600 * 24 * 31
                }
            ],
            hashrate: 0,
            reward: 0,
            difficulty: 0,
            poolFee: 1,
            priceUsd: 0,
            priceBtc: 0
        }
    },
    async mounted() {
        let info = await getInfo()
        let block = await loadBlock(info.top_block_hash)
        let gecko = await fetch("https://api.coingecko.com/api/v3/coins/dero?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false").then(res => res.json())

        this.difficulty = info.difficulty
        this.reward = (block.block_header.reward) / Math.pow(10, 12)
        this.priceUsd = gecko.market_data.current_price.usd
        this.priceBtc = gecko.market_data.current_price.btc
    },
    computed: {
        rewards() {
            return ((this.hashrate * this.reward) / this.difficulty) * (1 - (this.poolFee / 100));
        }
    }
}
</script>

<style scoped>
#calculator {
    padding: 2%;
    width: 100%;
    max-width: 750px;
    margin: auto;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.content div {
    margin: auto;
}

.table {
	width: 100%;
	border: 1px solid #EEEEEE;
}

.table td {
    width: 100px;
}
</style>