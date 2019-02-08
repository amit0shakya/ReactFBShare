import React from 'react';
import css from './Home.css';
//import doc from '../../images/doc.jpg';
import Helmet from 'react-helmet';
import {ReactTitle} from 'react-meta-tags';

import Navbar from '../Nav/Navbar';

class Home extends React.Component{
  constructor(){
    super()

    this.state={
        helmetCode:'nothing'
    }
  }

  componentDidMount(){
    var _parent = this
    setTimeout(function(){
      _parent.updateTags()
    },5000)
  }

  updateTags(){

    console.log("updateTags()")

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
            </div>
          </div>
      </div>
    )
  }
  
}

export default Home;