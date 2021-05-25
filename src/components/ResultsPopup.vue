<template>
  <div class="popup">
    <div class="content-box">
      <AppStageHeader name="Results" :stage="5" />
      <p>
        Your potion, {{ description }}, has the following effects:
      </p>
      <ul>
        <li v-for="effect in effects" :key="effects.indexOf(effect)">
          {{ effect }}
        </li>
      </ul>
      <div class="button">
        <button @click="$emit('resetApp')"><div><p>Make another!</p></div></button>
      </div>
    </div>
  </div>
</template>

<script>
import AppStageHeader from '@/components/AppStageHeader.vue'

export default {
  name: 'ResultsPopup',
  components: {
    AppStageHeader
  },
  props: {
    description: {
      type: String,
      required: true
    },
    effects: {
      type: Array,
      required: true
    }
  },
  emits: ['resetApp'],
}
</script>

<style scoped lang="scss">
.popup {
  z-index: 5;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $shadow-dark;
  .content-box {
    margin:1.5rem;
    max-width: 32rem;
  }
}

p {
  text-align: justify;
}

.button {
  box-sizing: border-box;
  margin-top: 2rem;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  margin: auto;
  margin-bottom: 0.5rem;
  background-color: $secondary;
  width: 8rem;
  height: 8rem;
  border-radius: 4rem;
  @include shadowed(24px);
  p {
    display:inline;
    line-height:2rem;
    height:100%;
    vertical-align:middle;
    color: $primary-light;
    font-weight: bold;
    font-size: 1.6rem;
  }
}
button:hover {
  div {
    color: red;
    animation: jump 1.5s ease-out infinite both;
  }
}

@keyframes jump {
  0% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.1);
  }
  30% {
    transform: scale(0.95);
  }
  45% {
    transform: scale(1.1);
  }
  60% {
    transform: scale(0.95);
  }
  75% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
