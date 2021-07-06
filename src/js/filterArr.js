const axios = require('axios').default;

let getBrands = ()=> {
	return axios.get('https://recruting-test-api.herokuapp.com/api/v1/brands')
}

let createBrand = (title,main) => {
	axios.post('https://recruting-test-api.herokuapp.com/api/v1/brands',{
		title: title,
		main: main
	})
}

let updateBrand = (id,title,main) => {
	if(id){
		axios.put(`https://recruting-test-api.herokuapp.com/api/v1/brand/${id}`,{
			title,
			main
		}).then(n=>{
			console.log(n)
		})
	}
}

let deleteBrand = id => {
	axios.delete(`https://recruting-test-api.herokuapp.com/api/v1/brand/${id}`)
}

let createTree = (arr, str, typeSort)=>{
	let tree = {}
	if(str != '') {
		let newArr = arr.filter(n=>{
			return n.title.toUpperCase().indexOf(str.toUpperCase()) !== -1
		})
		arr = newArr
	} 
	arr.forEach(n => {
			let fs = n.title.toUpperCase()[0]
			if(!(fs in tree)){
			tree[fs] = {
					list: [],
					active: false
			}
			}
			tree[fs]['list'].push({
			...n
			})
	})
	if (typeSort == 'A') {
		for (let key in tree) {
			tree[key]['list'] = sortBrands(tree[key]['list'])
		}
	} else {
		for (let key in tree) {
			tree[key]['list'] = sortBrands(tree[key]['list']).reverse()
		}
	}
	return tree
}

let sortBrands = arr=> {
	arr.sort(function(a,b) {
		var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase()
		if (nameA < nameB)
		return -1
		if (nameA > nameB)
		return 1
		return 0
	})
	return arr
}

export {
    createTree,
		getBrands,
		createBrand,
		updateBrand,
		deleteBrand
}