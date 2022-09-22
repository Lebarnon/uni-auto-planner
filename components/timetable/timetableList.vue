<template>
  <v-list id="btnList">
    <v-subheader>
      Total: {{ timeTables ? timeTables.length : 0 }}
    </v-subheader>

    <v-list-item v-for="(timeTable, index) in timeTables" :key="index" :style="{display: freeDayFilterFunc(timeTable) ? 'block' : 'none'}">
      <v-btn
        v-if="freeDayFilterFunc(timeTable)"
        :disabled="timeTable.id === currentTimeTable.id"
        @click.prevent="timeTableIndexClicked(timeTable.id, index)"
      >
        Timetable {{ index + 1 }}
      </v-btn>
    </v-list-item>
  </v-list>
</template>

<script>
// import { useNuxtApp } from '#app'
import { computed } from '#imports'

export default {
  setup () {
    // eslint-disable-next-line no-undef
    const { $store } = useNuxtApp()
    const timeTables = computed(() => {
      const timetables = $store.getters.getTimeTables
      if (timetables) {
        return timetables.slice(0, 99)
        // const filteredTimeTables = timetables.filter(timeTable => freeDayFilterFunc(timeTable))
        // return filteredTimeTables
      }
    })
    const currentTimeTable = computed(() => $store.getters.getCurrentTimeTable)
    const filters = computed(() => {
      return {
        mon: $store.getters['filter/getFreeDay']('MON'),
        tue: $store.getters['filter/getFreeDay']('TUE'),
        wed: $store.getters['filter/getFreeDay']('WED'),
        thu: $store.getters['filter/getFreeDay']('THU'),
        fri: $store.getters['filter/getFreeDay']('FRI'),
        sat: $store.getters['filter/getFreeDay']('SAT')
      }
    })
    // const currentArrayIndex = ref(0)
    const timeTableIndexClicked = (index, arrayIndex) => {
      // currentArrayIndex.value = arrayIndex
      $store.commit('updateCurrentTimeTable', arrayIndex)
    }
    const freeDayFilterFunc = (timetable) => {
      const freeDays = timetable.freeDays
      // Check if any filters are true
      const filterArr = []
      const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      days.forEach((day) => {
        const key = day.toLowerCase()
        if (filters.value[key]) {
          filterArr.push(day)
        }
      })
      // no filters
      if (filterArr.length === 0) {
        return true
      }
      for (let i = 0; i < filterArr.length; i++) {
        if (freeDays.includes(filterArr[i])) {
          continue
        } else {
          return false
        }
      }
      return true
    }
    return { timeTables, currentTimeTable, filters, timeTableIndexClicked, freeDayFilterFunc }
  }
}
</script>
