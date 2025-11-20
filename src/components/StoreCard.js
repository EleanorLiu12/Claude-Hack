import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StoreCard = ({ routeStop, index, isFirst }) => {
  const { store, reason, tips, estimatedTime, transitTime } = routeStop;

  if (!store) return null;

  return (
    <View style={styles.container}>
      {/* Step Number */}
      <View style={styles.stepContainer}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepNumber}>{index + 1}</Text>
        </View>
        {!isFirst && (
          <View style={styles.transitInfo}>
            <Text style={styles.transitIcon}>🚶‍♂️</Text>
            <Text style={styles.transitText}>{transitTime}</Text>
          </View>
        )}
      </View>

      {/* Store Info */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.storeName}>{store.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {store.rating}</Text>
          </View>
        </View>

        <Text style={styles.address}>{store.address}</Text>

        {/* Why This Store */}
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonLabel}>Why this store:</Text>
          <Text style={styles.reasonText}>{reason || store.bestFor}</Text>
        </View>

        {/* Specialties */}
        <View style={styles.specialtiesContainer}>
          {store.specialties.map((specialty, idx) => (
            <View key={idx} style={styles.specialtyBadge}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{store.priceRange}</Text>
          </View>
        </View>

        {/* Insider Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsLabel}>💡 Insider Tips:</Text>
          {(tips || store.tips).map((tip, idx) => (
            <View key={idx} style={styles.tipItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Time Estimate */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeIcon}>⏱️</Text>
          <Text style={styles.timeText}>
            Spend about {estimatedTime || '30-45 minutes'} here
          </Text>
        </View>

        {/* Hours */}
        <View style={styles.hoursContainer}>
          <Text style={styles.hoursLabel}>Today's Hours:</Text>
          <Text style={styles.hoursText}>
            {getTodayHours(store.hours)}
          </Text>
        </View>

        {/* Bus Routes (if applicable) */}
        {store.busRoutes && store.busRoutes.length > 0 && (
          <View style={styles.busContainer}>
            <Text style={styles.busLabel}>🚌 Bus Routes:</Text>
            <Text style={styles.busText}>{store.busRoutes.join(', ')}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const getTodayHours = (hours) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  return hours[today] || 'Hours not available';
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  stepContainer: {
    backgroundColor: '#3498db',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepBadge: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
  },
  transitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  transitIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  transitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  ratingContainer: {
    backgroundColor: '#f39c12',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  address: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  reasonContainer: {
    backgroundColor: '#ecf0f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  reasonLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  specialtyBadge: {
    backgroundColor: '#3498db',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  specialtyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  priceBadge: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  priceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  tipsContainer: {
    backgroundColor: '#fff9e6',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#f39c12',
    marginBottom: 12,
  },
  tipsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    color: '#f39c12',
    marginRight: 8,
    fontWeight: 'bold',
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#34495e',
    lineHeight: 18,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  timeIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '600',
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  hoursLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#34495e',
    marginRight: 8,
  },
  hoursText: {
    fontSize: 13,
    color: '#2c3e50',
  },
  busContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  busLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1976d2',
    marginRight: 8,
  },
  busText: {
    fontSize: 13,
    color: '#1565c0',
    flex: 1,
  },
});

export default StoreCard;
