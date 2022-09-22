export const state = () => ({
  timeTables: null,
  courseCodes: null,
  currentTimeTable: null,
  isGenerating: false
})

export const getters = {
  getTimeTables (state) {
    return state.timeTables
  },
  getCurrentTimeTable (state) {
    return state.currentTimeTable
  },
  getCourseCodes (state) {
    return state.courseCodes
  },
  getIsGenerating (state) {
    return state.isGenerating
  }
}

export const mutations = {
  // eslint-disable-next-line space-before-function-paren
  addTimeTables (state, payload) {
    state.timeTables = payload
  },
  addCourseCodes (state, payload) {
    state.courseCodes = [...payload]
  },
  updateCurrentTimeTable (state, payload) {
    if (state.timeTables && state.timeTables.length > 0) {
      state.currentTimeTable = state.timeTables[payload]

      // if (payload === 0) {
      //   state.currentTimeTable = state.timeTables[0]
      // } else {
      //   state.currentTimeTable = state.timeTables.find(timeTable => timeTable.id === payload)
      // }
    }
  },
  reset (state) {
    state.timeTables = null
    state.courseCodes = null
    state.currentTimeTable = null
  },
  toggleIsGenerating (state, payload) {
    state.isGenerating = payload
  }
}

export const actions = {

}
