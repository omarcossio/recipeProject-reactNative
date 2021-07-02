import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useQuery} from 'react-query';
import api from '../api';
import {AddRating, AddRecipe, EditRecipe, Ratings, RecipeModal} from './modals';
import Recipe from './Recipe';

const Recipes = () => {
    const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);
    const [activeRecipe, setActiveRecipe] = useState(null);
    const [currentop, setCurrentOp] = useState(null);

    
    const {status, error, data} = useQuery('recipes', api.getRecipes, {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const extractKey = ({recipeId}) => recipeId;
    const renderRecipe = ({item}) => (
        <Recipe recipe={item} modalOpener={openModal} />
    );

    const openModal = (recipe, operation) => {
        setActiveRecipe(recipe);
        setCurrentop(operation);
    }

    const closeModal = () => {
        setActiveRecipe(null);
        setCurrentop(null);
    }

    switch (status) {
        case 'loading':
            return <ActivityIndicator size = "large" color=" #00ff00" />;
        case 'error':
            Alert.alert('Error Fetch Data From Server', error.message, [
                {text: 'OK'},
            ]);
            return <Text>😞</Text>;
        default: return (
            <View style={styles.viewContainer}>
            <AddRecipe
              visible={addRecipeModalVisible}
              handler={() => {
                setAddRecipeModalVisible(false);
              }}
            />
            {activeRecipe && currentOp === 'View Recipe' ? (
              <RecipeModal recipe={activeRecipe} handler={closeModal} />
            ) : null}
  
            {activeRecipe && currentOp === 'View Ratings' ? (
              <Ratings recipe={activeRecipe} handler={closeModal} />
            ) : null}
  
            {activeRecipe && currentOp === 'Add Rating' ? (
              <AddRating recipe={activeRecipe} handler={closeModal} />
            ) : null}
  
            {activeRecipe && currentOp === 'Edit Recipe' ? (
              <EditRecipe recipe={activeRecipe} handler={closeModal} />
            ) : null}
  
            <View style={styles.viewTop}>
              <Text style={styles.text}>{data.length} Recipes</Text>
              <Pressable
                style={styles.pressable}
                onPress={() => {
                  setAddRecipeModalVisible(true);
                }}>
                <Text>Add Recipe</Text>
              </Pressable>
            </View>
            <FlatList
              data={data}
              renderItem={renderRecipe}
              keyExtractor={extractKey}
            />
          </View>
  
        );
    }
};

const styles = StyleSheet.create({
    pressable: {
        backgroundColor: 'rgb(245,158,11)',
        borderRadius: 4,
        elevation: 2,
        marginHorizontal: 4,
        padding: 8,
    },
    text: {
        fontSize: 24, 
        fontWeight: 'bold'
    },
    viewContainer: {
        padding: 16,
    },
    viewTop: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default Recipes;