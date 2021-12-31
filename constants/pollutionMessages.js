import { PollutionState } from './pollutionStates'

export const POLLUTION_MESSAGES = {
  [PollutionState.GOOD]: "Air quality is considered satisfactory, and air pollution poses little or no risk",
  [PollutionState.MODERATE]: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution",
  [PollutionState.UNHEALTHY_SENSITIVE_GROUPS]: "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
  [PollutionState.UNHEALTHY]: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects",
  [PollutionState.VERY_UNHEALTHY]: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
  [PollutionState.HAZARDOUS]: "Health alert: everyone may experience more serious health effects"
}
