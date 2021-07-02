import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export default {
    // GET recipes
    getRecipes() {
        return axios.get(`${BASE_URL}/recipes`).then(res => res.data);
    },
    // POST recipe
    postRecipe(newRecipe) {
        return axios.post(`${BASE_URL}/recipes`, newRecipe).then(res => res.data);
    },
    // POST rating
    postRatings(newRating) {
        return axios.post(`${BASE_URL}/ratings`, newRating).then(res => res.data);
    },
    // PUT recipe(editedRecipe)
    putRecipe(editedRecipe) {
        return axios.put(`${BASE_URL}/recipes`, editedRecipe);
    },
    // PUT rating(editedRating)
    putRating(editedRating) {
        return axios.put(`${BASE_URL}/ratings`, editedRating);
    },
    // Delete recepe (recipeId)
    deleteRecipe(recipeId) {
        axios.delete(`${BASE_URL}/recipes/${recipeId}`);
    },
    // delete rating (ratingID)
    deleteRatings(rratingId) {
        axios.delete(`${BASE_URL}/ratings/${ratingId}`);
    }
};


