import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

export default function NotFoundPage() {
  return (
    <View style={styles.page}>
      <Text style={styles.code}>404</Text>
      <Text style={styles.title}>דף זה לא קיים</Text>
      <Text style={styles.text}>
        הנתיב שאליו ניסית להגיע אינו קיים באפליקציה.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>חזור</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f3f7fa'
  },
  code: {
    fontSize: 76,
    fontWeight: 'bold',
    color: '#1477a8'
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#17324d',
    marginTop: 6
  },
  text: {
    textAlign: 'center',
    color: '#728393',
    marginTop: 10
  },
  button: {
    width: 180,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#1477a8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold'
  }
});
