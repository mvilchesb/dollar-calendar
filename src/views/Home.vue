<template>
    <div>
        <v-layout wrap row align-center>
            <v-flex xs12>
                <!-- Calendario -->
                <v-date-picker
                    v-model="dateSelected"
                    full-width
                    locale="es"
                    :min="min"
                    :max="max"
                    first-day-of-week="1"
                    @change="getDollar(dateSelected)"
                    color="info"
                ></v-date-picker>

                <!-- Valor del dolar -->
                <v-card color="error" dark v-if="noValue">
                    <v-card-text class="headline text-xs-center">Sin información.</v-card-text>
                </v-card>
                <v-card color="success" dark v-else>
                    <v-card-text
                        class="headline text-xs-center"
                    >Valor del dolar: ${{ dollarValue }} CLP.</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            dateSelected: new Date().toISOString().substr(0, 10),
            max: new Date().toISOString().substr(0, 10),
            min: '1984',
            dollarValue: '',
            day: '',
            month: '',
            year: '',
            noValue: null
        }
    },

    methods: {
        ...mapMutations(['showLoading', 'hideLoading']),

        async getDollar(date) {
            this.noValue = false
            const arrayDate = date.split(['-'])
            this.day = arrayDate[2]
            this.month = arrayDate[1]
            this.year = arrayDate[0]

            try {
                this.showLoading({ title: 'Accediendo a información' })
                const url = `https://mindicador.cl/api/dolar/${this.day}-${this.month}-${this.year}`
                let data = await axios.get(url)

                if (data.data.serie.length > 0) {
                    this.dollarValue = data.data.serie[0].valor
                } else {
                    this.noValue = true
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.hideLoading()
            }
        }
    },

    created() {
        this.getDollar(this.dateSelected)
    }
}
</script>
