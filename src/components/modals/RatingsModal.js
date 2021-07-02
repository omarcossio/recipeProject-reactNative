import React from 'react';
import {FlatList, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Rating from './Rating';

const RatingsModal = ({handler, recipe}) => {
    const extractRatingKey = ({ratingId}) => {
        return ratingId;
    }

    const renderRating = ({item}) => {
        return <Rating rating={item} />
    }

    return (
        <View style={styles.viewCentered}>
          <Modal animationType="slide" transparent={true}>
            <View style={styles.viewCentered}>
              <View style={styles.viewModal}>
                <FlatList
                  data={recipe.ratings}
                  renderItem={renderRating}
                  keyExtractor={extractRatingKey}
                />
                <Pressable style={styles.pressable} onPress={handler}>
                  <Text style={styles.textPressable}>Close</Text>
                </Pressable>
                <Text>Tap any field to edit the rating info</Text>
                <Text>Tap 'return' to preserve edits</Text>
              </View>
            </View>
          </Modal>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      pressable: {
        marginVertical: 16,
      },
      text: {
        marginVertical: 4,
      },
      textPressable: {
        color: 'red',
      },
      textTitle: {
        fontSize: 15,
        fontWeight: 'bold',
      },
      viewCentered: {
        marginTop: 16,
      },
      viewModal: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      viewRating: {
        borderBottomColor: 'darkslateblue',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 1,
        justifyContent: 'center',
        padding: 8,
      },
      viewText: {
        marginVertical: 8,
      },
    });
    
    export default RatingsModal;
    