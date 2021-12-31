import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Paragraph, Snackbar, TouchableRipple } from 'react-native-paper';
import { ProgressCircle } from 'react-native-svg-charts';

import { getPollutionState } from '../utils/getPollutionState'
import { POLLUTION_MESSAGES } from '../constants/pollutionMessages'
import { POLLUTION_COLORS } from '../constants/pollutionColors'

const styles = StyleSheet.create({
  rootContainer: {
    height: '90%',
  }, 
  chart: {
    height: '100%',
  },
  valueContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 50,
    lineHeight: 60,
    color: 'white',
  },
  statusText: {
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    flexWrap: 'wrap',
    color: 'white',
  }
});

const AQIProgressChart = ({
  value = 0,
  ...props
}) => {
  const pollutionState = getPollutionState(value)
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  return (
    <View style={[styles.rootContainer, props.style]} {...props}>
      <View style={styles.valueContainer}>
        <Paragraph style={styles.valueText}>
          AQI: {value}
        </Paragraph>
      </View>
      <ProgressCircle
        style={styles.chart}
        progress={value / 500}
        progressColor={POLLUTION_COLORS[pollutionState]}
        endAngle={Math.PI * 4}
        backgroundColor='#89c2d9'

        startAngle={Math.PI}
        strokeWidth={30}
      />
      <Paragraph
        style={styles.statusText}
        onPress={() => {
          setSnackbarVisible(true)
          setSnackbarMessage(POLLUTION_MESSAGES[pollutionState])
        }}   
      >
        {pollutionState}
      </Paragraph>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  )
}

export { AQIProgressChart }
