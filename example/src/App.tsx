/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { compare, hash } from 'react-native-simple-bcrypt';
import Clipboard from '@react-native-clipboard/clipboard';

export default function App() {
  const [plainText, setPlainText] = React.useState<string>('111111');
  const [hashed, setHashed] = React.useState<string>(
    '$2a$12$VQUC9JVBRa98le3ebA5YZuK9Ofco2YHclGV0bl8k8u3nPTnCzAvD6'
  );
  const [matchResult, setMatchResult] = React.useState<string>();
  const [isChecking, setIsChecking] = React.useState<boolean>(false);
  const [checkResultTime, setCheckResultTime] = React.useState<number>(0);

  const [plainTextToBeHashed, setPlainTextToBeHashed] =
    React.useState<string>('111111');
  const [rounds, setRounds] = React.useState<number>(12);
  const [hashResult, setHashResult] = React.useState<string>();
  const [isHashing, setIsHashing] = React.useState<boolean>(false);
  const [hashResultTime, setHashResultTime] = React.useState<number>(0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hashing</Text>
      <Text>Plain Text</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPlainTextToBeHashed(text)}
        value={plainTextToBeHashed}
      />
      <Text>Rounds</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setRounds(parseInt(text, 10) || 0)}
        value={`${rounds}`}
      />

      <View style={styles.result}>
        <Button
          title="Generate"
          disabled={isHashing}
          onPress={() => {
            setTimeout(() => {
              setIsHashing(true);
              const t1 = Date.now();
              hash(plainTextToBeHashed, rounds).then((res) => {
                setHashResult(`${res}`);
                setIsHashing(false);
                setHashResultTime(Date.now() - t1);
              });
            })
          }}
        />

        {hashResult && (
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ ...styles.result, maxWidth: '80%' }}>
                {hashResult}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(hashResult);
                }}
              >
                <Text
                  style={{ ...styles.result, color: 'blue', paddingStart: 10 }}
                >
                  Copy
                </Text>
              </TouchableOpacity>
            </View>
            <Text>{`(${hashResultTime}ms)`}</Text>
          </View>
        )}
      </View>

      <View style={styles.divider} />

      <Text style={styles.header}>Checking</Text>
      <Text>Plain Text</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPlainText(text)}
        value={plainText}
      />
      <Text>Hashed</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setHashed(text)}
        value={hashed}
      />

      <View style={styles.result}>
        <Button
          title="Check"
          disabled={isChecking}
          onPress={() => {
            setIsChecking(true);
            const t1 = Date.now();
            compare(plainText, hashed).then((res) => {
              setMatchResult(`${res}`);
              setIsChecking(false);
              setCheckResultTime(Date.now() - t1);
            });
          }}
        />

        <Text style={styles.result}>Is Matched?: {matchResult} </Text>
      </View>
      <Text>{checkResultTime > 0 && `(${checkResultTime}ms)`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
    marginTop: 40,
    marginBottom: 20,
    opacity: 0.3,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
