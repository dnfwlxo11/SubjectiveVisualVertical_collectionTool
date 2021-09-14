<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header justify-content-end">
                        <div class="col-10 text-left">
                            <strong>Data. {{data.pid}}</strong>&nbsp;(uid: {{data.uid}})&nbsp;그래프
                        </div>
                        <div class="col-2 text-right">
                            <a href="javascript:;" class="btn btn-sm" @click="$emit('on-close')">
                                <i class="mdi mdi-close"></i>
                            </a>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="text-center pb-3">
                            <apexchart type="scatter" height="350" :options="chartOptions" :series="chart.ac.series">
                            </apexchart>
                            <apexchart type="scatter" height="350" :options="chartOptions" :series="chart.bc.series">
                            </apexchart>
                        </div>
                    </div>
                    <div class="modal-footer d-block">
                        <div class="row">
                            <div class="col-md-4 ml-auto mr-auto">
                                <button type="button" class="btn btn-sm btn-block text-success"
                                    @click="$emit('on-confirm')">
                                    <i class="mdi mdi-check"></i> 확인
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'

    export default {
        name: 'ptaModal',
        props: ['data'],
        components: {
            apexchart: VueApexCharts,
        },
        data() {
            return {
                isRender: false,

                chart: {
                    ac: {
                        series: [{
                            name: "Pta Ac",
                            data: []
                        }]
                    },

                    bc: {
                        series: [{
                            name: "Pta Bc",
                            data: []
                        }]
                    }
                },

                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: true,
                    },
                    title: {
                        text: 'Pta 그래프',
                        align: 'left'
                    },
                    grid: {
                        xaxis: {
                            lines: {
                                show: true
                            }
                        }
                    },
                    axisTicks: {
                        show: true,
                        borderType: 'solid'
                    },
                    xaxis: {
                        categories: [0, 125, 250, 500, 1000, 1500, 2000, 4000, 6000, 8000, 12000],
                        title: {
                            text: 'Frequency in Hz'
                        }
                    },
                    yaxis: {
                        reversed: true,
                        tickAmount: 11,
                        min: -10,
                        max: 100,
                        title: {
                            text: 'Hearing level (dB)'
                        },
                    },
                    crosshairs: {
                        show: true
                    }
                },
            }
        },
        methods: {
            setAc() {
                const data = {
                    125: null,
                    250: null,
                    500: null,
                    1000: null,
                    1500: null,
                    2000: null,
                    4000: null,
                    6000: null,
                    8000: null,
                    12000: null
                }

                Object.keys(this.data).reduce((acc, item) => {
                    if (item.includes('pta_ac')) data[parseInt(item.split('_')[2])] = this.data[item]

                    return acc
                }, true)

                this.chart['ac']['series'][0].data = Object.values(data)
            },

            setBc() {
                const data = {
                    125: null,
                    250: null,
                    500: null,
                    1000: null,
                    1500: null,
                    2000: null,
                    4000: null,
                    6000: null,
                    8000: null,
                    'etc': null
                }

                Object.keys(this.data).reduce((acc, item) => {
                    if (item.includes('pta_bc')) data[parseInt(item.split('_')[2])] = this.data[item]

                    return acc
                }, true)

                this.chart['bc']['series'][0].data = Object.values(data)
            },

            init() {
                this.setAc()
                this.setBc()
                this.isRender = true
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang="scss" scoped>
    .modal-container {
        max-width: 480px;
        margin-top: 100px;
    }
</style>