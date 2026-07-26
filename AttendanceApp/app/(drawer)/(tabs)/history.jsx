import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { router, useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppHeader from '../../../components/AppHeader';
import { getShifts } from '../../../utils/storage';
import {
  formatDate,
  formatDuration,
  formatTime
} from '../../../utils/date';

export default function HistoryPage() {
  const [shifts, setShifts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadShifts();
    }, [])
  );

  async function loadShifts() {
    const savedShifts = await getShifts();
    setShifts(savedShifts);
  }

  function renderShift({ item }) {
    return (
      <TouchableOpacity
        style={styles.shiftCard}
        onPress={() => router.push(`/(drawer)/shift/${item.id}`)}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="calendar-outline" size={25} color="#1477a8" />
        </View>

        <View style={styles.shiftInfo}>
          <Text style={styles.shiftDate}>{formatDate(item.entryTime)}</Text>
          <Text style={styles.shiftHours}>
            {formatTime(item.entryTime)} - {formatTime(item.exitTime)}
          </Text>
          <Text style={styles.duration}>
            {formatDuration(item.duration)}
          </Text>
        </View>

        <Ionicons name="chevron-back" size={22} color="#728393" />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.page}>
      <AppHeader title="היסטוריית משמרות" />

      {shifts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <LottieView
            source={require('../../../assets/empty-animation.json')}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.emptyTitle}>עדיין אין משמרות</Text>
          <Text style={styles.emptyText}>
            לאחר שתבצע כניסה ויציאה, המשמרת תופיע כאן.
          </Text>
        </View>
      ) : (
        <FlatList
          data={shifts}
          keyExtractor={(item) => item.id}
          renderItem={renderShift}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f3f7fa'
  },
  list: {
    padding: 16
  },
  shiftCard: {
    minHeight: 104,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    marginBottom: 14,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 7
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e8f4fa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  shiftInfo: {
    flex: 1,
    marginHorizontal: 14,
    alignItems: 'flex-end'
  },
  shiftDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#17324d'
  },
  shiftHours: {
    color: '#526678',
    marginTop: 4
  },
  duration: {
    color: '#1477a8',
    marginTop: 5,
    fontWeight: '600'
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  animation: {
    width: 220,
    height: 220
  },
  emptyTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#17324d'
  },
  emptyText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#728393',
    lineHeight: 21
  }
});
