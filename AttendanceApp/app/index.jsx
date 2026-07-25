import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import { getUser } from '../utils/storage';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [savedUser, setSavedUser] = useState(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const user = await getUser();
    setSavedUser(user);
  }

  function login() {
    if (!savedUser) {
      return;
    }

    if (
      username.trim() === savedUser.username &&
      password === savedUser.password
    ) {
      Keyboard.dismiss();
      router.replace('/(drawer)/(tabs)/home');
      return;
    }

    Alert.alert('שגיאה', 'שם המשתמש או הסיסמה אינם נכונים');
  }

  return (
    <Pressable style={styles.page} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.card}>
          <Text style={styles.logo}>נוכחות+</Text>
          <Text style={styles.title}>כניסה למערכת</Text>
          <Text style={styles.subtitle}>
            הזן את פרטי המשתמש כדי להמשיך
          </Text>

          <TextInput
            style={styles.input}
            placeholder="שם משתמש"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />

          <TextInput
            ref={passwordRef}
            style={styles.input}
            placeholder="סיסמה"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={login}
          />

          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={styles.loginText}>כניסה</Text>
          </TouchableOpacity>

          <Text style={styles.hint}>ברירת מחדל: kinneret / 1234</Text>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#eaf3f8'
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    padding: 24
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 26,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 8
  },
  logo: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1477a8',
    marginBottom: 12
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#17324d'
  },
  subtitle: {
    textAlign: 'center',
    color: '#718096',
    marginTop: 8,
    marginBottom: 24
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#cbd9e3',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    backgroundColor: '#f8fbfd',
    textAlign: 'right'
  },
  loginButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: '#1477a8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4
  },
  loginText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  hint: {
    textAlign: 'center',
    color: '#8898a7',
    marginTop: 16,
    fontSize: 12
  }
});
