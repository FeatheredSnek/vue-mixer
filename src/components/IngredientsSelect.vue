<template>
  <div class="stage">
    <AppStageHeader name="Ingredients" :stage="3" />
    <IngredientItem
      v-for="ingredient in ingredientsData"
      :key="ingredient.id"
      :name="ingredient.name"
      :description="ingredient.description"
      :image="ingredient.image"
      :is-selected="isIngredientSelected(ingredient.id)"
      @click="locked ? '' : changeIngredientSelection(ingredient.id)"
    />
  </div>
</template>

<script>
import IngredientItem from '@/components/IngredientItem.vue'
import AppStageHeader from '@/components/AppStageHeader.vue'

export default {
  name: 'IngredientsSelect',
  components: {
    IngredientItem,
    AppStageHeader
  },
  props: {
    locked: {
      type: Boolean,
      required: true
    },
    ingredientsData: {
      type: Array,
      required: true
    },
    selectedIngredients: {
      type: Array,
      required: true
    }
  },
  methods: {
    isIngredientSelected(ingredientId) {
      if (this.selectedIngredients) {
        return (this.selectedIngredients.find(e => e === ingredientId) ? true : false)
      }
      else {
        return false
      }
    },
    changeIngredientSelection(ingredientId) {
      let isSelected = (this.selectedIngredients.find(e => e === ingredientId) ? true : false)
      if (isSelected) {
        this.$emit('ingredientRemoved',{removeId: ingredientId})
      }
      else {
        if (this.selectedIngredients.length >= 5) {
          this.$emit('ingredientsOverload')
        }
        else {
          this.$emit('ingredientAdded',{addId: ingredientId})
        }
      }
    }
  },
  emits: ['ingredientAdded', 'ingredientRemoved', 'ingredientsOverload'],
}
</script>

<style scoped>

</style>
