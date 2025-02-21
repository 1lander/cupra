import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardItem from '../ui/DashboardItem';
import { useThemeColor } from '@/hooks/useThemeColor';

interface VehicleStatsCardProps {
  model: string;
  year: number;
  odometer: number;
  vin: string;
}

export default function VehicleStatsCard({ model, year, odometer, vin }: VehicleStatsCardProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <DashboardItem 
      title="Vehicle Info"
      icon={<MaterialCommunityIcons name="car" size={24} color={textColor} />}
    >
      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: textColor }]}>Model:</Text>
        <Text style={[styles.value, { color: textColor }]}>{year} {model}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: textColor }]}>Odometer:</Text>
        <Text style={[styles.value, { color: textColor }]}>
          {odometer.toLocaleString()} km
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: textColor }]}>VIN:</Text>
        <Text style={[styles.value, { color: textColor }]}>{vin}</Text>
      </View>
    </DashboardItem>
  );
}

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
  },
});
