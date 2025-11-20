import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { STORE_CATEGORIES } from '../data/stores';
import { getCurrentDay } from '../utils/routeOptimizer';

const InputForm = ({ onSubmit }) => {
  const [category, setCategory] = useState('anything');
  const [timeAvailable, setTimeAvailable] = useState('half_day');
  const [transportation, setTransportation] = useState('bus');
  const [startLocation, setStartLocation] = useState('campus');

  const handleSubmit = () => {
    const preferences = {
      category,
      timeAvailable,
      transportation,
      startLocation,
      dayOfWeek: getCurrentDay()
    };
    onSubmit(preferences);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Plan Your Thrift Adventure</Text>
      <Text style={styles.subtitle}>Let's find the perfect stores for you!</Text>

      {/* Category Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>What are you looking for?</Text>
        <View style={styles.optionsGrid}>
          <OptionButton
            label="Vintage Fashion"
            icon="👗"
            selected={category === STORE_CATEGORIES.VINTAGE}
            onPress={() => setCategory(STORE_CATEGORIES.VINTAGE)}
          />
          <OptionButton
            label="Clothing"
            icon="👕"
            selected={category === STORE_CATEGORIES.CLOTHING}
            onPress={() => setCategory(STORE_CATEGORIES.CLOTHING)}
          />
          <OptionButton
            label="Furniture"
            icon="🛋️"
            selected={category === STORE_CATEGORIES.FURNITURE}
            onPress={() => setCategory(STORE_CATEGORIES.FURNITURE)}
          />
          <OptionButton
            label="Books"
            icon="📚"
            selected={category === STORE_CATEGORIES.BOOKS}
            onPress={() => setCategory(STORE_CATEGORIES.BOOKS)}
          />
          <OptionButton
            label="Anything!"
            icon="🎯"
            selected={category === 'anything'}
            onPress={() => setCategory('anything')}
          />
        </View>
      </View>

      {/* Time Available */}
      <View style={styles.section}>
        <Text style={styles.label}>How much time do you have?</Text>
        <View style={styles.optionsGrid}>
          <OptionButton
            label="Quick Trip"
            subtitle="1-2 hours"
            selected={timeAvailable === 'quick'}
            onPress={() => setTimeAvailable('quick')}
          />
          <OptionButton
            label="Half Day"
            subtitle="3-4 hours"
            selected={timeAvailable === 'half_day'}
            onPress={() => setTimeAvailable('half_day')}
          />
          <OptionButton
            label="Full Day"
            subtitle="5+ hours"
            selected={timeAvailable === 'full_day'}
            onPress={() => setTimeAvailable('full_day')}
          />
        </View>
      </View>

      {/* Transportation */}
      <View style={styles.section}>
        <Text style={styles.label}>How are you getting around?</Text>
        <View style={styles.optionsGrid}>
          <OptionButton
            label="Walking"
            icon="🚶"
            selected={transportation === 'walking'}
            onPress={() => setTransportation('walking')}
          />
          <OptionButton
            label="Bus"
            icon="🚌"
            selected={transportation === 'bus'}
            onPress={() => setTransportation('bus')}
          />
          <OptionButton
            label="Car"
            icon="🚗"
            selected={transportation === 'car'}
            onPress={() => setTransportation('car')}
          />
        </View>
      </View>

      {/* Starting Location */}
      <View style={styles.section}>
        <Text style={styles.label}>Where are you starting from?</Text>
        <View style={styles.optionsGrid}>
          <OptionButton
            label="Campus"
            selected={startLocation === 'campus'}
            onPress={() => setStartLocation('campus')}
          />
          <OptionButton
            label="Downtown"
            selected={startLocation === 'downtown'}
            onPress={() => setStartLocation('downtown')}
          />
          <OptionButton
            label="Near West"
            selected={startLocation === 'near_west'}
            onPress={() => setStartLocation('near_west')}
          />
          <OptionButton
            label="East Side"
            selected={startLocation === 'east_side'}
            onPress={() => setStartLocation('east_side')}
          />
          <OptionButton
            label="West Side"
            selected={startLocation === 'west_side'}
            onPress={() => setStartLocation('west_side')}
          />
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Find My Route!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const OptionButton = ({ label, subtitle, icon, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.optionButton, selected && styles.optionButtonSelected]}
    onPress={onPress}
  >
    {icon && <Text style={styles.optionIcon}>{icon}</Text>}
    <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
      {label}
    </Text>
    {subtitle && (
      <Text style={[styles.optionSubtitle, selected && styles.optionSubtitleSelected]}>
        {subtitle}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 24,
  },
  section: {
    marginBottom: 28,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionButtonSelected: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
  },
  optionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  optionLabelSelected: {
    color: '#fff',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
    textAlign: 'center',
  },
  optionSubtitleSelected: {
    color: '#ecf0f1',
  },
  submitButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InputForm;
