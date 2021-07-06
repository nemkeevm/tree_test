import { createStore } from 'vuex'

import {createTree, getBrands, createBrand, updateBrand, deleteBrand} from '@/js/filterArr'
export default createStore({
  state: {
    arrBrands: [],
    search: '',
    typeSort: 'A',
    arrTree: {}
  },
  getters: {
    getArrTree: state => {
      return state.arrTree
    }
  },
  mutations: {
    async setArrBrands(state, payload) {
      state.arrBrands = await payload.data
    },
    setArrTree(state) {
      state.arrTree = createTree(state.arrBrands, state.search, state.typeSort)
    },
    updateSearch(state, payload) {
      state.search = payload
      state.arrTree = createTree(state.arrBrands, state.search, state.typeSort)
    },
    updateTypeSort(state, payload) {
      state.typeSort = payload
      state.arrTree = createTree(state.arrBrands, state.search, state.typeSort)
    },
    updateActive(state, payload) {
      state.arrTree[payload]['active'] = !state.arrTree[payload]['active']
    }
  },
  actions: {
    async setArrBrands(state) {
      let arr = await getBrands()
      state.commit('setArrBrands', arr)
    },
    async createBrand({dispatch, state}, data){
      await createBrand(data.title, data.main)
      await dispatch('setArrBrands')
      await dispatch('setArrTree')
    },
    async setBrand({dispatch,state}, data) {
      await updateBrand(data._id, data.title, data.main)
      await dispatch('setArrBrands')
      await dispatch('setArrTree')
    },
    async deleteBrandById({dispatch, state}, data){
      await deleteBrand(data)
      await dispatch('setArrBrands')
      await dispatch('setArrTree')
    },
    setArrTree(state) {
      state.commit('setArrTree')
    },
    updateSearch(state, data) {
      state.commit('updateSearch', data)
    },
    updateTypeSort(state, data) {
      state.commit('updateTypeSort', data)
    },
    updateActive(state, data) {
      state.commit('updateActive', data)
    },
  },
})
