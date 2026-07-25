import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1477a8',
        tabBarInactiveTintColor: '#728393',
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 6
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'בית',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          )
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'היסטוריה',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          )
        }}
      />
    </Tabs>
  );
}
