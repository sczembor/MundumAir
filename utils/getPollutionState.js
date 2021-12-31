import { PollutionState } from '../constants/pollutionStates'

export const getPollutionState = (aqiValue) => {
  if (aqiValue < 0) {
    throw new Error('Aqi value cant be lower than 0')
  } else if (aqiValue <= 50) {
    return PollutionState.GOOD
  } else if (aqiValue <= 100) {
    return PollutionState.MODERATE
  } else if (aqiValue <= 150 ) {
    return PollutionState.UNHEALTHY_SENSITIVE_GROUPS
  } else if (aqiValue <= 200) {
    return PollutionState.UNHEALTHY
  } else if (aqiValue <= 300) {
    return PollutionState.VERY_UNHEALTHY
  } else {
    return PollutionState.HAZARDOUS
  }
}
