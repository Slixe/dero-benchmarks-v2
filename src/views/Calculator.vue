<template>
<v-card id="calculator" dark>
    <v-card-title>
        <span>Mining Reward Calculator</span>
    </v-card-title>
    <div class="content">
        <div>
            <v-text-field type="number" v-model="hashrate" label="Hashrate (h/s)" required></v-text-field>
            <table class="table">
                <tr>
                    <th></th>
                    <th>DERO</th>
                    <th>USD</th>
                    <th>BTC</th>
                </tr>
                <tr>
                    <td><strong>Daily</strong></td>
                    <td>{{ (rewards * 3600 * 24).toFixed(5) }}</td>
                    <td>{{ (rewards * 3600 * 24 * this.priceUsd).toFixed(5) }}</td>
                    <td>{{ (rewards * 3600 * 24 * this.priceBtc).toFixed(8) }}</td>
                </tr>
                <tr>
                    <td><strong>Weekly</strong></td>
                    <td>{{ (rewards * 3600 * 24 * 7).toFixed(5) }}</td>
                    <td>{{ (rewards * 3600 * 24 * 7 * this.priceUsd).toFixed(5) }}</td> 
                    <td>{{ (rewards * 3600 * 24 * 7 * this.priceBtc).toFixed(8) }}</td>
                </tr>
                <tr>
                    <td><strong>Monthly</strong></td>
                    <td>{{ (rewards * 3600 * 24 * 31).toFixed(5) }}</td>
                    <td>{{ (rewards * 3600 * 24 * 31 * this.priceUsd).toFixed(5) }}</td>
                    <td>{{ (rewards * 3600 * 24 * 31 * this.priceBtc).toFixed(8) }}</td>
                </tr>
            </table>
        </div>
    </div>
</v-card>
</template>

<script>
import { getInfo, loadBlock } from '../utils'

export default {
    data() {
        return {
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