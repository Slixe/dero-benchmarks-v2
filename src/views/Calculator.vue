<template>
<v-card id="calculator" dark>
    <h2 class="bot">Mining Calculator</h2>
    <v-divider style="margin: 20px;"></v-divider>
    <div class="content">
        <div>
            <div class="hash">
                <v-text-field type="number" v-model="hashrate" label="Hashrate" required></v-text-field>
                <v-select :items="formats" @change="onFormatChange" class="format" v-model="format" required></v-select>
            </div>
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
    <v-divider style="margin: 20px;"></v-divider>
    <div class="infos">
        <span>Network hashrate: {{ netHash(this.difficulty) }}</span>
        <span>Block Reward: {{ this.reward }} DERO</span>
        <span>Block Time: {{ this.targetBlockTime }}s</span>
    </div>
</v-card>
</template>

<script>
import { getInfo } from '../utils'

export default {
    data() {
        return {
            format: "H/s",
            formats: ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s'],
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
            targetBlockTime: 18,
            difficulty: 0,
            poolFee: 0,
            priceUsd: 0,
            priceBtc: 0
        }
    },
    mounted() {
        let format = localStorage.getItem('hashFormat');
        if (format != null) {
            this.format = format;
        }
        this.updateInfo();
    },
    computed: {
        rewards() {
            return ((this.formatHashrate(this.hashrate) * this.reward) / (this.difficulty + parseInt(this.hashrate))) * (1 - (this.poolFee / 100)) / this.targetBlockTime;
        }
    },
    methods: {                                                                                                                                                                                                                                                                                                                                                                              
        async updateInfo() {
            let info = await getInfo()
            let gecko = await fetch("https://api.coingecko.com/api/v3/coins/dero?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false").then(res => res.json())

            this.difficulty = info.difficulty;
            this.reward = 0.6150; // hardcoded current block reward
            this.targetBlockTime = info.target;
            this.priceUsd = gecko.market_data.current_price.usd;
            this.priceBtc = gecko.market_data.current_price.btc;

            setInterval(() => {
                this.updateInfo();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            }, 18);                                                                                                                                                                 
        },
        onFormatChange(e) {
            localStorage.setItem('hashFormat', e);
        },
        formatHashrate(hashrate) {
            let i = 1;
            for (let f of this.formats) {
                if (this.format == f) {
                    break;
                }
                i *= 1000;
            }
            return hashrate * i;
        },
        netHash(diff) {
            let i = 0
            while (i < this.formats.length && diff > 1000) {
                diff /= 1000;
                i += 1;
            }
            return diff.toFixed(2) + " " + this.formats[i];
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

.hash {
    display: flex;
}

.format {
    max-width: 80px;
    min-width: 45px;
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

.infos {
    display: flex;
    flex-direction: column;
}
</style>