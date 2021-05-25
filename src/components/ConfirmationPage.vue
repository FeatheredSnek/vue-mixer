<template>
  <div class="stage">

    <AppStageHeader name="Summary" :stage="4" />

    <div class="content-box">
      <h3>Your recipe</h3>
      <div>
        <p>Take a suitable container, preferably</p>
        <div class="flex">
          <img :src="publicPath + finalBottle.image" />
          <p>{{ finalBottle ? finalBottle.name : '' }}</p>
        </div>
      </div>
      <div>
        <p>For a base, use a liquified essence of</p>
        <div class="flex">
          <img :src="publicPath + finalEssence.image" />
          <p>{{ finalEssence ? finalEssence.name : '' }}</p>
        </div>
      </div>
      <div>
        <p>Then add the following ingredients</p>
        <p>
          {{ ingredientsList }}
        </p>
      </div>
    </div>

    <div class="mix">
      <button :disabled="locked" @click="mix()">
        <div :class="{spin: isMixing}">
          <p>MIX!</p>
        </div>
      </button>
    </div>

  </div>
</template>

<script>
import AppStageHeader from '@/components/AppStageHeader.vue'
import mix from '@/scripts/mix.js'

export default {
  name: 'ConfirmationPage',
  components: {
    AppStageHeader
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      isMixing: false
    }
  },
  props: {
    locked: {
      type: Boolean,
      required: true
    },
    finalBottle: Object,
    finalEssence: Object,
    finalIngredients: Array
  },
  computed: {
    ingredientsList() {
      let list = ''
      if (this.finalIngredients) {
        for (let i = 0; i < this.finalIngredients.length; i++) {
          list += this.finalIngredients[i].name
          if (i < this.finalIngredients.length - 1) {
            list += ', '
          }
        }
      }
      return list
    }
  },
  methods: {
    mix() {
      let finalEffects = []
      for (let ingredient of this.finalIngredients) {
        finalEffects = finalEffects.concat(ingredient.effects)
      }
      let mixSettings = {
        energy: this.finalBottle.energy,
        preparationTime: this.finalBottle.preparationTime,
        primaryEssence: this.finalEssence.primaryEssence,
        primaryEssenceStrength: this.finalEssence.primaryEssenceStrength,
        secondaryEssenceA: this.finalEssence.secondaryEssenceA,
        secondaryEssenceAStrength: this.finalEssence.secondaryEssenceAStrength,
        secondaryEssenceB: this.finalEssence.secondaryEssenceB,
        secondaryEssenceBStrength: this.finalEssence.secondaryEssenceBStrength,
        effects: finalEffects
      }
      this.$emit('lock')
      this.isMixing = true
      let results = mix(mixSettings)
      setTimeout(() => {
        this.$emit('displayResults', {results})
        document.querySelector("body").classList.add("overflow-hidden")
        this.isMixing = false
      }, 1000)
    }
  },
  emits: ['lock', 'displayResults']
}
</script>

<style scoped lang="scss">

.stage {
  padding-bottom: 0;
}

.flex {
  display: flex;
  align-items: center;
}

img {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

h3 {
  text-align: center;
  margin-bottom: 1rem;
}

p {
  margin: 0.5rem 0;
  font-size: 0.8rem;
}

p:first-child {
  color: $text-light;
}

.mix {
  margin: 2rem 0;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    background-color: $secondary;
    width: 8rem;
    height: 8rem;
    border-radius: 4rem;
    @include shadowed(24px);
    p {
      display:inline;
      line-height:8.5rem;
      height:100%;
      vertical-align:middle;
      color: $primary-light;
      font-weight: bold;
      font-size: 3rem;
    }
    div {
      width: 100%;
      height: 100%;
    }
    .spin {
      animation: spin 1s ease-in-out 1;
    }
  }
  button:enabled:hover {
    animation: shake 1.5s ease-out infinite both;
  }
}

@keyframes shake {
  0% {
    transform: rotate(0);
  }
  8% {
    transform: rotate(0);
  }
  15% {
    transform: rotate(0.15rad);
  }
  30% {
    transform: rotate(-0.15rad);
  }
  45% {
    transform: rotate(0.1rad);
  }
  60% {
    transform: rotate(-0.1rad);
  }
  75% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(0);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}

</style>
