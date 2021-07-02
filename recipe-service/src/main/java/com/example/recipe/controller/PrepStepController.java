package com.example.recipe.controller;

import com.example.recipe.model.Ingredient;
import com.example.recipe.model.PrepStep;
import com.example.recipe.repository.PrepStepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PrepStepController {

    @Autowired
    PrepStepRepository repo;

    @PostMapping("/prepsteps")
    public PrepStep addPrepStep(@RequestBody PrepStep prepstep) {
        return repo.save(prepstep);
    }

    @GetMapping("/prepsteps/{id}")
    public PrepStep getPrepStep(@PathVariable Integer id) {
        Optional<PrepStep> returnVal = repo.findById(id);
        if (returnVal.isPresent()) {
            return returnVal.get();
        } else {
            return null;
        }
    }

    @GetMapping("/prepsteps/recipe/{id}")
    public List<PrepStep> getPrepStepsByRecipe(@PathVariable Integer id) {
        return repo.findAllPrepStepsByRecipeId(id);
    }

    @PutMapping("/prepsteps")
    public void updatePrepStep(@RequestBody PrepStep prepStep) {
        repo.save(prepStep);
    }

    @DeleteMapping("/prepsteps/{id}")
    public void deletePrepStep(@PathVariable Integer id) {
        repo.deleteById(id);
    }
}
