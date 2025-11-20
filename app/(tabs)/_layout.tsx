import * as Font from 'expo-font';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

await Font.loadAsync({
    'Default-Font-Bold': require('assets/fonts/SpoqaHanSansNeo-Bold.otf'),
    'Default-Font-Light': require('assets/fonts/SpoqaHanSansNeo-Light.otf'),
    'Default-Font-Medium': require('assets/fonts/SpoqaHanSansNeo-Medium.otf'),
    'Default-Font': require('assets/fonts/SpoqaHanSansNeo-Regular.otf'),
    'Default-Font-Thin': require('assets/fonts/SpoqaHanSansNeo-Thin.otf'),
    })

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
