<template>
  <div>    
    <h1 class="text-center">{{ towerEventProp.name }}</h1>

    <router-link :to="{name: 'TowerEvent', params: {eventId: towerEventProp.id}}" >
      <img class="img-fluid" :src="towerEventProp.coverImg">
    </router-link>
    
  </div>

    <h2>{{ towerEventProp.ticketCount }}</h2>
</template>


<script>
export default {

props: {
towerEventProp: {type: Object, required: true}
},

  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>