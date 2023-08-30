import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-simple-bcrypt' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const SimpleBcrypt = NativeModules.SimpleBcrypt
  ? NativeModules.SimpleBcrypt
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function compare(plainText: string, hashed: string): Promise<number> {
  return SimpleBcrypt.compare(plainText, hashed);
}

export function hash(plainText: string, saltRounds: number): Promise<string> {
  return SimpleBcrypt.hash(plainText, saltRounds);
}
