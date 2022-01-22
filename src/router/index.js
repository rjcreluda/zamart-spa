import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Products from '../views/products/Products.vue'
import AddProduct from '../views/products/AddProduct.vue'
import EditProduct from '../views/products/EditProduct.vue'
import Categories from '../views/products/Categories.vue'
import Artisans from '../views/artisans/Artisans.vue'
import AddArtisan from '../views/artisans/AddArtisan.vue'
import ShowArtisan from '../views/artisans/ShowArtisan.vue'
import CommandList from '../views/commands/CommandList.vue'
import CommandDetail from '../views/commands/CommandDetail.vue'
import ListCustomer from '../views/customers/ListCustomer.vue'
import DetailCustomer from '../views/customers/DetailCustomer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/add',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/products/:id',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/commandes',
    name: 'Commands',
    component: CommandList
  },
  {
    path: '/commandes/:id',
    name: 'CommandDetail',
    component: CommandDetail
  },
  {
    path: '/artisans',
    name: 'Artisans',
    component: Artisans
  },
  {
    path: '/artisans/create',
    name: 'CreateArtisan',
    component: AddArtisan
  },
  {
    path: '/artisans/:id',
    name: 'ShowArtisan',
    component: ShowArtisan
  },
  {
    path: '/customers/:id',
    name: 'ShowCustomer',
    component: DetailCustomer
  },
  {
    path: '/customers',
    name: 'Customers',
    component: ListCustomer
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
