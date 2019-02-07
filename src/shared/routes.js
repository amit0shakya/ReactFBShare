import Home from './Home/Home';
import Project from './Project/Project';
import Sharer from './Sharer/Sharer';
import Tnc from './Tnc/Tnc';
import Policy from './Policy/Policy';

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/project',
    component: Project
  },
  {
    path:'/sharer/:id',
    component:Sharer
  },
  {
    path:'/tnc',
    component:Tnc
  },
  {
    path:'/policy',
    component:Policy
  }

]

export default routes