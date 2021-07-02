import React, { useState } from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../api';

const Rating = ({rating}) => {
    const [numStars, setNumStars] = useState(rating.numStars);
    const [ratingText, setRatingText] = useState(rating.ratingText);
    const [recommended, setRecommended] = useState(rating.recommended);  


    const queryClient = useQueryClient();

    const deleteMutation = useMutation(api.deleteRating, {
        onSuccess: () => {

            queryClient.invalidateQueries('recipes');
        },
    });

    const updateMutation = useMutation(api.putRating, {
        onSuccess: () => {

            queryClient.invalidateQueries('recipes');
        },
    });

    const updateRating = (update) => {
        updateMutation.mutate({...rating, ...update});
    }

    return (
        <View style={styles.viewRating}>
          <View style={styles.row}>
            <TextInput
              style={styles.textTitle}
              onChangeText={text => {
                setNumStars(Number(text));
              }}
              onEndEditing={() => {
                updateRating({numStars});
              }}>
              {rating.numStars}
            </TextInput>
            <Text> / 5</Text>
          </View>
          <TextInput
            style={styles.text}
            onChangeText={text => {
              setRatingText(text);
            }}
            onEndEditing={() => {
              updateRating({ratingText});
            }}>
            {rating.ratingText}
          </TextInput>
          <Text>Recommended?</Text>
          <TextInput
            style={styles.text}
            onChangeText={text => {
              if (text === 'Y' || text === 'N') {
                setRecommended(text);
              }
            }}
            onEndEditing={() => {
              updateRating({recommended});
            }}>
            {rating.recommended ? 'Y' : 'N'}
          </TextInput>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed
                  ? 'rgb(220, 38, 38)'
                  : 'rgb(248, 113, 113)',
              },
              [styles.pressable],
            ]}
            onPress={() => {
              deleteMutation.mutate(rating.ratingId);
            }}>
            <Text style={styles.pressableText}>🔥 Delete Rating</Text>
          </Pressable>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      pressable: {
        borderRadius: 4,
        elevation: 2,
        marginHorizontal: 4,
        padding: 8,
      },
      pressableText: {
        color: 'white',
      },
      row: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      text: {
        marginVertical: 4,
      },
      textTitle: {
        fontSize: 15,
        fontWeight: 'bold',
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
    
    export default Rating;