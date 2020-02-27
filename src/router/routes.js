import HelloWorld from '../components/HelloWorld'
import Home from '../components/Home'
import Rank from '../components/Rank'
import Paper from '../components/Paper'

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
  }
  ];
