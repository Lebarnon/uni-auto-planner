<template>
  <div v-if="timeTable">
    <v-calendar
      class="mt-4"
      :weekdays="[1, 2, 3, 4, 5, 6]"
      :type="'week'"
      first-time="08:00"
      interval-count="16"
      :now="startDate"
      :start="startDate"
      :events="events"
      @click:event="showEvent"
    />
    <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
    >
      <v-card
        color="grey lighten-4"
        min-width="350px"
        flat
      >
        <v-toolbar
          :color="selectedEvent.color"
          dark
        >
          <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text v-if="selectedEvent.details">
          Index: {{ selectedEvent.details.index }} <br>
          Type: {{ selectedEvent.details.type }} <br>
          Time: {{ selectedEvent.details.time }} <br>
          Weeks: {{ selectedEvent.details.weeks }}
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="secondary"
            @click="selectedOpen = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
// import { computed } from '#imports'

export default {
  props: {
    timeTable: {
      type: Object,
      default: () => {}
    },
    courseCodes: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const startDate = '2021-12-20'
    const dateDict = {
      MON: '2021-12-20',
      TUE: '2021-12-21',
      WED: '2021-12-22',
      THU: '2021-12-23',
      FRI: '2021-12-24',
      SAT: '2021-12-25'
    }
    const timeDict = {
      0: '08:00',
      1: '08:30',
      2: '09:00',
      3: '09:30',
      4: '10:00',
      5: '10:30',
      6: '11:00',
      7: '11:30',
      8: '12:00',
      9: '12:30',
      10: '13:00',
      11: '13:30',
      12: '14:00',
      13: '14:30',
      14: '15:00',
      15: '15:30',
      16: '16:00',
      17: '16:30',
      18: '17:00',
      19: '17:30',
      20: '18:00',
      21: '18:30',
      22: '19:00',
      23: '19:30',
      24: '20:00',
      25: '20:30',
      26: '21:00',
      27: '21:30',
      28: '22:00',
      29: '22:30',
      30: '23:00',
      31: '23:30'
    }
    const colors = ['blue lighten-1', ' brown lighten-1', 'deep-purple lighten-1',
      'light-green lighten-1', 'light-green lighten-1', 'orange lighten-1',
      'grey darken-1', 'yellow lighten-1', 'indigo lighten-1', 'blue-grey lighten-1']

    // eslint-disable-next-line no-undef
    const events = computed(() => {
      if (props.timeTable.length === 0) {
        return []
      }
      const events = []
      for (let i = 0; i < props.courseCodes.length; i++) {
        const currentCourseCode = props.courseCodes[i]
        const courseIndexTimeTable = (props.timeTable.data)[i]
        const numOfLessons = courseIndexTimeTable.day.length

        for (let j = 0; j < numOfLessons; j++) {
          const date = dateDict[courseIndexTimeTable.day[j]]
          const timeArray = courseIndexTimeTable.time[j]
          // console.log(`${timeArray}`, timeArray)

          const startTime = timeDict[timeArray[0]]
          // console.log(`${startTime}`, startTime)

          const timeArrayLength = timeArray.length
          const endTime = timeDict[timeArray[timeArrayLength - 1] + 1].slice(0, 3).concat('20')
          const event = {
            name: `${currentCourseCode} | ${courseIndexTimeTable.index}`,
            start: `${date} ${startTime}`,
            end: `${date} ${endTime}`,
            color: `${colors[i]}`,
            details: {
              courseCode: currentCourseCode,
              index: courseIndexTimeTable.index,
              type: courseIndexTimeTable.type[j],
              time: `${startTime} - ${endTime}`,
              weeks: parseWkToReadableWk(courseIndexTimeTable.remarks[j])
            }
          }
          events.push(event)
        }
      }
      return events
    })

    const parseWkToReadableWk = (weekArray) => {
      let result = ''
      for (let i = 0; i < weekArray.length - 1; i++) {
        if (weekArray[i] + 1 === weekArray[i + 1]) {
          if (result.slice(-1) === '-') {
            continue
          } else if (result.slice(-1) === ',') {
            result += `${weekArray[i]}`
          } else {
            if (i === 0) {
              result += weekArray[0]
            }
            result += '-'
          }
        } else {
          result += `${weekArray[i]}, `
        }
      }
      result += weekArray[weekArray.length - 1]
      return result
    }

    // show more details calendar
    const selectedEvent = ref({})
    const selectedElement = ref(null)
    const selectedOpen = ref(false)

    const showEvent = ({ nativeEvent, event }) => {
      const open = () => {
        selectedEvent.value = event
        selectedElement.value = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => { selectedOpen.value = true }))
        console.log(selectedEvent.value)
      }

      if (selectedOpen) {
        selectedOpen.value = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    }
    return { startDate, events, selectedEvent, selectedElement, selectedOpen, showEvent }
  }

}

</script>

<style>
.v-calendar-daily_head-day-label{
  display: none;
}
.v-calendar-daily__scroll-area{
  overflow-y: auto;
}
</style>
