import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AppHeader from '../../components/AppHeader';
import { getUser, saveUser } from '../../utils/storage';

export default function ProfilePage() {
  const [user, setUser] = useState({
    username: '',
    password: '',
    imageUri: null
  });

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const savedUser = await getUser();
    setUser(savedUser);
  }

  async function chooseFromGallery() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('הרשאה נדרשת', 'יש לאשר גישה לגלריה');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8
    });

    if (!result.canceled) {
      setUser({ ...user, imageUri: result.assets[0].uri });
    }
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('הרשאה נדרשת', 'יש לאשר גישה למצלמה');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8
    });

    if (!result.canceled) {
      setUser({ ...user, imageUri: result.assets[0].uri });
    }
  }

  async function updateUser() {
    if (!user.username.trim() || !user.password.trim()) {
      Alert.alert('שגיאה', 'שם משתמש וסיסמה הם שדות חובה');
      return;
    }

    await saveUser({
      username: user.username.trim(),
      password: user.password,
      imageUri: user.imageUri
    });

    Keyboard.dismiss();
    Alert.alert('נשמר', 'פרטי המשתמש עודכנו בהצלחה');
  }

  return (
    <Pressable style={styles.page} onPress={Keyboard.dismiss}>
      <AppHeader title="פרופיל משתמש" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.imageContainer}>
            {user.imageUri ? (
              <Image source={{ uri: user.imageUri }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>אין תמונה</Text>
              </View>
            )}
          </View>

          <View style={styles.imageButtons}>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={chooseFromGallery}
            >
              <Text style={styles.smallButtonText}>בחירה מהגלריה</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.smallButton} onPress={takePhoto}>
              <Text style={styles.smallButtonText}>צילום תמונה</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>שם משתמש</Text>
            <TextInput
              style={styles.input}
              value={user.username}
              onChangeText={(value) =>
                setUser({ ...user, username: value })
              }
              placeholder="שם משתמש חדש"
              autoCapitalize="none"
            />

            <Text style={styles.label}>סיסמה</Text>
            <TextInput
              style={styles.input}
              value={user.password}
              onChangeText={(value) =>
                setUser({ ...user, password: value })
              }
              placeholder="סיסמה חדשה"
              secureTextEntry
            />

            <TouchableOpacity style={styles.saveButton} onPress={updateUser}>
              <Text style={styles.saveText}>שמירת שינויים</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f3f7fa'
  },
  flex: {
    flex: 1
  },
  content: {
    padding: 20
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 8
  },
  image: {
    width: 145,
    height: 145,
    borderRadius: 73,
    borderWidth: 4,
    borderColor: '#ffffff'
  },
  imagePlaceholder: {
    width: 145,
    height: 145,
    borderRadius: 73,
    backgroundColor: '#dfeaf1',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ffffff'
  },
  imagePlaceholderText: {
    color: '#728393'
  },
  imageButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    gap: 10,
    marginTop: 16
  },
  smallButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#1477a8',
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 14
  },
  smallButtonText: {
    color: '#1477a8',
    fontWeight: '600'
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginTop: 24,
    elevation: 3
  },
  label: {
    textAlign: 'right',
    color: '#526678',
    marginBottom: 7,
    fontWeight: '600'
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#cbd9e3',
    borderRadius: 13,
    paddingHorizontal: 14,
    marginBottom: 17,
    backgroundColor: '#f8fbfd',
    textAlign: 'right'
  },
  saveButton: {
    height: 52,
    backgroundColor: '#1477a8',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold'
  }
});
