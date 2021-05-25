<template>
  <div class="item-box" :class="{ selected: isSelected }">
    <img :src="publicPath + image" />
    <div>
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EssenceItem',
  props: {
    id: Number,
    name: String,
    description: String,
    image: String,
    isSelected: Boolean
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    }
  }
}
</script>

<style scoped lang="scss">

.item-box {
  margin-bottom: 1rem;
}

</style>
