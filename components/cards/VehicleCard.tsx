import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardItem from '../ui/DashboardItem';
import { useThemeColor } from '@/hooks/useThemeColor';

interface VehicleCardProps {
  model: string;
  year: number;
  odometer: number;
  vin: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

export default function VehicleCard({ model, year, odometer, vin, location }: VehicleCardProps) {
  const textColor = useThemeColor({}, 'text');
  const linkColor = useThemeColor({}, 'tint');

  const openDirections = () => {
    if (!location) return;
    
    const { latitude, longitude } = location;
    const scheme = Platform.select({
      ios: 'maps:',
      android: 'geo:',
    });
    const url = Platform.select({
      ios: `${scheme}${latitude},${longitude}`,
      android: `${scheme}${latitude},${longitude}?q=${latitude},${longitude}`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

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

      {location && (
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: textColor }]}>Location:</Text>
          <TouchableOpacity onPress={openDirections}>
            <Text style={[styles.value, styles.link, { color: linkColor }]}>
              {location.address || 'Open in Maps'}
              <MaterialCommunityIcons name="map-marker" size={16} color={linkColor} />
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
  link: {
    textDecorationLine: 'underline',
  },
});
