import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

interface DashboardItemProps {
  title: string;
  children: React.ReactNode,
  icon: React.ReactNode
}
export default function DashboardItem({ title, children, icon }: DashboardItemProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={[
      styles.container, 
      { 
        borderColor: textColor,
      }
    ]}>
      <View style={styles.header}>
        {icon}
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      </View>

      <View style={styles.content}>
        {children}
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
});
