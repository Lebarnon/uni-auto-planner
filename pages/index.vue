<template>
  <div>
    <v-row justify="center" align="center">
      <v-col v-if="!timeTable" cols="12">
        <v-card>
          <v-card-title class="headline">
            Welcome to the NTU Schedule Generator
          </v-card-title>
          <v-card-text>
            <p>This program hopes to alleviate the pain of planning your timetable by generating all possible timetables for you!</p>
            <p>
              &lt;-- input all of the course codes on the left
            </p>
            <p>
              Click Generate to get all the possible timetables!
            </p>
            <p>
              Find a bug? Report it on the github <a
                href="https://github.com/vuetifyjs/vuetify/issues"
                target="_blank"
                rel="noopener noreferrer"
                title="contribute"
              >
                issue board
              </a>.
            </p>
            <p>Thank you for using NTU Schedule Generator and hope that it will help you!.</p>
            <div class="text-xs-right">
              <em><small>&mdash; Lenson Lim</small></em>
            </div>
            <hr class="my-3">
          </v-card-text>
          <v-card-actions>
          <!-- <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/calender-view"
          >
            Continue
          </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-else cols="12">
        <SingleCalendarView :course-codes="courseCodes" :time-table="timeTable" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SingleCalendarView from '~/components/timetable/single.vue'
import { useNuxtApp } from '#app'
import { computed } from '#imports'

export default {
  components: {
    SingleCalendarView
  },
  setup () {
    const { $store } = useNuxtApp()
    const timeTable = computed(() => $store.getters.getCurrentTimeTable)
    const courseCodes = computed(() => $store.getters.getCourseCodes)
    return { timeTable, courseCodes }
  }
}
// eslint-disable-next-line no-undef
</script>
