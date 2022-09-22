export const state = () => ({
  monFree: false,
  tueFree: false,
  wedFree: false,
  thuFree: false,
  friFree: false,
  satFree: false
})

export const getters = {
  getFreeDay: state => (payload) => {
    const day = payload
    switch (day) {
      case 'MON':
        return state.monFree
      case 'TUE':
        return state.tueFree
      case 'WED':
        return state.wedFree
      case 'THU':
        return state.thuFree
      case 'FRI':
        return state.friFree
      case 'SAT':
        return state.satFree
    }
    return state.freeDays
  }

}

export const mutations = {
  // eslint-disable-next-line space-before-function-paren
  editFreeDay (state, payload) {
    const day = payload[0]
    const value = payload[1]
    switch (day) {
      case 'MON':
        state.monFree = value
        break
      case 'TUE':
        state.tueFree = value
        break
      case 'WED':
        state.wedFree = value
        break
      case 'THU':
        state.thuFree = value
        break
      case 'FRI':
        state.friFree = value
        break
      case 'SAT':
        state.satFree = value
        break
    }
  },
  resetFilter (state) {
    state.monFree = false
    state.tueFree = false
    state.wedFree = false
    state.thuFree = false
    state.friFree = false
    state.satFree = false
  }
}

export const actions = {

}
