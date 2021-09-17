<template>
    <div ref="parentWidth" class="graph mb-5" style="border: 1px solid;">
        <apexchart ref="graph" type="line" :options="chartOptions" :series="series" />
        <div class="row">
            <div class="col text-left ml-5"><strong>Right</strong></div>
            <div class="col text-center"><strong>Tilt Angle</strong></div>
            <div class="col text-right mr-5"><strong>Left</strong></div>
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
        },
        clientWidth: {
            type: Number,
            default: 0
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
            },
            grapSvgURI: null
        }
    },
    methods: {
        getSvgURI() {
            return this.$refs.graph.dataURI()
        }
    },
    created() {
        
    },
    mounted() {
        this.series[0].data = this.chartData
    },
    computed: {
    },
    watch: {
        chartData(val) {
            this.$refs.graph.updateSeries([{
                data: val
            }])
        }
    }
}
</script>

<style>

</style>