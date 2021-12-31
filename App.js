import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Headline, Paragraph, TextInput, TouchableRipple } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import useSWR from 'swr';
import { StatusBar } from 'expo-status-bar';

import { AQIProgressChart } from './components/AQIProgressChart';
import { fetcher } from './api/fetcher';
import { getCityFeedUlr, getGeolocalizedFeedUrl } from './api/endpoints';
import { getCityName } from './utils/getCityName';
import { PollutantListItem } from './components/PollutantListItem';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: '#012a4a',
    display: 'flex',
    flexDirection: 'column',

  },
  headerRipple: {
    backgroundColor: '#89c2d9',
    borderRadius: 15,
  },
  header: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 50,
  },
  locationContainer: {
    width: '90%'
  },
  locationInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
  },
  locationNameTextInput: {
    width: '90%',
    height: 40,
  },
  cityName: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25,
    lineHeight: 35,
    marginLeft: 10,
    flexWrap: 'wrap',
  },
  pollutantsTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    lineHeight: 35,
    marginLeft: 10,
    flexWrap: 'wrap',
  },
  chartContainer: {
    flex: 5,
    marginVertical: 25,
    backgroundColor: '#013a63',
    padding: 10,
    borderRadius: 15,
  },
  pollutionListContainer: {
    flex: 0.75,
    backgroundColor: '#',
    padding: 25,
    borderRadius: 15,
  },
  pollutionList: {
    display: 'flex',
    flexDirection: 'column',
  },
  pollutionListItem: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
});

export default function App() {
  const [isLocationEditEnabled, setLocationEditEnabled] = useState(false)
  const [customNameInputValue, setCustomNameInputValue] = useState('')
  const [nameToSearch, setNameToSearch] = useState('')

  const { data: geolocalizedData, error: geolocalizedError } = useSWR(nameToSearch ? null : getGeolocalizedFeedUrl(), fetcher)
  const { data: cityFeedData, error: cityFeedError } = useSWR(nameToSearch ? getCityFeedUlr(nameToSearch) : null, fetcher)
  const pollutions = geolocalizedData?.data || cityFeedData?.data

  const handleSaveButton = () => {
    setNameToSearch(customNameInputValue)
    setLocationEditEnabled(false)
  }

  return (
    <>
      <ScrollView style={styles.rootContainer}>
        {pollutions && (
          <>
            <TouchableRipple
              onPress={() => setLocationEditEnabled((prevValue) => !prevValue)}
              style={styles.headerRipple}
            >
              <View style={styles.header}>
                <Ionicons name="location-sharp" size={30} color="black" />
                <View style={styles.locationContainer}>
                  {isLocationEditEnabled ? (
                    <View style={styles.locationInputContainer}>
                      <TextInput
                        style={styles.locationNameTextInput}
                        value={customNameInputValue}
                        onChangeText={(text) => setCustomNameInputValue(text)}
                      />
                      <Button onPress={handleSaveButton} color="white">
                        Save
                      </Button>
                    </View>
                  ) : (
                    <Headline style={styles.cityName}>
                      {nameToSearch || getCityName(pollutions.city)}
                    </Headline>
                  )}
                </View>
              </View>
            </TouchableRipple>
            {geolocalizedError || cityFeedError ? (
              <Paragraph>
                No data found for given city.
              </Paragraph>
            ) : (
              <>
                <View style={styles.chartContainer}>
                  <AQIProgressChart value={pollutions.aqi} />
                </View>
                <View style={styles.pollutionListContainer}>
                   <Headline style={styles.pollutantsTitle}>
                    Pollutants contributing to aqi
                  </Headline>
                  <View style={styles.pollutionList}>
                    {pollutions.iaqi?.pm25 && (
                      <PollutantListItem
                        name="PM2.5"
                        value={pollutions.iaqi?.pm25.v}
                        style={styles.pollutionListItem}
                      />
                    )}
                    {pollutions.iaqi?.pm10 && (
                      <PollutantListItem
                        name="PM10"
                        value={pollutions.iaqi?.pm10.v}
                        style={styles.pollutionListItem}
                      />
                    )}
                  </View>
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </>
  );
}
