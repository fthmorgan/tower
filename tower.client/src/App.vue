<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="text-light">
    Made by Faith
  </footer>
  
<ModalComponent id="createEventModal">
    <template #header>
      Create Event
    </template>

    <template #body>
      <TowerEventForm />
    </template>
</ModalComponent>

<ModalComponent id="createCommentModal">

    <template #header>
      Create Comment
    </template>

    <template #body>
      <CommentForm />
    </template>

  </ModalComponent>


</template>

<script>
  import { computed } from 'vue'
  import { AppState } from './AppState'
  import Navbar from './components/Navbar.vue'
  import ModalComponent from "./components/ModalComponent.vue"
  import TowerEventForm from "./components/TowerEventForm.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ModalComponent, TowerEventForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}

main {
  background: rgb(63,94,251);
background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(70,252,117,1) 100%);
font-family: 'Graduate', cursive;
font-family: 'Roboto Slab', serif;
}

footer {
  background-color: rgb(63, 94, 251);
  display: grid;
  place-content: center;
  height: 32px;
  font-family: 'Graduate', cursive;
  font-family: 'Roboto Slab', serif;

}



// button {
//   align-items: center;
//   appearance: none;
//   background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
//   border: 0;
//   border-radius: 6px;
//   box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
//   box-sizing: border-box;
//   color: #fff;
//   cursor: pointer;
//   display: inline-flex;
//   font-family: "JetBrains Mono",monospace;
//   height: 48px;
//   justify-content: center;
//   line-height: 1;
//   list-style: none;
//   overflow: hidden;
//   padding-left: 16px;
//   padding-right: 16px;
//   position: relative;
//   text-align: left;
//   text-decoration: none;
//   transition: box-shadow .15s,transform .15s;
//   user-select: none;
//   -webkit-user-select: none;
//   touch-action: manipulation;
//   white-space: nowrap;
//   will-change: box-shadow,transform;
//   font-size: 18px;
// }

// button:focus {
//   box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
// }

// button:hover {
//   box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
//   transform: translateY(-2px);
// }

// button:active {
//   box-shadow: #3c4fe0 0 3px 7px inset;
//   transform: translateY(2px);

// }
</style>
