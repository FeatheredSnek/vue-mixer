<template>

  <transition name="fade">
    <div class="overlay" v-show="overlayDisplayStatus">
      <h1>{{ overlayMessage }}</h1>
    </div>
  </transition>

  <transition name="slide-fade">
    <div class="toast" v-if="warning.isActive">
      <div>
        {{ warning.message }}
      </div>
    </div>
  </transition>

  <transition name="fade">
    <ResultsPopup
    v-if="results.description != ''"
    :description="results.description"
    :effects="results.effects"
    @reset-app="resetApp()"
    />
  </transition>

  <transition name="nav-slide">
    <nav class="top" v-if="navDisplayStatus">
      <button @click="navigationAdvance()" :class="{ press: navAnimateStatus }" :disabled="!staticData"></button>
    </nav>
  </transition>

  <div class="stage-container" ref="landing">
    <div class="stage">
      <header>
        <h1 class="koza"><span>vue</span>Mixer</h1>
        <h5>Straightforward alchemy app</h5>
      </header>
      <div class="content-box landing">
        <div v-if="staticData">
          <p>There are only four simple steps between you and your strongest potions!</p>
          <ul>
            <li>Choose a container</li>
            <li>Choose an essence</li>
            <li>Add 1-5 ingredients</li>
            <li>Mix it up</li>
          </ul>
          <p>Click below to begin</p>
        </div>
        <div v-else>
          <p>Data error!</p>
          <p>vueAlchemy API is not responding or the data received is invalid</p>
        </div>
      </div>
    </div>
  </div>

  <div class="stage-container" ref="bottleSelect">
    <BottleSelect
      v-if="currentStep >= 1"
      :locked="lockStatus"
      :bottles-data="staticData.bottles"
      @bottle-changed="currentBottleId = $event.newId"
    />
  </div>

  <div class="stage-container" ref="essenceSelect">
    <EssenceSelect
      v-if="currentStep >= 2"
      :locked="lockStatus"
      :essences-data="staticData.essences"
      :selected-essence-id="currentEssenceId"
      @essence-changed="currentEssenceId = $event.newId"
    />
  </div>

  <div class="stage-container" ref="ingredientsSelect">
    <IngredientsSelect
      v-if="currentStep >= 3"
      :locked="lockStatus"
      :ingredients-data="staticData.ingredients"
      :selected-ingredients="currentIngredientsIds"
      @ingredient-added="currentIngredientsIds.push($event.addId)"
      @ingredient-removed="currentIngredientsIds.splice(currentIngredientsIds.indexOf($event.removeId), 1)"
      @ingredients-overload="displayWarning(2000, 'Cannot add more than 5 ingredients!')"
    />
  </div>

  <div class="stage-container" ref="confirmationPage">
    <ConfirmationPage
      v-if="currentStep >= 4"
      :locked="lockStatus"
      :final-bottle="staticData.bottles.find(b => b.id === currentBottleId)"
      :final-essence="staticData.essences.find(e => e.id === currentEssenceId)"
      :final-ingredients="staticData.ingredients.filter(i => currentIngredientsIds.find(id => id === i.id))"
      @lock="lockStatus = true"
      @display-results="results = $event.results"
    />
  </div>

</template>

<script>
import dummydata from '@/data/dummydata.js'
import validate from '@/scripts/validator.js'
import BottleSelect from '@/components/BottleSelect.vue'
import EssenceSelect from '@/components/EssenceSelect.vue'
import IngredientsSelect from '@/components/IngredientsSelect.vue'
import ConfirmationPage from '@/components/ConfirmationPage.vue'
import ResultsPopup from '@/components/ResultsPopup.vue'

