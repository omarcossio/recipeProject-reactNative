import React from 'react';
import {FlatList, Modal, Pressable, StyleSheet, Text, View} from 'react-native';

const RecipeModal = ({handler, recipe}) => {
    const extractIngredientKey = ({ingredientId}) => {
      return ingredientId;
    }
  
    const extractPrepStepKe = ({prepStepId}) => {
      return prepStepId;
    }
  
    const renderIngredient = ({item}) => {
      return (
        <Text>
          {item.name} - {item.amount} - {item.description}
        </Text>
      );
    }
  
    const renderPrepStep = ({item}) => {
      return <Text style={styles.text}>{item.prepStepText}</Text>;
    }
  
    return (
      <View style={styles.viewCentered}>
        <Modal animationType="slide" transparent={true}>
          <View style={styles.viewCentered}>
            <View style={styles.viewModal}>
              <View style={styles.viewText}>
                <Text style={[styles.text, styles.textTitle]}>Ingredients</Text>
                <FlatList
                  data={recipe.ingredients}
                  renderItem={renderIngredient}
                  keyExtractor={extractIngredientKey}
                />
              </View>
              <Text style={[styles.text, styles.textTitle]}>Prep Steps</Text>
              <FlatList
                data={recipe.prepSteps}
                renderItem={renderPrepStep}
                keyExtractor={extractPrepStepKey}
              />
              <Pressable
                style={[styles.pressable, styles.pressableClose]}
                onPress={handler}>
                <Text style={styles.textPressable}>Close</Text>
              </Pressable>
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
    viewText: {
      marginVertical: 8,
    },
  });
  
  export default RecipeModal;
  