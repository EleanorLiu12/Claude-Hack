import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import InputForm from './src/components/InputForm';
import RouteDisplay from './src/components/RouteDisplay';
import { optimizeRoute } from './src/utils/routeOptimizer';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (preferences) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Generating route with preferences:', preferences);
      const route = await optimizeRoute(preferences);
      console.log('Route generated:', route);
      setRecommendations(route);
    } catch (err) {
      console.error('Error generating route:', err);
      setError('Failed to generate route. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setRecommendations(null);
    setError(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>
            Finding the best thrift stores for you...
          </Text>
          <Text style={styles.loadingSubtext}>
            Claude is analyzing Madison's thrift scene
          </Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleStartOver}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : recommendations ? (
        <RouteDisplay
          recommendations={recommendations}
          onStartOver={handleStartOver}
        />
      ) : (
        <InputForm onSubmit={handleFormSubmit} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
