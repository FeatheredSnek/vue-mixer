<template>
  <div class="stage">

    <AppStageHeader name="Bottle" :stage="1" />

    <div class="wide-content">
      <button :disabled="locked" @click="cycleBottles('left')" class="left" :class="buttonAnimations['left']">&lt;</button>
      <div class="content-box bottle-box" :class="animationClass">
        <div>
          <h3>{{ bottlesData[previewIndex].name }}</h3>
          <h5>{{ bottlesData[previewIndex].type }}</h5>
        </div>
        <div>
          <img :src="publicPath + bottlesData[previewIndex].image" />
        </div>
        <p>
          {{ bottlesData[previewIndex].description }}
        </p>
      </div>
      <button :disabled="locked" @click="cycleBottles('right')" class="right" :class="buttonAnimations['right']">&gt;</button>
    </div>

  </div>
</template>

<script>
import AppStageHeader from '@/components/AppStageHeader.vue'

export default {
  name: 'BottleSelect',
  components: {
    AppStageHeader
  },
  props: {
    locked: {
      type: Boolean,
      required: true
    },
    bottlesData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      previewIndex: 0,
      animationClass: '',
      animationPlaying: false,
      buttonAnimations: {
        right: '',
        left: ''
      }
    }
  },
  methods: {
    cycleBottles(direction) {
      if (!this.animationPlaying) {
        this.animationPlaying = true
        this.animationClass = `swipe-${direction}`
        this.buttonAnimations[direction] = 'press'
        setTimeout(() => this.updateBottleData(direction), 500)
        setTimeout(() => this.unlockAnimation(), 1100)
      }
    },
    updateBottleData(direction) {
      if (direction === 'right') {
        if (this.previewIndex === this.bottlesData.length - 1) {
          this.previewIndex = 0
        }
        else {
          this.previewIndex += 1
        }
      }
      else if (direction === 'left') {
        if (this.previewIndex === 0) {
          this.previewIndex = this.bottlesData.length - 1
        }
        else {
          this.previewIndex -= 1
        }
      }
      this.$emit('bottleChanged', {newId: this.bottlesData[this.previewIndex].id})
    },
    unlockAnimation() {
      this.animationPlaying = false
      this.animationClass = ''
      this.pressPlaying = false
      this.buttonAnimations['left'] = ''
      this.buttonAnimations['right'] = ''
    },
    press() {
      return 'press'
    }
  },
  emits: ['bottleChanged'],
}
</script>

<style scoped lang="scss">

.wide-content {
  width: calc(100% + 4rem);
  position: relative;
  right: 2rem;
  display: flex;
  align-items: center;
}

.bottle-box {
  height: 22rem;
}

h3 {
  text-align: center;
}

img {
  display: block;
  margin: 1rem auto;
  width: 6rem;
  height: 6rem;
}

p {
  text-align: justify;
  margin: 1rem auto;
  font-size: 0.8rem;
  font-weight: normal;
}

button {
  z-index: 2;
  width: 3rem;
  height: 3rem;
  min-width: 3rem;
  min-height: 3rem;
  border-radius: 3rem;
  background: $primary-light;
  @include shadowed(24px);
  font-size: 2rem;
  font-weight: bold;
  color: $secondary;
}

.right {
  position: relative;
  left: -1rem;
}

.left {
  position: relative;
  left: 1rem;
}

.swipe-right {
  animation-name: moveright, fade;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
}

.swipe-left {
  animation-name: moveleft, fade;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
}

@keyframes moveright {
  0% {
    transform: translateX(0);
  }
  48% {
    transform: translateX(2rem);
  }
  52% {
    transform: translateX(-2rem);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes moveleft {
  0% {
    transform: translateX(0);
  }
  48% {
    transform: translateX(-2rem);
  }
  52% {
    transform: translateX(2rem);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  45% {
    opacity: 0;
  }
  55% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
