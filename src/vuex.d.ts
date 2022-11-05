// vuex.d.ts
// import { ComponentCustomProperties } from '@/vue'
// import { Store } from 'vuex';
import store from "./store/index";

declare module '@vue/runtime-core' {
  // declare your own store states
//   interface State {
    
//   }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    // $store: Store<State>
    $store: typeof store
  }
}