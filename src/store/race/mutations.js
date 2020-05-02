import { SET_RACE_LIST, ADD_RACE } from '../mutation-types'

export default {
  [SET_RACE_LIST] (state, races) {
    state.races = races
  },
  [ADD_RACE] (state, race) {
    state.races.push(race)
  }
}
