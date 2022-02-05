<template>
<v-card id="submit" dark elevation="5">
    <h2 class="bot">Submit new Benchmark</h2>
    <v-divider style="margin: 20px;"></v-divider>
    <v-form class="submit-form" v-model="valid">
        <div class="panels">
            <div>
                <v-text-field class="text-field" v-model="vendor" autocomplete="vendor" label="Vendor" required></v-text-field>
                <v-text-field class="text-field" v-model="model" autocomplete="model" label="Model" required></v-text-field>
                <v-text-field class="text-field" v-model="memory" autocomplete="memory" label="Memory" required></v-text-field>
            </div>
            <div>
                <v-text-field class="text-field" v-model="hashrate" autocomplete="hashrate" label="Hashrate" required></v-text-field>
                <v-text-field class="text-field" v-model="watts" autocomplete="watts" label="Watts" required></v-text-field>
                <v-text-field class="text-field" v-model="miner" autocomplete="miner" label="Miner" required></v-text-field>
            </div>
        </div>
        <v-text-field class="user" v-model="user" autocomplete="user" label="User" equired></v-text-field>
        <v-btn class="btn" @click="submit()">Submit</v-btn>
    </v-form>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            vendor: "",
            model: "",
            memory: "",
            hashrate: "",
            watts: 0,
            miner: "",
            user: "",
            submitted: false,
        }
    },
    methods: {
        submit() {
            if (!this.submitted && this.valid) {
                this.submitted = true
                fetch(this.$api + "/api/submit", {
                    method: "POST",
                    body: JSON.stringify({
                        vendor: this.vendor.toUpperCase(),
                        model: this.model,
                        memory: this.memory,
                        hashrate: this.hashrate,
                        watts: this.watts,
                        minerVersion: this.miner,
                        owner: this.user
                    })
                }).then(result => result.json()).then(json => {
                    this.$notify({
                        group: 'notifications',
                        type: json.success ? 'success' : 'error',
                        title:json.success ? 'Success' : 'Error',
                        text: json.message
                    })

                    if (json.success) {
                        setTimeout(() => this.$router.push("/"), 3000)
                    } else {
                        this.submitted = false
                    }
                }).catch(() => {
                    this.$notify({
                        type: 'error',
                        title: 'An error has occurred !'
                    })
                    this.submitted = false
                })
            }
        }
    }
}
</script>

<style scoped>
.btn {
    width: 120px;
}

#submit {
    max-width: 800px;
    margin: auto;
    padding: 2%;
}

.panels {
    display: flex;
    flex: 1;
    justify-content: space-around;
}

.submit-form {
    padding: 2%;
}

.text-field {
    min-width: 100%;
}

.user {
    width: 25%;
    min-width: 150px;
    margin: auto;
}

.panels div {
    width: 30%;
}

@media (max-width: 600px) {
    .panels {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .panels div {
        width: 100%;
    }

    .user {
        width: auto;
        min-width: 100%;
    }

    #submit {
        height: 100%;
        margin-top: auto;
    }
}

</style>
