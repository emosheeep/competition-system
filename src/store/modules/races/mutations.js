import { SET_RACE_LIST, ADD_RACE, UPDATE_RACE, DELETE_RACE } from '../../types'

export default {
  [SET_RACE_LIST] (state, races) {
    state.races = races
  },
  [ADD_RACE] (state, race) {
    state.races.push(race)
  },
  [UPDATE_RACE] (state, race) {
    state.races = state.races.map(item => {
      return item._id === race._id ? race : item
    })
  },
  [DELETE_RACE] (state, data) {
    state.races = state.races.filter(item => !data.includes(item._id))
  },
}
