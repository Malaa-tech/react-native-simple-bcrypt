# react-native-simple-bcrypt
Simple/Fast/Native Bcrypt bindings for react native
## Installation

```sh
npm install react-native-simple-bcrypt
```

install pods
```sh
cd ios && pod install
```

if in expo managed projects do a prebuild 
```sh
expo prebuild
```

## Usage

```js
import { compare } from "react-native-simple-bcrypt";

// ...

compare(plainText, hashed).then((isMatched) => {
  console.log(isMatched);
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
