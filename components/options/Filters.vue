/* eslint-disable vue/valid-v-model */
<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      Filters
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-subheader class="mb-0 pb-n2">
        Free Days
      </v-subheader>
      <v-checkbox
        v-model="monFreeFilter"
        :label="days[0]"
        dense
      />
      <v-checkbox
        v-model="tueFreeFilter"
        :label="days[1]"
        dense
      />
      <v-checkbox
        v-model="wedFreeFilter"
        :label="days[2]"
        dense
      />
      <v-checkbox
        v-model="thuFreeFilter"
        :label="days[3]"
        dense
      />
      <v-checkbox
        v-model="friFreeFilter"
        :label="days[4]"
        dense
      />
      <v-checkbox
        v-model="satFreeFilter"
        :label="days[5]"
        dense
      />
      <v-btn
        @click="handleFilterReset"
      >
        Reset
      </v-btn>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
// import { useNuxtApp } from '#app'
import { computed } from '#imports'

export default {
  setup () {
    // eslint-disable-next-line no-undef
    const { $store } = useNuxtApp()
    // const monFreeFilter = computed(() => $store.getters['filter/getFreeDay']('MON'))
    const monFreeFilter = computed({
      get: () => $store.getters['filter/getFreeDay']('MON'),
      set: value => $store.commit('filter/editFreeDay', ['MON', value])
    })
    const tueFreeFilter = computed({
      get: () => $store.getters['filter/getFreeDay']('TUE'),
      set: value => $store.commit('filter/editFreeDay', ['TUE', value])
    })
    const wedFreeFilter = computed({
      get: () => $store.getters['filter/getFreeDay']('WED'),
      set: value => $store.commit('filter/editFreeDay', ['WED', value])
    })
    const thuFreeFilter = computed({
      get: () => $store.getters['filter/getFreeDay']('THU'),
      set: value => $store.commit('filter/editFreeDay', ['THU', value])
    })
    const friFreeFilter = computed({
      get: () => $store.getters['filter/getFreeDay']('FRI'),
      set: value => $store.commit('filter/editFreeDay', ['FRI', value])
    })
    const satFreeFilter = computed({
      get: () => $store.getters['filter/getFreeDay']('SAT'),
      set: value => $store.commit('filter/editFreeDay', ['SAT', value])
    })

    const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

    const handleFilterReset = () => {
      $store.commit('filter/resetFilter')
    }

    return { monFreeFilter, tueFreeFilter, wedFreeFilter, thuFreeFilter, friFreeFilter, satFreeFilter, days, handleFilterReset }
  }
}

</script>
