<template>
  <h2>
    <span>{{ name }}</span>
    <div class="dots">
      <div v-for="f in filled" :key="f" class="fill"></div>
      <div v-for="e in empty" :key="e" class="empty"></div>
    </div>
  </h2>
</template>

<script>
export default {
  name: 'AppStageHeader',
  props: {
    name: String,
    stage: Number
  },
  computed: {
    filled() {
      let count = new Array()
      for (let i = 0; i < this.stage; i++) {
        count.push(i)
      }
      return count
    },
    empty() {
      let count = new Array()
      for (let i = 0; i < (5 - this.stage); i++) {
        count.push(i)
      }
      return count
    }
  }
}
</script>

<style scoped lang="scss">

h2 {
  margin: 0 auto 2rem 0;
  text-align: left;
  font-weight: bold;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  span {
    display: block;
  }
  div {
    div {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 0.5rem;
      @include shadowed(8px);
      display: inline-block;
      margin-left: 0.2rem;
    }
    .empty {
      background-color: $primary-light
    }
    .fill {
      background-color: $secondary
    }
  }
}

</style>
