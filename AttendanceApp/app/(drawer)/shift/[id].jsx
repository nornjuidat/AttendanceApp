import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getShifts } from '../../../utils/storage';
import {
  formatDate,
  formatDuration,
  formatTime
} from '../../../utils/date';

export default function ShiftDetailsPage() {
  const { id } = useLocalSearchParams();
  const [shift, setShift] = useState(null);

  useEffect(() => {
    loadShift();
  }, [id]);

  async function loadShift() {
    const shifts = await getShifts();
    const selectedShift = shifts.find((item) => item.id === id);
    setShift(selectedShift || null);
  }

  function locationText(location) {
    if (!location) {
      return 'לא נשמר מיקום';
    }

    return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
  }

  if (!shift) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>המשמרת לא נמצאה</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>חזור</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="arrow-forward" size={27} color="#17324d" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>פרטי משמרת</Text>
        <View style={styles.headerBack} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <DetailRow label="תאריך" value={formatDate(shift.entryTime)} />
          <DetailRow label="שעת כניסה" value={formatTime(shift.entryTime)} />
          <DetailRow label="שעת יציאה" value={formatTime(shift.exitTime)} />
          <DetailRow
            label="משך המשמרת"
            value={formatDuration(shift.duration)}
          />
          <DetailRow
            label="מיקום כניסה"
            value={locationText(shift.entryLocation)}
          />
          <DetailRow
            label="מיקום יציאה"
            value={locationText(shift.exitLocation)}
            last
          />
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>חזור למסך הקודם</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function DetailRow({ label, value, last }) {
  return (
    <View style={[styles.row, last && styles.lastRow]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f3f7fa'
  },
  header: {
    height: 64,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e6edf3'
  },
  headerBack: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#17324d'
  },
  content: {
    padding: 20
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 20,
    elevation: 3
  },
  row: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e8eef3',
    alignItems: 'flex-end'
  },
  lastRow: {
    borderBottomWidth: 0
  },
  label: {
    fontSize: 14,
    color: '#728393'
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
    color: '#17324d',
    marginBottom: 5
  },
  backButton: {
    height: 52,
    backgroundColor: '#1477a8',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22
  },
  backText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold'
  },
  center: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f7fa'
  },
  notFound: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#17324d'
  }
});
