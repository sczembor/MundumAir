import { PollutionState } from './pollutionStates'

export const POLLUTION_COLORS = {
  [PollutionState.GOOD]: "green",
  [PollutionState.MODERATE]: "yellow",
  [PollutionState.UNHEALTHY_SENSITIVE_GROUPS]: "orange",
  [PollutionState.UNHEALTHY]: "red",
  [PollutionState.VERY_UNHEALTHY]: "purple",
  [PollutionState.HAZARDOUS]: "#800020"
}
