<template>
<div>
    <v-card class="center elevation-5">
        <v-form v-model="valid">
            <v-text-field v-model="username" :counter="16" label="Username" required></v-text-field>
            <v-text-field v-model="password" type="password" :counter="64" label="Password" required></v-text-field>
            <v-btn @click="login()" color="blue">Login</v-btn>
        </v-form>
    </v-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            username: "",
            password: ""
        }
    },
    mounted() {
        let token = localStorage.getItem("token")
        if (token != null)
        {
            this.$router.push("/admin/unconfirmed-benchmarks")
        }
    },
    methods: {
        login() {
            if (this.valid) {
                fetch(this.$api + "/api/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                }).then(result => result.json()).then(json => {
                    let valid = json.token != null
                    this.$notify({
                        group: 'notifications',
                        type: valid ? 'success' : 'error',
                        title: valid ? 'Success' : 'Error',
                        text: valid ? 'You are now logged in!' : json.message
                    })

                    if (valid) {
                        localStorage.setItem("token", json.token)
                        setTimeout(() => this.$router.push("/admin/unconfirmed-benchmarks"), 3000)
                    }
                }).catch(() => {
                    this.$notify({
                        group: 'notifications',
                        type: 'error',
                        title: 'Error',
                        text: 'An error has occurred !'
                    })
                })
            }
        }
    }
}
</script>

<style scoped>
.center {
    padding: 2%;
    margin: auto;
    margin-top: 5%;
    margin-bottom: 5%;
    width: 30%;
}
</style>