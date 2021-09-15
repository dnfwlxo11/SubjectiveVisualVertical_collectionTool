<template>
    <div class="graph mb-5" style="border: 1px solid">
        <apexchart ref="chart" type="line" height="350" :options="chartOptions" :series="series" />
        <div class="row">
            <div class="col text-left ml-5"><strong>Right</strong></div>
            <div class="col"><strong>Tilt Angle</strong></div>
            <div class="col text-right mr-4"><strong>Left</strong></div>
        </div>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
    name: 'graph',
    props: {
        chartData: {
            type: Array,
            default() {
                return []
            }
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
                    name: 'value',
                    data: []
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
                    text: '주관적시수직 Subjective Visual Vertical',
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
                    categories: [-60, -45, -30, -15, 0, 15, 30, 45, 60]
                },
                yaxis: {
                    tickAmount: 8,
                    min: -40,
                    max: 40,
                    title: {
                        text: 'SVV Angle Deviation'
                    },
                },
                crosshairs: {
                    show: true
                }
            }
        }
    },
    methods: {
        
    },
    created() {
        
    },
    mounted() {
        this.series[0].data = this.chartData
    },
    watch: {
        chartData(val) {
            console.log(val)
            this.$refs.chart.updateSeries([{
                data: val
            }])
        }
    }
}
</script>

<style>

</style>