<template>
  <v-list id="btnList">
    <v-subheader>
      Total: {{ timeTables ? timeTables.length : 0 }}
    </v-subheader>

    <v-list-item v-for="(timeTable, index) in timeTables" :key="index">
      <v-btn
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
    const timeTables = computed(() => $store.getters.getTimeTables)
    const currentTimeTable = computed(() => $store.getters.getCurrentTimeTable)
    // const currentArrayIndex = ref(0)
    const timeTableIndexClicked = (index, arrayIndex) => {
      // currentArrayIndex.value = arrayIndex
      $store.commit('updateCurrentTimeTable', index)
    }
    // const handleNextTimeTable = (e) => {
    //   if (e.code === 'Tab') {
    //     console.log('test', timeTables.value[currentArrayIndex.value].id)
    //     $store.commit('updateCurrentTimeTable', timeTables.value[currentArrayIndex.value].id)
    //   }
    // }
    // onMounted(() => {
    //   const btnList = document.getElementById('btnList')
    //   btnList.addEventListener('keydown', handleNextTimeTable)
    // })
    // onUnmounted(() => {
    //   const btnList = document.getElementById('btnList')
    //   btnList.removeEventListener('keydown', handleNextTimeTable)
    // })

    return { timeTables, currentTimeTable, timeTableIndexClicked }
  }
}

</script>
