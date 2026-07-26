import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppHeader';

const REPOSITORY_URL = 'https://github.com/ZionAmar/expo-app';

export default function AboutPage() {
  async function openRepository() {
    const canOpen = await Linking.canOpenURL(REPOSITORY_URL);

    if (canOpen) {
      await Linking.openURL(REPOSITORY_URL);
    }
  }

  return (
    <View style={styles.page}>
      <AppHeader title="אודות" />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.appName}>נוכחות+</Text>

          <Text style={styles.heading}>מפתח האפליקציה</Text>
          <Text style={styles.text}>Zion Amar</Text>

          <Text style={styles.heading}>על המערכת</Text>
          <Text style={styles.description}>
            אפליקציית שעון נוכחות מקומית המאפשרת לבצע כניסה
            ויציאה ממשמרת, לתעד מיקום, לצפות בהיסטוריה ולנהל
            את פרטי המשתמש.
          </Text>

          <TouchableOpacity style={styles.repoButton} onPress={openRepository}>
            <Text style={styles.repoText}>פתיחת הריפו ב-GitHub</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    padding: 22
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 26,
    elevation: 4
  },
  appName: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1477a8',
    marginBottom: 24
  },
  heading: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#17324d',
    marginTop: 16
  },
  text: {
    textAlign: 'right',
    color: '#526678',
    marginTop: 7,
    fontSize: 16
  },
  description: {
    textAlign: 'right',
    color: '#526678',
    lineHeight: 24,
    marginTop: 7
  },
  repoButton: {
    height: 52,
    backgroundColor: '#1477a8',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28
  },
  repoText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
