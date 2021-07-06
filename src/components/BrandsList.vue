<template>
 
  <div>
    <div style="position: fixed; top:0; right: 0" v-if="editBrand._id">
      <input type="text" v-model="editBrand.title">
      <br>
      <input type="radio" :value=true v-model="editBrand.main" id="true">
      <label for="true">true</label>
      <input type="radio" :value=false v-model="editBrand.main" id="false">
      <label for="false">false</label>
      <br>
      <button @click="setBrandInForm(editBrand)">Сохранить</button>
      <button @click="clearForm">Очистить</button>

    </div>
    <div style="position: fixed; top:200px; right: 0">
      <span>Создать новый элемент</span>
      <input type="text" v-model="newBrand.title">
      <br>
      <input type="radio" :value=true v-model="newBrand.main" id="true">
      <label for="true">true</label>
      <input type="radio" :value=false v-model="newBrand.main" id="false">
      <label for="false">false</label>
      <br>
      <button @click="createBrandInForm(newBrand)">Сохранить</button>
      <button @click="clearBrandInForm">Очистить</button>
    </div>
    <div>
      <input type="text" v-model="search">
      <button @click="search = ''">X</button>
    </div>
    <div>
      <input type="radio" value="A" v-model="typeSort" id="AZ">
      <label for="AZ">A-Z</label>
      <input type="radio" value="Z" v-model="typeSort" id="ZA">
      <label for="ZA">Z-A</label>
    </div>
    <section v-for="(item, i) in getArrTree" :key="i">
      <div>
        <span>{{i}} ({{item.list.length}})</span>
        <button v-if="item.active" @click="toogleActive(i)">&gt&gt</button>
        <button v-else @click="updateActive(i)"> &lt&lt </button>
      </div>
      <ul v-if="item.active">
        <li v-for="brand in item.list" :key="brand._id">
          <span>{{brand.title}}(main:{{brand.main}})</span>
          <button @click="updateBrand(brand)">Редактировать</button>
          <button @click="deleteBrand(brand)">Удалить</button>
        </li>
      </ul>
      <ul v-else>
        <li v-for="brand in smallList(item.list)" :key="brand.id">
          <span>{{brand.title}}(main:{{brand.main}})</span>
          <button @click="updateBrand(brand)">Редактировать</button>
          <button @click="deleteBrand(brand)">Удалить</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'BrandsList',
  data() {
    return {
      search: '',
      typeSort: 'A',
      editBrand: {
        _id: null,
        title: '',
        main: false
      },
      newBrand: {
        title: '',
        main: false
      }
    }
  },
  async mounted() {
    await this.setArrBrands()
    await this.setArrTree()
  },
  computed: {
    ...mapGetters([
      'getArrTree'
    ])
  },
  watch: {
    search: function(val) {
      this.updateSearch(val)
    },
    typeSort: function() {
      this.updateTypeSort(this.typeSort)
    }
  },
  methods: {
    ...mapActions([
      'setArrBrands',
      'setArrTree',
      'updateSearch',
      'updateTypeSort',
      'updateActive',
      'createBrand',
      'setBrand',
      'deleteBrandById'
    ]),
    async createBrandInForm(brand) {
      await this.createBrand(brand)
      await this.setArrBrands()
      await this.setArrTree()
      this.clearBrandInForm()
    },
    async setBrandInForm(brand) {
      await this.setBrand(brand)
      await this.setArrBrands()
      await this.setArrTree()
      this.clearBrandInForm()
    },
    clearBrandInForm() {
      this.newBrand = {
        title: '',
        main: false
      }
      this.editBrand = {
        _id: null,
        title: '',
        main: false
      }
    },
    updateBrand({_id,title,main}){
      this.editBrand._id = _id
      this.editBrand.title = title
      this.editBrand.main = main
    },
    async deleteBrand(brand){
      let question = await confirm(`Вы уверены в удалении ${brand.title}?`)
      if(question) {
        await this.deleteBrandById(brand._id)
        await this.setArrBrands()
        await this.setArrTree()
      }
    },
    clearForm(){
      this.editBrand = {
        id: null,
        title: '',
        main: false
      }
    },
    smallList(arr) {
      let mainTrue = []
      let mainFalse = []
      arr.forEach(n=>{
        n.main ? mainTrue.push(n) : mainFalse.push(n)
      })
      if(mainTrue.length && mainTrue.length <= 5){
        return mainTrue
      } else if(mainTrue.length) {
        return mainTrue.slice(0,5)
      } else if(mainFalse <= 5) {
        return mainFalse
      } else{
        return mainFalse.slice(0,5)
      }
    },
    toogleActive(i){
      this.updateActive(i)
    },
  },
}
</script>

