import {Module, VuexModule} from "vuex-module-decorators";

@Module({
    namespaced: true
})
export default class User extends VuexModule {

    isSignIn = false

};