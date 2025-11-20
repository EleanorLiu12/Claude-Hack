import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import StoreCard from './StoreCard';

const RouteDisplay = ({ recommendations, onStartOver }) => {
  if (!recommendations || !recommendations.route) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No route available</Text>
      </View>
    );
  }

  const { route, totalEstimatedTime, overallStrategy, warnings, summary } = recommendations;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Thrift Route</Text>
        <TouchableOpacity style={styles.startOverButton} onPress={onStartOver}>
          <Text style={styles.startOverText}>← Start Over</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryIcon}>📍</Text>
            <Text style={styles.summaryValue}>{route.length}</Text>
            <Text style={styles.summaryLabel}>Stores</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryIcon}>⏱️</Text>
            <Text style={styles.summaryValue}>{totalEstimatedTime}</Text>
            <Text style={styles.summaryLabel}>Total Time</Text>
          </View>
          {summary && summary.estimatedCost && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryIcon}>💰</Text>
              <Text style={styles.summaryValue}>{summary.estimatedCost}</Text>
              <Text style={styles.summaryLabel}>Budget</Text>
            </View>
          )}
        </View>

        {/* Strategy Overview */}
        {overallStrategy && (
          <View style={styles.strategyContainer}>
            <Text style={styles.strategyLabel}>🎯 Strategy:</Text>
            <Text style={styles.strategyText}>{overallStrategy}</Text>
          </View>
        )}

        {/* Best Time to Go */}
        {summary && summary.bestTimeToGo && (
          <View style={styles.bestTimeContainer}>
            <Text style={styles.bestTimeLabel}>⏰ Best Time:</Text>
            <Text style={styles.bestTimeText}>{summary.bestTimeToGo}</Text>
          </View>
        )}

        {/* Warnings */}
        {warnings && warnings.length > 0 && (
          <View style={styles.warningsContainer}>
            {warnings.map((warning, idx) => (
              <View key={idx} style={styles.warningItem}>
                <Text style={styles.warningIcon}>⚠️</Text>
                <Text style={styles.warningText}>{warning}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Route Stops */}
      <View style={styles.routeContainer}>
        <Text style={styles.routeTitle}>Your Route ({route.length} stops)</Text>
        {route.map((routeStop, index) => (
          <StoreCard
            key={index}
            routeStop={routeStop}
            index={index}
            isFirst={index === 0}
          />
        ))}
      </View>

      {/* Footer Tips */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Pro Tips for Thrifting:</Text>
        <View style={styles.footerTip}>
          <Text style={styles.footerBullet}>•</Text>
          <Text style={styles.footerText}>
            Bring cash - many thrift stores prefer it
          </Text>
        </View>
        <View style={styles.footerTip}>
          <Text style={styles.footerBullet}>•</Text>
          <Text style={styles.footerText}>
            Wear easy-to-change clothes for trying things on
          </Text>
        </View>
        <View style={styles.footerTip}>
          <Text style={styles.footerBullet}>•</Text>
          <Text style={styles.footerText}>
            Don't be afraid to dig - best finds are often hidden
          </Text>
        </View>
        <View style={styles.footerTip}>
          <Text style={styles.footerBullet}>•</Text>
          <Text style={styles.footerText}>
            Check for damage before buying
          </Text>
        </View>
      </View>

      {/* Start Over Button (Bottom) */}
      <TouchableOpacity
        style={styles.startOverButtonBottom}
        onPress={onStartOver}
      >
        <Text style={styles.startOverButtonText}>Plan Another Route</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  startOverButton: {
    padding: 8,
  },
  startOverText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  strategyContainer: {
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  strategyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27ae60',
    marginBottom: 6,
  },
  strategyText: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
  bestTimeContainer: {
    backgroundColor: '#fff3e0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  bestTimeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f39c12',
    marginBottom: 4,
  },
  bestTimeText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  warningsContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  warningIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: '#c0392b',
    lineHeight: 18,
  },
  routeContainer: {
    padding: 16,
  },
  routeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  footer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  footerTip: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  footerBullet: {
    color: '#3498db',
    marginRight: 8,
    fontWeight: 'bold',
  },
  footerText: {
    flex: 1,
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  startOverButtonBottom: {
    backgroundColor: '#3498db',
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 32,
  },
  startOverButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
  },
});

export default RouteDisplay;
