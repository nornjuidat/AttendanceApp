import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#1477a8',
        drawerInactiveTintColor: '#526678',
        drawerLabelStyle: {
          fontSize: 16
        }
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'שעון נוכחות',
          title: 'שעון נוכחות',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="time-outline" color={color} size={size} />
          )
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'פרופיל',
          title: 'פרופיל',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          )
        }}
      />

      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: 'אודות',
          title: 'אודות',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" color={color} size={size} />
          )
        }}
      />

      <Drawer.Screen
        name="shift/[id]"
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
    </Drawer>
  );
}
