import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

interface BatteryCardProps {
  batteryLevel: number; // percentage (0-100)
  range: number; // miles/kilometers
  isCharging: boolean;
  timeRemaining?: string; // only present if charging
}

export default function BatteryCard({ 
  batteryLevel, 
  range, 
  isCharging, 
  timeRemaining 
}: BatteryCardProps) {
  const textColor = useThemeColor({}, 'text');
  const accentColor = useThemeColor({}, 'tint');

  return (
    <View style={[
      styles.container, 
      { 
        borderColor: textColor,
      }
    ]}>
      <View style={styles.header}>
        <MaterialCommunityIcons 
          name={isCharging ? "battery-charging" : "battery"} 
          size={24} 
          color={accentColor} 
        />
        <Text style={[styles.title, { color: textColor }]}>Battery Status</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.percentageContainer}>
          <Text style={[styles.percentage, { color: textColor }]}>
            {batteryLevel}%
          </Text>
          <Text style={[styles.range, { color: textColor }]}>
            {range} km remaining
          </Text>
        </View>

        <View style={[styles.progressBarContainer, { backgroundColor: `${accentColor}30` }]}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                backgroundColor: accentColor,
                width: `${batteryLevel}%` 
              }
            ]} 
          />
        </View>

        {isCharging && (
          <View style={styles.chargingInfo}>
            <MaterialCommunityIcons 
              name="lightning-bolt" 
              size={20} 
              color={accentColor} 
            />
            <Text style={[styles.chargingText, { color: textColor }]}>
              Charging - {timeRemaining} remaining
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 3,
    backgroundColor: "#2A312B",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    gap: 12,
  },
  percentageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  percentage: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  range: {
    fontSize: 14,
    opacity: 0.8,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  chargingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  chargingText: {
    marginLeft: 6,
    fontSize: 14,
  },
});
