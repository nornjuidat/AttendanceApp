import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import AppHeader from '../../../components/AppHeader';
import {
  getActiveShift,
  getShifts,
  removeActiveShift,
  saveActiveShift,
  saveShifts
} from '../../../utils/storage';
import { formatDate, formatTime } from '../../../utils/date';

export default function HomePage() {
  const [activeShift, setActiveShift] = useState(null);
  const [loading, setLoading] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadActiveShift();
  }, []);

  async function loadActiveShift() {
    const shift = await getActiveShift();
    setActiveShift(shift);
  }

  function runSpring() {
    scaleValue.setValue(0.85);

    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 110,
      useNativeDriver: true
    }).start();
  }

  async function getCurrentLocation() {
    const permission = await Location.requestForegroundPermissionsAsync();

    if (permission.status !== 'granted') {
      Alert.alert(
        'אין הרשאת מיקום',
        'ניתן להמשיך, אך המיקום לא יישמר בהחתמה.'
      );
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };
  }

  async function handleAttendance() {
    if (loading) {
      return;
    }

    runSpring();
    setLoading(true);

    try {
      if (!activeShift) {
        const now = new Date().toISOString();
        const location = await getCurrentLocation();

        const newActiveShift = {
          id: Date.now().toString(),
          entryTime: now,
          entryLocation: location
        };

        await saveActiveShift(newActiveShift);
        setActiveShift(newActiveShift);

        Alert.alert('הכניסה נשמרה', `שעת כניסה: ${formatTime(now)}`);
      } else {
        const exitTime = new Date().toISOString();
        const exitLocation = await getCurrentLocation();
        const duration =
          new Date(exitTime).getTime() -
          new Date(activeShift.entryTime).getTime();

        const completedShift = {
          ...activeShift,
          exitTime,
          exitLocation,
          duration
        };

        const shifts = await getShifts();
        await saveShifts([completedShift, ...shifts]);
        await removeActiveShift();
        setActiveShift(null);

        Alert.alert('היציאה נשמרה', 'המשמרת נוספה להיסטוריה');
      }
    } catch (error) {
      Alert.alert('שגיאה', 'לא ניתן היה לשמור את ההחתמה');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.page}>
      <AppHeader title="שעון נוכחות" />

      <View style={styles.content}>
        <Text style={styles.welcome}>שלום, kinneret</Text>
        <Text style={styles.date}>{formatDate(new Date())}</Text>

        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>מצב נוכחי</Text>
          <Text
            style={[
              styles.statusText,
              activeShift ? styles.working : styles.notWorking
            ]}
          >
            {activeShift ? 'נמצא במשמרת' : 'לא נמצא במשמרת'}
          </Text>

          {activeShift && (
            <Text style={styles.entryTime}>
              כניסה: {formatTime(activeShift.entryTime)}
            </Text>
          )}
        </View>

        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              activeShift ? styles.exitButton : styles.entryButton
            ]}
            onPress={handleAttendance}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'שומר...' : activeShift ? 'יציאה' : 'כניסה'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.locationText}>
          בזמן ההחתמה יישמר מיקום המכשיר, לאחר קבלת הרשאה.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f3f7fa'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 24
  },
  welcome: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#17324d',
    marginTop: 24
  },
  date: {
    marginTop: 6,
    color: '#728393',
    fontSize: 16
  },
  statusCard: {
    width: '100%',
    padding: 22,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginTop: 34,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8
  },
  statusLabel: {
    color: '#718096',
    fontSize: 15
  },
  statusText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8
  },
  working: {
    color: '#159447'
  },
  notWorking: {
    color: '#d14c4c'
  },
  entryTime: {
    marginTop: 10,
    color: '#526678'
  },
  attendanceButton: {
    width: 190,
    height: 190,
    borderRadius: 95,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 42,
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12
  },
  entryButton: {
    backgroundColor: '#159447'
  },
  exitButton: {
    backgroundColor: '#d14c4c'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  locationText: {
    marginTop: 28,
    textAlign: 'center',
    color: '#728393',
    lineHeight: 21
  }
});
