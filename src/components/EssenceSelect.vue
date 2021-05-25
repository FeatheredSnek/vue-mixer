<template>
  <div class="stage">
    <AppStageHeader name="Essence" :stage="2" />
    <EssenceItem
      v-for="essence in essencesData"
      :key="essence.id"
      :name="essence.name"
      :description="essence.description"
      :image="essence.image"
      :is-selected="essence.id === selectedEssenceId ? true : false"
      @click="locked ? '' : $emit('essenceChanged', {newId: essence.id})"
    />
  </div>
</template>

<script>
import EssenceItem from '@/components/EssenceItem.vue'
import AppStageHeader from '@/components/AppStageHeader.vue'

export default {
  name: 'EssenceSelect',
  components: {
    EssenceItem,
    AppStageHeader
  },
  props: {
    locked: {
      type: Boolean,
      required: true
    },
    essencesData: {
      type: Array,
      required: true
    },
    selectedEssenceId: {
      type: Number,
      required: false
    }
  },
  emits: ['essenceChanged'],
}
</script>

<style scoped lang="scss">

</style>
