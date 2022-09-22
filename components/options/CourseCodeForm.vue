<template>
  <v-form ref="form">
    <v-list-item v-for="(courseCode, index) in courseCodes" :key="index" :name="`${index}`" dense>
      <v-text-field
        outline
        append-icon="mdi-delete"
        :label="`Course ${index+1}`"
        placeholder="Course Code"
        :rules="rules"
        :hint="index == 0 ? 'eg. HA4040': ''"
        persistent-hint
        :value="courseCode"
        @click:append="removeCourseCode(index)"
        @change="(e) => changeCourseCodeVal(e, index)"
      />
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-btn
          :loading="isLoading"
          :disabled="courseCodes.length >= 8"
          @click.prevent="addCourseCode"
        >
          <v-icon>mdi-plus</v-icon>
          Add Course
        </v-btn>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-btn
          :loading="isLoading"
          @click="submitCourseCodes"
        >
          Generate
        </v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-form>
</template>

<script>
// import { useNuxtApp } from '#app'
import { computed } from '#imports'

export default {
  emits: ['submitCourseCodes'],
  setup (props, { emit }) {
    // eslint-disable-next-line no-undef
    const { $store } = useNuxtApp()
    const rules = [v => v.length === 6 || 'Input valid course code']
    const courseCodes = ref(['SC1007', 'CE2005', 'CE2006'])
    const form = ref({})
    const isFormValid = ref(false)
    const isLoading = computed(() => $store.getters.getIsGenerating)
    // const disableAddCourseCode = computed(() => courseCodes.value.length >= 8)
    const addCourseCode = () => {
      if (courseCodes.value.length < 8) {
        courseCodes.value.push('')
      }
    }
    const changeCourseCodeVal = (e, index) => {
      (courseCodes.value)[index] = e
    }
    const removeCourseCode = (index) => {
      courseCodes.value.splice(index, 1)
    }
    const submitCourseCodes = (e) => {
      isFormValid.value = form.value.validate() && courseCodes.value.length > 0
      $store.commit('toggleIsGenerating', true)
      if (isFormValid.value) {
        emit('submitCourseCodes', courseCodes.value)
      } else {
        $store.commit('toggleIsGenerating', false)
      }
    }

    return { rules, courseCodes, form, isFormValid, isLoading, addCourseCode, changeCourseCodeVal, removeCourseCode, submitCourseCodes }
  }
}

</script>
