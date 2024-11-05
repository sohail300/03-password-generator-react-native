/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Body() {
  const [isGenerated, setIsGenerated] = useState(false);
  const [password, setPassword] = useState('');

  function generatePassword(length, lowercase, uppercase, number, symbol) {
    console.log('inside generatePassword');
    console.log(length, lowercase, uppercase, number, symbol);
    // First check if at least one option is selected
    if (!lowercase && !uppercase && !number && !symbol) {
      console.error('Please include at least one character type.');
      return null;
    }

    const characterSets = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()-_=+[{]}|;:,<.>/?',
    };

    // Build character set based on current state
    let characters = '';
    if (lowercase) characters += characterSets.lowercase;
    if (uppercase) characters += characterSets.uppercase;
    if (number) characters += characterSets.numbers;
    if (symbol) characters += characterSets.symbols;

    // Generate password
    let pass = '';
    const len = parseInt(length, 10);

    // Ensure we're getting at least one character from each selected type
    let mandatoryChars = '';
    if (lowercase)
      mandatoryChars +=
        characterSets.lowercase[
          Math.floor(Math.random() * characterSets.lowercase.length)
        ];
    if (uppercase)
      mandatoryChars +=
        characterSets.uppercase[
          Math.floor(Math.random() * characterSets.uppercase.length)
        ];
    if (number)
      mandatoryChars +=
        characterSets.numbers[
          Math.floor(Math.random() * characterSets.numbers.length)
        ];
    if (symbol)
      mandatoryChars +=
        characterSets.symbols[
          Math.floor(Math.random() * characterSets.symbols.length)
        ];

    // Fill the rest of the password length with random characters
    for (let i = mandatoryChars.length; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      pass += characters.charAt(randomIndex);
    }

    // Shuffle the mandatory characters into the password
    pass = mandatoryChars + pass;
    pass = pass
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('')
      .slice(0, len);

    setIsGenerated(true);
    setPassword(pass);
  }

  function reset() {
    setIsGenerated(false);
  }

  return (
    <SafeAreaView style={styles.app}>
      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Password Generator</Text>
        </View>
        <View style={styles.mainContainer}>
          <Formik
            initialValues={{
              length: '',
              lowercase: true,
              uppercase: false,
              number: false,
              symbol: false,
            }}
            validate={values => {
              const errors = {};
              const lengthValue = Number(values.length);
              if (!lengthValue || lengthValue === 0) {
                errors.length = 'Length Required';
              } else if (lengthValue < 4 || lengthValue > 20) {
                errors.length = 'Length should be between 4 and 20';
              }
              return errors;
            }}
            onSubmit={values => {
              console.log(
                values.length,
                values.lowercase,
                values.uppercase,
                values.number,
                values.symbol,
              );

              generatePassword(
                values.length,
                values.lowercase,
                values.uppercase,
                values.number,
                values.symbol,
              );
            }}
            onReset={() => {
              reset();
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              handleReset,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View style={styles.bodyContainer}>
                <View style={styles.textInputContainer}>
                  <Text style={styles.label}>Password Length</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={values.length}
                    onChangeText={handleChange('length')}
                    onBlur={handleBlur('length')}
                    style={styles.textInput}
                    placeholder="4-20"
                    placeholderTextColor="#666"
                  />
                </View>
                {errors.length && touched.length && (
                  <Text style={styles.errorText}>{errors.length}</Text>
                )}

                <View style={styles.bodyComp}>
                  <BouncyCheckbox
                    style={styles.checkbox}
                    size={25}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    text="Include Lowercase letters"
                    innerIconStyle={{borderWidth: 2}}
                    disableBuiltInState
                    textStyle={styles.checkboxText}
                    isChecked={values.lowercase}
                    onPress={() => {
                      console.log(values.lowercase);
                      setFieldValue('lowercase', !values.lowercase);
                    }}
                  />
                  <BouncyCheckbox
                    style={styles.checkbox}
                    size={25}
                    fillColor="green"
                    unfillColor="#FFFFFF"
                    text="Include Uppercase letters"
                    innerIconStyle={{borderWidth: 2}}
                    disableBuiltInState
                    textStyle={styles.checkboxText}
                    isChecked={values.uppercase}
                    onPress={() => {
                      console.log(values.uppercase);
                      setFieldValue('uppercase', !values.uppercase);
                    }}
                  />
                  <BouncyCheckbox
                    style={styles.checkbox}
                    size={25}
                    fillColor="orange"
                    unfillColor="#FFFFFF"
                    text="Include Numbers"
                    disableBuiltInState
                    innerIconStyle={{borderWidth: 2}}
                    textStyle={styles.checkboxText}
                    isChecked={values.number}
                    onPress={() => {
                      console.log(values.number);
                      setFieldValue('number', !values.number);
                    }}
                  />
                  <BouncyCheckbox
                    style={styles.checkbox}
                    size={25}
                    fillColor="purple"
                    unfillColor="#FFFFFF"
                    text="Include Symbols"
                    innerIconStyle={{borderWidth: 2}}
                    disableBuiltInState
                    textStyle={styles.checkboxText}
                    isChecked={values.symbol}
                    onPress={() => {
                      console.log(values.number);
                      setFieldValue('symbol', !values.symbol);
                    }}
                  />
                </View>

                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.generateButton]}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Generate</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.resetButton]}
                    onPress={handleReset}>
                    <Text style={[styles.buttonText, styles.resetButtonText]}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>

          {isGenerated && (
            <View style={styles.passwordContainer}>
              <Text style={styles.passwordLabel}>Generated Password:</Text>
              <Text style={styles.passwordText}>{password}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#F7F9FC',
    paddingBottom: 20,
  },
  mainContainer: {
    paddingHorizontal: 20,
  },
  headingContainer: {
    paddingVertical: 24,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
  },
  label: {
    color: '#4A5568',
    fontSize: 16,
    fontWeight: '600',
  },
  bodyContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textInputContainer: {
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    height: 48,
    color: '#2D3748',
    fontSize: 16,
    marginTop: 8,
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 16,
  },
  bodyComp: {
    marginTop: 24,
    marginBottom: 32,
  },
  checkbox: {
    marginBottom: 16,
  },
  checkboxText: {
    color: '#4A5568',
    fontSize: 16,
    textDecorationLine: 'none',
    fontWeight: '500',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateButton: {
    backgroundColor: '#4299E1',
  },
  resetButton: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#CBD5E0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButtonText: {
    color: '#4A5568',
  },
  passwordContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  passwordLabel: {
    color: '#4A5568',
    fontSize: 14,
    marginBottom: 8,
  },
  passwordText: {
    color: '#2D3748',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
});
