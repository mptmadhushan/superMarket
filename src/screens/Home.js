import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';

import Button from '../components/Button';

import { images, SIZES, COLORS } from '../constants';
import { getOffers } from '../api/offersAPI';

export default function Home({ navigation }) {
  const [offers, setOffers] = useState([]);
  const userAuthToken = useSelector(state => state.auth.token);

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: 'item1',
        price: 100,
        image: 'https://picsum.photos/200/300',
      },
      {
        id: 2,
        name: 'item2',
        price: 400,
        image: 'https://picsum.photos/200/300',
      },
      {
        id: 3,
        name: 'item3',
        price: 340,
        image: 'https://picsum.photos/200/300',
      },
    ];
    setOffers(data);
    // getOffers()
    //   .then(response => {
    //     if (response.error) {
    //       showToast(response.error);
    //       return;
    //     }
    //     const { data } = response;
    //     setOffers(data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }, []);

  const onScanDummyButtonClick = () => {
    // Please uncomment one of the readings to test on dummy functionalities

    // Option1: Authentic Card Reading
    const nfcData = {
      uuid: '0405e4d29f6581',
      signature:
        'a9a7f653a537d2ecb67d0b03ee861faf5f3dc8f5d2c6052e631bce0cce0dc526',
    };

    // Option2: Non-Authentic Card Reading
    // const nfcData = {
    //   uuid: '04719dd29f6580',
    //   signature: 'ebf21ae90ec620ea9219dad1fb9fb7c58d5461b9654f3b5e7b1fed4c9f461153',
    // };

    navigation.navigate('ScanResult', {
      nfcData,
    });
  };

  const showToast = message => {
    Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
  };

  // const onNFCTagRead = () => {
  //   NFCReader.beginScanning((uid, ecc_sig, session_cancelled) => {
  //     if (session_cancelled) {
  //       Toast.showWithGravity('Reading cancelled', Toast.SHORT, Toast.TOP);
  //     } else if (uid === UNKNOWN_UID || ecc_sig === UNKNOWN_ECC_SIG) {
  //       Toast.showWithGravity(
  //         'Invalid tag data or error reading tag data',
  //         Toast.SHORT,
  //         Toast.TOP,
  //       );
  //     } else {
  //       navigation.navigate('ScanResult', {
  //         nfcData: {
  //           uuid: uid,
  //           signature: ecc_sig,
  //         },
  //       });
  //     }
  //   });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.centerFlex}>
        <Image
          source={images.silicaLogo}
          resizeMode="contain"
          style={{
            width: SIZES.width * 0.36,
            height: SIZES.width * 0.36,
          }}
        />
      </View>
      <View style={styles.centerFlex}>
        <ScrollView
          horizontal
          pagingEnabled
          decelerationRate={0}
          snapToInterval={SIZES.width * 0.8 + 25}
          snapToAlignment="center"
          contentInset={{
            top: 0,
            left: 20,
            bottom: 0,
            right: 20,
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? 20 : 0,
          }}>
          {offers
            ? offers.map(data => {
                return (
                  <View
                    key={data.name}
                    style={{
                      width: SIZES.width * 0.8,
                      marginLeft: 20,
                    }}>
                    <Image
                      // source={images.shoe}
                      source={{
                        uri: `${data.image}`,
                        headers: {
                          // Authorization:
                          //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2MzE2MzA1ODMsImV4cCI6MTYzMjg0MDE4M30.Pbw9-GCTYCNV-WyC7MOHw1UzN20LLVdbGWU3yNm0qyY',
                          Authorization: `Bearer ${userAuthToken}`,
                        },
                      }}
                      resizeMode="cover"
                      style={{
                        width: SIZES.width * 0.8,
                        height: SIZES.width,
                        marginBottom: SIZES.height * 0.05,
                      }}
                    />
                    <View style={styles.centerFlex}>
                      <View style={styles.banner}>
                        <Text style={styles.offerText}>{data.name}</Text>
                        <Text style={styles.offerText}>
                          Price: {data.price}LKR
                        </Text>
                      </View>
                      <Button
                        text="View Item"
                        onPress={onScanDummyButtonClick}
                      />
                    </View>
                  </View>
                );
              })
            : null}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  banner: {
    marginTop: -30,
    backgroundColor: COLORS.primary,
    width: SIZES.width * 0.8,
    height: 40,
    overflow: 'hidden',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    // flex: 1,
    alignItems: 'center',
  },
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  centerFlex2: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  offerText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
