import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import api from '../api';

const calcAvgRating = (ratings) => {
    return (
        ratings.reduce(
          (totalNumStars, rating) => (totalNumStars += rating.numStars),
          0,
        ) / ratings.length
      );
    }
    
    const Recipe = ({recipe, modalOpener}) => {
        const viewContainerStyle = {
            ...StyleSheet.viewContainer,
            width: useWindowDimensions().width,
        };

        const queryClient = useQueryClient();

        const mutation = useMutation(api.deleteRecipe, {
            onSuccess: () => {
                queryClient.invalidateQueries('recipes');
            },
        });

        return (
            <View style={viewContainerStyle}>
                <View style={StyleSheet.row}>
                    <Pressable
                    style={({pressed}) => [
                        {
                            backgroundColor: pressed ?
                            'rgb(251, 191, 36)' :
                            'rgb(253, 230, 138)'
                        },
                        [styles.pressable, styles.pressableEditRecipe],
                    ]}
                    onPress={() => {
                        modalOpener(recipe, 'Edit Recipe');
                    }}>
                        <Text style={styles.textEditRecipe}>Edit this Recipe</Text>
                    </Pressable>
                    <Pressable
                        style={({pressed}) => [
                            {
                                backgroundColor: pressed ?
                                'rgb(220, 38, 38)' :
                                'rgb(248, 113, 113)'
                            },
                            [styles.pressable, styles.pressableEditRecipe],
                        ]}
                        onPress={() => mutation.mutate(recipe.recipeId)}>
                            <Text style={styles.textPressable}>🔥 Delete This Recipe</Text>
                        </Pressable>
                        </View>
      <Text style={styles.textTitle}>
        {recipe.title} - {recipe.category}
      </Text>
      <Text style={styles.text}>
        Rating:{' '}
        {recipe.ratings.length
          ? `${calcAvgRating(recipe.ratings).toFixed(2)} / 5`
          : 'N/A'}{' '}
        - {recipe.ratings.length} rating(s)
      </Text>
      <Text style={styles.text}>{recipe.description}</Text>
      <Text style={styles.text}>Prep Time: {recipe.prepTime}</Text>
      <Text style={styles.text}>👨🏾‍🍳 Time: {recipe.cookTime}</Text>
      <Text style={styles.text}>Serves {recipe.servings}</Text>
      <View style={styles.viewButtons}>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed
                ? 'rgb(4, 120, 87)'
                : 'rgb(16, 185, 129)',
            },
            [styles.pressable, styles.pressableRecipe],
          ]}
          onPress={() => {
            modalOpener(recipe, 'View Recipe');
          }}>
          <Text style={styles.textPressable}>View Recipe</Text>
        </Pressable>

        {recipe.ratings.length ? (
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed
                  ? 'rgb(37, 99, 235)'
                  : 'rgb(96, 165, 250)',
              },
              [styles.pressable, styles.pressableRecipe],
            ]}
            onPress={() => {
              modalOpener(recipe, 'View Ratings');
            }}>
            <Text style={styles.textPressable}>View Ratings</Text>
          </Pressable>
        ) : null}

        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(180, 83, 9)' : 'rgb(217,119,6)',
            },
            styles.pressable,
          ]}
          onPress={() => {
            modalOpener(recipe, 'Add Rating');
          }}>
          <Text style={styles.textPressable}>Add Rating</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 4,
    elevation: 2,
    marginRight: 16,
    padding: 8,
  },
  pressableEditRecipe: {
    marginBottom: 8,
  },
  pressableRecipe: {
    color: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    marginVertical: 4,
  },
  textEditRecipe: {
    textAlign: 'center',
  },
  textPressable: {
    color: 'white',
  },
  textTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  viewButtons: {
    flexDirection: 'row',
  },
  viewContainer: {
    borderBottomColor: 'darkslateblue',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

export default Recipe;

