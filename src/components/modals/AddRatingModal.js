import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../api';

const AddRatingModal = ({handler, recipe}) => {
    const [numStars, setNumStars] = useState(3);
    const [ratingText, setRatingText] = useState('');
    const [isRecommended, setIsRecommended] = useState(true);

    const queryClient = useQueryClient();

    const mutation = useMutation(api.postRatings, {
        onSuccess: () => {
            queryClient.invalidateQueries('recipes');
            resetAndClose();
        }
    });

    const resetAndClose = () => {
        setNumStars(3);
        setRatingText('');
        setIsRecommended(true);
        handler();
    }

    const submitRating = () => {
        mutation.mutate({
            recipeId: recipe.recipeId,
            numStars,
            recommended: isRecommended,
            ratingText
        });
    }

    const toggleSwitch = () => {
        setIsRecommended(prev => !prev);
    }

    return (

        <View>
        <Modal animationType="fade" transparent={true}>
          <View style={styles.viewModal}>
            <Text style={styles.textTitle}>Adding Rating for {recipe.title}</Text>
            <Text style={styles.text}>Num of Stars: {numStars}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={5}
              step={1}
              minimumTrackTintColor="#767577"
              maximumTrackTintColor="#656466"
              onValueChange={value => {
                setNumStars(value);
              }}
              // This is not a controlled component. Here, `value` is just the initial value.
              value={numStars}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Share your thoughts 💭"
              multiline={true}
              onChangeText={txt => {
                setRatingText(txt);
              }}
            />
            <Text>Recommend?</Text>
  
            <Switch
              trackColor={{false: '#767577', true: '#656466'}}
              thumbColor={
                isRecommended ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'
              }
              ios_backgroundColor="#4f4f4f"
              onValueChange={toggleSwitch}
            />
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? 'rgb(110, 231, 183)'
                    : 'rgb(209, 250, 229)',
                },
                [styles.pressable, styles.pressableBtn],
              ]}
              onPress={submitRating}>
              <Text>Submit Rating</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                resetAndClose();
              }}>
              <Text style={styles.textDanger}>Close</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    pressable: {
      marginVertical: 16,
    },
    pressableBtn: {
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 16,
    },
    slider: {
      width: '100%',
      height: 40,
    },
    text: {
      marginVertical: 8,
    },
    textDanger: {
      color: 'red',
    },
    textInput: {
      margin: 12,
      borderWidth: 1,
      height: 36,
      padding: 8,
    },
    textTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
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
  });
  
  export default AddRatingModal;
  