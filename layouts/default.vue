<template>
  <v-app>
    <!-- Snackbar for info aft generating timetable -->
    <v-snackbar
      :value="displaySnackBar"
      bottom
      :color="snackBarColor"
      outlined
      app
      text
    >
      {{ snackBarText }}
      <template #action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="displaySnackBar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Top app bar -->
    <v-app-bar
      app
      clipped-left
      clipped-right
    >
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <!-- Course Code Form -->
    <v-navigation-drawer clipped app>
      <v-list>
        <v-subheader class="mb-0 pb-n2">
          OPTIONS
        </v-subheader>
        <v-expansion-panels v-model="panels" tile flat accordion>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Course Codes
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <CourseCodeFormVue @submitCourseCodes="(payload) => handleSubmitCourseCodes(payload)" />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <Filters />
        </v-expansion-panels>

        <v-divider />
      </v-list>
    </v-navigation-drawer>
    <!-- List of Btns to change index of current timetable -->
    <v-navigation-drawer clipped app right>
      <v-list>
        <v-subheader class="mb-n4">
          Possible Timetables
        </v-subheader>
        <TimeTableList />
        <v-divider />
      </v-list>
    </v-navigation-drawer>
    <!-- Middle section of app -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <!-- Footer -->
    <v-footer
      fixed
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import CourseCodeFormVue from '~/components/options/CourseCodeForm.vue'
import TimeTableList from '~/components/timetable/TimetableList.vue'
import Filters from '~/components/options/Filters.vue'
import { useNuxtApp } from '#app'

const { $store } = useNuxtApp()
const title = 'NTU Schedule Maker'
// const scheduleMakerEndpoint = 'http://localhost:5001/ntu-schedule-maker/us-central1/app/generate-timetables'
const scheduleMakerEndpoint = 'https://asia-east2-ntu-schedule-maker.cloudfunctions.net/app/generate-timetables'

const displaySnackBar = ref(false)
const snackBarText = ref('')
const snackBarColor = ref('error')

const panels = [0]

const handleSubmitCourseCodes = async (payload) => {
  displaySnackBar.value = false
  const courseCodes = formatData(payload)
  const response = await fetch(
    scheduleMakerEndpoint,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: courseCodes
    })
  const data = await response.json()
  if (!data.success) {
    switch (data.errorCode) {
      case 0:
        snackBarText.value = `Could not find timetable for ${data.errorInfo} on NTU.`
        snackBarColor.value = 'error'
        displaySnackBar.value = true
    }
  } else if (data.timetables.length === 0) {
    snackBarText.value = 'There are no possible timetable.'
    snackBarColor.value = 'error'
    displaySnackBar.value = true
  } else {
    $store.commit('reset')
    $store.commit('addTimeTables', data.timetables)
    $store.commit('addCourseCodes', payload)
    $store.commit('updateCurrentTimeTable', 0)
    snackBarText.value = `Created ${data.totalCombinations} Timetables. Showing ${data.successfulCombinations} that has no clashes!`
    snackBarColor.value = 'success'
    displaySnackBar.value = true
  }
  $store.commit('toggleIsGenerating', false)
}

const formatData = (courseCodePayload) => {
  const courseCodes = courseCodePayload.map(payload => payload)
  return JSON.stringify(courseCodes)
}
</script>
