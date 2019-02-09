import React from 'react';
import css from './Home.css';
//import doc from '../../images/doc.jpg';
import Helmet from 'react-helmet';
import {ReactTitle} from 'react-meta-tags';
import { NavLink } from 'react-router-dom'

import Navbar from '../Nav/Navbar';

class Home extends React.Component{
  constructor(){
    super()

    this.state={
        helmetCode:'nothing'
    }

    this.getCode = this.getCode.bind(this)
  }

  componentDidMount(){
    var _parent = this
  }

  getCode(){
    window.location.href = "https://github.com/amit0shakya/reactfbshare";
  }


  render(){
    return (
      <div >
        <Navbar /> <br />
      
                <ReactTitle title="Amit Website Homepage" />

        <div className={css.wrapper}>
            <div className={css.bodyarea}>
              <h2>React to FB Share</h2>
              <h3>About</h3>
              <p>Hi My name is Amit, I am developing project using Reactjs SSR, Here I use React Helmet etc...</p>
              <button onClick={this.getCode}>Get Code</button>
              <NavLink to={'/project'} className={css.buttonface}>Project page</NavLink>
            </div>
          </div>
      </div>
    )
  }
}

export default Home;