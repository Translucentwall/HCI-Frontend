import HelloWorld from '../components/HelloWorld'
import Home from '../views/Home'
import Rank from '../views/Rank'
import Paper from '../views/Paper'
import AdminLogin from "../views/AdminLogin";
import Entity from "../views/Entity";
import Manage from "../views/Manage";
import Graph from "../views/Graph";

export let routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/hello',
    name: 'hello',
    component: HelloWorld
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  },
  {
    path: '/paper',
    name: 'Paper',
    component: Paper
  },
  {
    path: '/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin/manage',
    name: 'AdminManage',
    component: Manage
  },
  {
    path: '/entity',
    name: 'Entity',
    component: Entity
  },
  {
    path: '/graph',
    name: 'Graph',
    component: Graph
  }
  ];
