<template>
    <div class="filter-controls">
        <ul>
            <li 
                v-for="(filterPlace, index) in filterPlaces" 
                class="filter-control"
                :class="{selected: filterPlace.check}"
                :key="filterPlace.id"
            >
                <b-tooltip 
                    :label=filterPlace.tooltipText
                    type="is-dark"
                    animated
                    position="is-bottom"
                >
                    <span @click="checkFilter(index)" class="filter-control-span">
                        {{ filterPlace.name }}
                        <i v-if="filterPlace.isLoading" class="fa fa-spinner fa-spin" />
                        <i v-if="filterPlace.check" class="far fa-times-circle" />
                    </span>
                </b-tooltip>

            </li>
        </ul>

    </div>
</template>


<script>
export default {
    name: 'SearchFilterPlace',
    data() {
        return {
            timeDelay: 0,
            filterPlaces: [
                {
                    id: 1,
                    name: 'saved',
                    check: false,
                    isLoading: false,
                    tooltipText: 'Click to see saved places'
                },
                {
                    id: 2,
                    name: 'checkin',
                    check: false,
                    isLoading: false,
                    tooltipText: 'Click to see checkin places'
                },
                {
                    id: 3,
                    name: 'not visited',
                    check: false,
                    isLoading: false,
                    tooltipText: 'Click to see not visited places'
                },
            ],
        };
    },
    methods: {
        checkFilter(index) {
            let filterPlaces = this.filterPlaces[index];

            if (filterPlaces.check === false) {
                filterPlaces.isLoading = true;
                setTimeout(function () {
                    filterPlaces.isLoading = false;
                    filterPlaces.check = !filterPlaces.check;
                }, 300);
            } else {
                filterPlaces.check = !filterPlaces.check;
                filterPlaces.isLoading = true;
                setTimeout(function () {
                    filterPlaces.isLoading = false;

                }, 300);
            }
        }
    },
    computed: {},

};

</script>

<style lang="scss" scoped>

    .filter-controls {
        background: #f8f8f8;
        padding: 5px 15px;

        ul {
            display: inline-block;
            list-style: none;
            margin: 0;
            padding: 0;

            li {
                float: left;
                margin: 5px 4px 5px 0;
                position: relative;
                border: 1px solid #eee;

                &:hover .filter-control-span{
                    border-color: #bbb;
                }

                &.selected .filter-control-span {
                    background-color: #fff;
                    border-color: #bbb;
                    padding: 4px 8px;
                }

                .filter-control-span {
                    border-radius: 2px;
                    background: #f3f3f3;
                    border: solid 1px #dcdcdc;
                    color: #6e6e6e;
                    cursor: pointer;
                    display: inline-block;
                    font-size: 14px;
                    font-weight: bold;
                    margin: 0;
                    padding: 4px 8px;
                    position: relative;
                    text-decoration: none;
                    text-shadow: 0 1px 0 #fff;
                    vertical-align: middle;

                }
            }
        }
    }
</style>