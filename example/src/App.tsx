import * as React from 'react';

import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { compare } from 'react-native-simple-bcrypt';

export default function App() {
  const [plainText, setPlainText] = React.useState<string>('111111');
  const [hashed, setHashed] = React.useState<string>(
    '$2a$12$VQUC9JVBRa98le3ebA5YZuK9Ofco2YHclGV0bl8k8u3nPTnCzAvD6'
  );

  const [result, setResult] = React.useState<string>();

  return (
    <View style={styles.container}>
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
          onPress={() => {
            compare(plainText, hashed).then((res) => {
              setResult(`${res}`);
            });
          }}
        />

        <Text style={styles.result}>Result: {result}</Text>
      </View>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
  },
  result: {
    marginTop: 40,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
