import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'attendance_user';
const SHIFTS_KEY = 'attendance_shifts';
const ACTIVE_SHIFT_KEY = 'attendance_active_shift';

export async function getUser() {
  const value = await AsyncStorage.getItem(USER_KEY);

  if (value) {
    return JSON.parse(value);
  }

  const defaultUser = {
    username: 'kinneret',
    password: '1234',
    imageUri: null
  };

  await AsyncStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
  return defaultUser;
}

export async function saveUser(user) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getShifts() {
  const value = await AsyncStorage.getItem(SHIFTS_KEY);
  return value ? JSON.parse(value) : [];
}

export async function saveShifts(shifts) {
  await AsyncStorage.setItem(SHIFTS_KEY, JSON.stringify(shifts));
}

export async function getActiveShift() {
  const value = await AsyncStorage.getItem(ACTIVE_SHIFT_KEY);
  return value ? JSON.parse(value) : null;
}

export async function saveActiveShift(shift) {
  await AsyncStorage.setItem(ACTIVE_SHIFT_KEY, JSON.stringify(shift));
}

export async function removeActiveShift() {
  await AsyncStorage.removeItem(ACTIVE_SHIFT_KEY);
}
