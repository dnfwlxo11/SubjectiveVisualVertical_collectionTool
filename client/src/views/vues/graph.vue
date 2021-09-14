<template>
    <div class="graph">
        <apexchart type="line" height="350" :options="chartOptions" :series="series" />
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
    name: 'graph',
    props: {
        data: {
            type: Object,
            default: {}
        }
    },
    components: {
        apexchart: VueApexCharts
    },
    data() {
        return {
            dataNodes: null,
            series: [
                {
                    name: 'graph',
                    data: [1,2,3,4,5,6,7,8,9]
                }
            ],
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
            }
        }
    },
    methods: {
        getData() {
            this.data
        }
    },
    mounted() {
        console.log(this.data.data)
        // this.getData()
    }
}
</script>

<style>

</style>