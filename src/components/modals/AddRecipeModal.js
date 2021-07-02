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

const AddRecipeModal = ({visible, handler}) => {
  const [titleText, setTitleText] = useState('');
  const [categoryText, setCategoryText] = useState('');
  const [descText, setDescText] = useState('');
  const [prepTimeText, setPrepTimeText] = useState('');
  const [cookTimeText, setCookTimeText] = useState('');
  const [servingsText, setServingsText] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientDesc, setIngredientDesc] = useState('');
  const [ingredientAmt, setIngredientAmt] = useState('');
  const [prepStep, setPrepStep] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [prepSteps, setPrepSteps] = useState([]);


  const queryClient = useQueryClient();

  const mutation = useMutation(api.postRecipe, {
    onSuccess: () => {

      queryClient.invalidateQueries('recipes');

      resetAndClose();
    },
  });

  const resetAndClose = () => {

    setTitleText('');
    setCategoryText('');
    setDescText('');
    setPrepTimeText('');
    setCookTimeText('');
    setServingsText('');
    setPrepSteps([]);
    setIngredients([]);
    handler();
  }

  const submitRecipe = () => {
    mutation.mutate({
      title: titleText,
      category: categoryText,
      description: descText,
      prepTime: prepTimeText,
      cookTime: cookTimeText,
      servings: servingsText,
      ingredients: ingredients,
      prepSteps: prepSteps,
    });
  }

return (
  <View>
    <Modal animationType="slide" transparent={true} visible={visible}>
      <ScrollView style={styles.viewCentered}>
      <KeyboardAwareScrollView
      style={styles.viewModal}
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}>
      <View style={styles.viewInputs}>
        <Text style={styles.textTitle}>Add a Recipe</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={txt => {
            setTitleText(txt);
          }}
          placeholder="Recipe Title"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={txt => {
            setCategoryText(txt);
          }}
          placeholder="Recipe Category"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={txt => {
            setDescText(txt);
          }}
          placeholder="Recipe Description"
          multiline={true}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={txt => {
            setPrepTimeText(txt);
          }}
          placeholder="Prep Time Title"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={txt => {
            setCookTimeText(txt);
          }}
          placeholder="👨🏾‍🍳 Time"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={txt => {
            setServingsText(txt);
          }}
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
          placeholder="Ingredient Name"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={txt => {
            setIngredientDesc(txt);
          }}
          placeholder="Ingredient Description"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={txt => {
            setIngredientAmt(txt);
          }}
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

        <Pressable
          onPress={() => {
            resetAndClose();
          }}>
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

export default AddRecipeModal;