export default {
  name: 'App',
  components: {
    BottleSelect,
    EssenceSelect,
    IngredientsSelect,
    ConfirmationPage,
    ResultsPopup
  },
  setup() {
    const inputData = dummydata
    const staticData = validate(inputData)
    return { staticData }
  },
  mounted() {
    this.createObserver()
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      lockStatus: false,
      currentStep: 0,
      currentBottleId: null,
      currentEssenceId: null,
      currentIngredientsIds: [],
      navAnimateStatus: false,
      navDisplayStatus: true,
      warning: {
        isActive: false,
        message: ''
      },
      results: {
        description: '',
        effects: []
      },
      overlayDisplayStatus: false,
      overlayMessage: ''
    }
  },
  methods: {
    navigationAdvance() {
      switch (this.currentStep) {
        case 0:
          this.currentBottleId = this.staticData.bottles[0].id
          this.currentStep += 1
          this.navigationScrollToNextStage()
          break
        case 1:
          this.currentStep += 1
          this.navigationScrollToNextStage()
          break
        case 2:
          if (this.currentEssenceId === null) {
            this.displayWarning(2000, 'Choose an essence!')
          }
          else {
            this.currentStep += 1
            this.navigationScrollToNextStage()
          }
          break
        case 3:
          if (this.currentIngredientsIds.length < 1) {
            this.displayWarning(2000, 'Choose at least one ingredient!')
          }
          else {
            this.currentStep += 1
            this.navigationScrollToNextStage()
          }
          break
        case 4:
          this.navigationScrollToNextStage()
          break
        default:
          return
      }
    },
    navigationScrollToNextStage() {
      this.navAnimateStatus = true
      setTimeout(() => this.navAnimateStatus = false, 500)
      let currentStageBoundingRect = this.$refs[this.$options.stageRefIdentifiers[this.currentStep]].getBoundingClientRect()
      let scrollSettings = {
        top: window.scrollY + currentStageBoundingRect.bottom,
        left: 0,
        behavior: 'smooth'
      }
      setTimeout(() => window.scroll(scrollSettings), 100)
    },
    displayWarning(duration, message) {
      if (!this.warning.isActive) {
        this.warning.isActive = true
        this.warning.message = message
        setTimeout(() => this.warning.isActive = false, duration)
      }
      else {
        return
      }
    },
    createObserver() {
      let observer
      let observerOptions = {
        root: null,
        rootMargin: '10px',
        threshold: 0.1
      }
      observer = new IntersectionObserver(this.intersectCallback, observerOptions)
      observer.observe(this.$refs.confirmationPage)
    },
    intersectCallback(entries, observer) {
      if (entries[0].isIntersecting && this.currentStep == 4) {
        this.navDisplayStatus = false
      }
      if (!entries[0].isIntersecting) {
        this.navDisplayStatus = true
      }
    },
    resetApp() {
      this.overlayMessage = 'Cleaning the apparatus...'
      this.overlayDisplayStatus = true
      setTimeout(() => this.resetData(), 1000)
      setTimeout(() => this.navigationAdvance(), 1000)
      setTimeout(() => {
        this.overlayDisplayStatus = false;
        document.querySelector("body").classList.remove("overflow-hidden")},
        2000)
    },
    resetData() {
      this.lockStatus = false
      this.currentStep = 0
      this.currentBottleId = null
      this.currentEssenceId = null
      this.currentIngredientsIds = []
      this.navAnimateStatus = false
      this.navDisplayStatus = true
      this.warning = {
        isActive: false,
        message: ''
      }
      this.results = {
        description: '',
        effects: []
      }
    }
  },
  stageRefIdentifiers: ['landing', 'bottleSelect', 'essenceSelect', 'ingredientsSelect', 'confirmationPage']
}
</script>

<style lang="scss">
@import 'styles/global.scss';

.app-container {
  margin: auto;
  max-width: 24rem;
}

nav {
  @include filter-shadowed(24px);
  height: 5rem;
  width: 100%;
  margin-bottom: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 3;
  background-image: url('../src/assets/nav-inset-big.svg');
  background-size: auto 5rem ;
  background-position: top center;
  background-repeat: no-repeat;
  button {
    @include shadowed(24px);
    display: block;
    margin: auto;
    width: 4rem;
    height: 4rem;
    border-radius: 4rem;
    border: none;
    background-color: $secondary;
    background-image: url('../src/assets/nav-down.svg');
    background-size: 50%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    position: relative;
    top: -1.25rem;
  }
  button:disabled {
    background-image: url('../src/assets/nav-error.svg');
  }
  button:enabled:hover {
    animation: wiggle 1.5s ease-out infinite both;
  }
}

.landing {
  font-size: 1.2rem;
  p {
    margin: 0.5rem auto;
    font-weight: bold;
    text-align: center;
    color: $text-dark;
  }
  li {
    font-weight: normal;
    color: $text-light;
  }
}

h1 {
  span {
    color: $secondary;
  }
}

header {
  margin-bottom: 2rem;
}

.toast {
  position: fixed;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  div {
    width: calc(100% - 5rem);
    max-width: 32rem;
    margin: auto;
    margin-top: 2rem;
    padding: 1rem;
    text-align: center;
    color: $primary-light;
    background-color: $secondary;
    @include shadowed(24px);
    border-radius: $corners;
  }
}

.overlay {
  z-index: 6;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: $secondary;
  display: flex;
  align-items: center;
  h1 {
    width: 100%;
    color: $primary-light;
    margin: auto;
    text-align: center;
    vertical-align: center;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-3rem);
  opacity: 0;
}

.nav-slide-enter-active {
  transition: all 0.3s ease-out;
}

.nav-slide-leave-active {
  transition: all 0.3s ease-in;
}

.nav-slide-enter-from,
.nav-slide-leave-to {
  transform: translateY(6.5rem);
}

.fade-enter-active {
  transition: all 0.5s ease-out;
}

.fade-leave-active {
  transition: all 0.5s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes wiggle {
  0% {
    background-position: 50% 50%;
  }
  15% {
    background-position: 50% 60%;
  }
  30% {
    background-position: 50% 45%;
  }
  45% {
    background-position: 50% 60%;
  }
  60% {
    background-position: 50% 48%;
  }
  75% {
    background-position: 50% 50%
  }
  100% {
    background-position: 50% 50%;
  }
}


</style>
