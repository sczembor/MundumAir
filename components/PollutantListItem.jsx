import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper'

const styles = StyleSheet.create({
  rootContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: 'bold',
  },
  valueText: {
    fontSize: 30,
    lineHeight: 35,
    marginLeft: 15,
  }
});

const PollutantListItem = ({
  name,
  value,
  ...props
}) => (
  <View {...props} style={[styles.rootContainer, props.style]}>
    <Paragraph style={styles.nameText}>
      {name}:
    </Paragraph>
    <Paragraph style={styles.valueText}>
      {value}
    </Paragraph>
  </View>
)

export { PollutantListItem }
