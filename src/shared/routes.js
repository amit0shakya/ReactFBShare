import Home from './Home/Home';
import Project from './Project/Project';
import Sharer from './Sharer/Sharer';
import Tnc from './Tnc/Tnc';
import Policy from './Policy/Policy';
import FBtest from './FBtest/FBtest';
import Preview from './Preview/preview';

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
    path:'/fbtest',
    component:FBtest
  },
  {
    path:'/tnc',
    component:Tnc
  },
  {
    path:'/policy',
    component:Policy
  },
  {
    path:'/preview/:id',
    component:Preview
  }

]

export default routes