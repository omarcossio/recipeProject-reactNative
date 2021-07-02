import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../api';

const EditRecipeModal = ({handler, recipe}) => {
    const [titleText, setTitleText] = useState(recipe.title);
    const [categoryText, setCategoryText] = useState(recipe.category);
    const [descText, setDescText] = useState(recipe.description);
    const [prepTimeText, setPrepTimeText] = useState(recipe.prep);
    const [cookTimeText, setCookTimeText] = useState(recipe.cookTime);
    const [servingsText, setServingsText] = useState(recipe.servings);
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientDesc, setIngredientDesc] = useState('');
    const [ingredientAmt, setIngredientAmt] = useState('');
    const [prepStep, setPrepStep] = useState('');
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [prepSteps, setPrepSteps] = useState(recipe.prepSteps);


    const queryClient = useQueryClient();

    const mutation = useMutation(api.putRecipe, {
        onSuccess: () => {

            queryClient.invalidateQueries('recipes');

            handler();
        },
    });

    const submitRecipe =  () => {
        mutation.mutate({
            ecipeId: recipe.recipeId,
      category: categoryText,
      title: titleText,
      description: descText,
      prepTime: prepTimeText,
      cookTime: cookTimeText,
      servings: servingsText,
      ingredients: ingredients,
      prepSteps: prepSteps,
      ratings: recipe.ratings
        })
    }

    return (
        <View>
      <Modal animationType="slide" transparent={true}>
        <ScrollView style={styles.viewCentered}>
          <KeyboardAwareScrollView
            style={styles.viewModal}
            keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={false}>
            <View style={styles.viewInputs}>
              <Text style={styles.textTitle}>Editing: {recipe.title}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={txt => {
                  setTitleText(txt);
                }}
                value={titleText}
                placeholder="Recipe Title"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={txt => {
                  setCategoryText(txt);
                }}
                value={categoryText}
                placeholder="Recipe Category"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={txt => {
                  setDescText(txt);
                }}
                value={descText}
                placeholder="Recipe Description"
                multiline={true}
              />
              <TextInput
                style={styles.textInput}
                onChangeText={txt => {
                  setPrepTimeText(txt);
                }}
                value={prepTimeText}
                placeholder="Prep Time Title"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={txt => {
                  setCookTimeText(txt);
                }}
                value={cookTimeText}
                placeholder="👨🏾‍🍳 Time"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={txt => {
                  setServingsText(txt);
                }}
                value={servingsText ? servingsText.toString() : servingsText}
                placeholder="Servings"
                keyboardType="numeric"
              />
            </View>

            {ingredients.map((ingredient, index) => (
              <Text key={index}>
                {ingredient.name} - {ingredient.amount} {ingredient.description}
              </Text>
            ))}

            <View style={styles.viewAddlInfos}>
              <TextInput
                style={styles.textInput}
                onChangeText={txt => {
                  setIngredientName(txt);
                }}
                value={ingredientName}
                placeholder="Ingredient Name"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={txt => {
                  setIngredientDesc(txt);
                }}
                value={ingredientDesc}
                placeholder="Ingredient Description"
              />
              <TextInput
                style={styles.textInput}
                onChangeText={txt => {
                  setIngredientAmt(txt);
                }}
                value={ingredientAmt}
                placeholder="Ingredient Amount"
              />
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(245, 158, 11)'
                      : 'rgb(252, 211, 77)',
                  },
                  [styles.pressable, styles.pressableBtn],
                ]}
                onPress={() => {
                  setIngredients(prevIngredients => [
                    ...prevIngredients,
                    {
                      name: ingredientName,
                      description: ingredientDesc,
                      amount: ingredientAmt,
                    },
                  ]);
                  setIngredientAmt('');
                  setIngredientDesc('');
                  setIngredientName('');
                }}>
                <Text style={styles.textPressable}>Add Ingredient</Text>
              </Pressable>
            </View>

            {prepSteps.map((step, index) => (
              <Text key={index}>{step.prepStepText}</Text>
            ))}

            <View style={styles.viewAddlInfos}>
              <TextInput
                style={styles.textInput}
                onChangeText={txt => {
                  setPrepStep(txt);
                }}
                onEndEditing={() => {
                  setPrepSteps(prevPrepSteps => [
                    ...prevPrepSteps,
                    {prepStepText: prepStep},
                  ]);
                  setPrepStep('');
                }}
                value={prepStep}
                placeholder="Add Prep Step"
              />
            </View>

            <View style={styles.viewPressables}>
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(110, 231, 183)'
                      : 'rgb(209, 250, 229)',
                  },
                  [styles.pressable, styles.pressableBtn],
                ]}
                onPress={submitRecipe}>
                <Text>Submit Recipe</Text>
              </Pressable>

              <Pressable onPress={handler}>
                <Text style={styles.textDanger}>Close</Text>
              </Pressable>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
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
      paddingVertical: 8,
    },
    text: {
      marginVertical: 4,
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
    viewCentered: {
      marginTop: 16,
    },
    viewInputs: {
      borderBottomColor: 'darkslateblue',
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingVertical: 8,
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
    viewPressables: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
  

export default EditRecipeModal;