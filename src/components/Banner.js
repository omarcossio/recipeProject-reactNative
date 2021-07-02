import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';

const Banner = ({text}) => {
    const viewStyle = {...styles.view, width: useWindowDimensions().width};
    return (
      <View style={viewStyle}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
      view: {
        backgroundColor: '#ffba65',
    height: 64,
    justifyContent: 'center',
    padding: 16,
      },
      text: {
          fontSize: 20, 
          textAlign: 'center',
      }
  });

  export default Banner;