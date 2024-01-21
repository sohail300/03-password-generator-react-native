/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function Body() {
  const [length, setLength] = useState('0');
  const [isGenerated, setIsGenerated] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState('');

  const LengthValidation = Yup.object({
    length: Yup.number()
      .required('Length Required')
      .min(4, 'Password length should be between 4 and 20')
      .max(20, 'Password length should be between 4 and 20')
      .positive(),
  });

  function generatePassword() {
    let characters = '';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()-_=+[{]}|;:,<.>/?';

    console.log('length: ', length);
    if (lowercase) {
      characters += lowercaseChars;
    }
    if (uppercase) {
      characters += uppercaseChars;
    }
    if (number) {
      characters += numberChars;
    }
    if (symbol) {
      characters += symbolChars;
    }
    console.log(characters);

    if (!characters) {
      console.error('Please include at least one character type.');
      return null;
    }

    let pass = '';
    const len = parseInt(length, 10);
    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      pass += characters.charAt(randomIndex);
    }

    console.log(pass);
    setIsGenerated(true);
    setPassword(pass);
    console.log('inside genpass');
    // console.log(password)
    // console.log(isGenerated)
  }

  function reset() {
    setLength('0');
    setIsGenerated(false);
    setLowercase(true);
    setUppercase(false);
    setNumber(false);
    setSymbol(false);
    console.log('inside reset');
  }

  return (
    <View style={styles.app}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Password Generator</Text>
      </View>
      <View>
        <View>
          <Formik
            initialValues={{length: '0'}}
            validationSchema={LengthValidation}
            onSubmit={() => console.log('generate')}
            onReset={() => reset()}>
            {({handleChange, handleSubmit, values, handleReset}) => (
              <View>
                <View style={styles.textInputContainer}>
                  <Text style={styles.text}>Password Length</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={values.length}
                    onChangeText={handleChange('length')}
                    style={styles.textInput}
                  />
                </View>
                <View style={styles.bodyComp}>
                  <BouncyCheckbox
                    style={styles.checkbox}
                    size={25}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    text="Include Lowercase letters"
                    innerIconStyle={{borderWidth: 1}}
                    disableBuiltInState
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      color: '#000',
                      textDecorationLine: 'none',
                    }}
                    isChecked={lowercase}
                    onPress={() => {
                      setLowercase(!lowercase);
                    }}
                  />
                  <BouncyCheckbox
                    style={styles.checkbox}
                    size={25}
                    fillColor="green"
                    unfillColor="#FFFFFF"
                    text="Include Uppercase letters"
                    innerIconStyle={{borderWidth: 1}}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      color: '#000',
                      textDecorationLine: 'none',
                    }}
                    isChecked={uppercase}
                    onPress={() => {
                      setUppercase(!uppercase);
                    }}
                  />
                  <BouncyCheckbox
                    style={styles.checkbox}
                    size={25}
                    fillColor="orange"
                    unfillColor="#FFFFFF"
                    text="Include Numbers"
                    innerIconStyle={{borderWidth: 1}}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      color: '#000',
                      textDecorationLine: 'none',
                    }}
                    isChecked={number}
                    onPress={() => {
                      setNumber(!number);
                    }}
                  />
                  <BouncyCheckbox
                    style={styles.checkbox}
                    size={25}
                    fillColor="purple"
                    unfillColor="#FFFFFF"
                    text="Include Symbols"
                    innerIconStyle={{borderWidth: 1}}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      color: '#000',
                      textDecorationLine: 'none',
                    }}
                    isChecked={symbol}
                    onPress={() => {
                      setSymbol(!symbol);
                    }}
                  />
                </View>

                <View style={styles.btnContainer}>
                  <TouchableOpacity onPress={() => handleSubmit}>
                  <Button onPress={() => handleReset} title="Generate" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleSubmit}>
                  <Button onPress={() => handleReset} title="Reset" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>

        {isGenerated && (
          <View style={styles.passwordContainer}>
            <View>
              <Text style={styles.passwordText}>{password}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#fff',
    height: '100%',
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // height: '100%',
    marginTop: 24,
    width: '100%',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0676de',
  },
  text: {
    color: '#000',
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 40,
  },
  textInput: {
    borderColor: '#fff',
    borderRadius: 8,
    backgroundColor: '#fff',
    width: 48,
    height: 48,
    color: '#000',
  },
  bodyComp: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 200,
    paddingHorizontal: 16,
    margin: 32,
  },
  checkbox: {
    flexDirection: 'row-reverse',
    width: '100%',
    justifyContent: 'space-between',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#87CEEB',
    padding: 8,
    width: 80,
    textAlign: 'center',
    borderRadius: 6,
    color: '#000',
  },
  passwordContainer: {
    height: 100,
    width: '90%',
    margin: 16,
    backgroundColor: '#eee',
    color: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  passwordText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
  },
});
