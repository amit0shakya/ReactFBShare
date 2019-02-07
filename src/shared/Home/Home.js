import React from 'react';
import css from './Home.css';
//import doc from '../../images/doc.jpg';
import Helmet from 'react-helmet';

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
        <Helmet>
                <title>Amit Website Homepage</title>
        </Helmet>

        <div className={css.wrapper}>
            <div className={css.bodyarea}>
              <h2>React to FB Share</h2>
              <h3>About</h3>
              <p>Hi My name is Amit, I am developing project using Reactjs, this is a prototype pice of my project.
                This project is Developed using javascript technology tools ReactJS+Nodejs, Agenda of this prototype is
                user can develop art and share it to his facebook wall. We want freelancer must do this purly Reactjs and 
                it's opensource technology, We dn't recommend to add prerender or other paid tools, beacause I want to run
                this project free of cost.
              </p>
            </div>
          </div>
      </div>
    )
  }
  
}

export default Home;