import React,{Component} from 'react'
import Navbar from '../Nav/Navbar';
import css from './project.css';
import axios from 'axios';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom'

var createjs, stage, label, shape, oldX, oldY, size, color, canvas;

class Project extends Component {

    constructor(){
        super()

        this.state ={ 
            username:'',
            redirect:false,
            path:'',
            helmetcode:'',
        };
        this.saveImage=this.saveImage.bind(this);
    }

    componentWillMount(){
        if(__isBrowser__){

        }
    }

    componentDidMount(){
        if(__isBrowser__){

            var _parent = this;
            setTimeout(function(){
                _parent.init()
            },500)
        }
    }

    resetCanvas(){
        console.log("Reset canvas")
    }

    saveImage(){
        stage.cache(0,0,500,300);

        var _parent = this;

        axios.post('/saveimage', {
            imgdata: stage.getCacheDataURL()
          })
          .then(function (response) {

            console.log("------save image Response AA-----")

            _parent.id = response.data.id;
            
            var path='/sharer/'+_parent.id;
                //setTimeout(_parent.openSharerPage(path),15000)

            var imagepath ='https://amit0shakyafbshare.herokuapp.com/serverdata/'+response.data.id+'/poster.jpg'

            _parent.setState({
                helmetcode: <Helmet
                    title="Only4Laugh"
                    meta={[
                        {property: 'og:url', content: 'https://amit0shakyafbshare.herokuapp.com'},
                        {property: 'og:type', content: 'website'},
                        {property: 'og:title', content: 'Amit Post Title'},
                        {property: 'og:description', content: 'Amit Post Discription'},
                        {property: 'og:image', content: imagepath},
                        {property: 'og:image:width', content: '500'},
                        {property: 'og:image:height', content: '300'}
                    ]} />,
                    username:"Amit Shakya",
                    redirect:true,
                    path:path
                })
            
          })

    }

    openSharerPage(path){
        
        this.Path=path;

        this.setState({
            redirect:true
        })
    }

    init() {

        createjs = window.createjs;

        canvas = document.getElementById('demoCanvas');

        stage = new createjs.Stage(canvas);
        stage.enableDOMEvents(true);

        label = new createjs.Text("Write Someting Here", "24px Arial");
        label.x = label.y = 10;

        shape = new createjs.Shape();
        stage.addChild(shape, label);
        
        // set up our defaults:
        color = "#0FF";
        size = 2;
        var draw = false;
        
        // add handler for stage mouse events:
        stage.on("stagemousedown", function(event) {
            size = 10;
            draw=true;
        })                
        
        stage.on("stagemouseup", function(event) {
            color = createjs.Graphics.getHSL(Math.random()*360, 100, 50);
            size = 2;
            draw=false;
        })
         
        stage.on("stagemousemove",function(evt) {
            if ((oldX)&&(draw)) {
                shape.graphics.beginStroke(color)
                              .setStrokeStyle(size, "round")
                              .moveTo(oldX, oldY)
                              .lineTo(evt.stageX, evt.stageY);
                stage.update();
            }
            oldX = evt.stageX;
            oldY = evt.stageY;
        })
        
        stage.update();
    }

    render(){

        console.log(this.state.redirect,"<<<<<sharer 0000");

        if(this.state.redirect){
            console.log(this.state.redirect,"<<<<<sharer");
            <Redirect to="/sharer" /> 
        }

        return(
            <div> 
                <Navbar /> <br />
                {this.state.helmetcode}<br /> 
                {this.state.username}
                {this.state.redirect}
                <div className={css.wrapper}>
                    <div className={css.bodyarea}>
                    <h2>Project</h2>
                    <p>Draw Some random thing on Canvas otherwise make your Autograph and then click save
                        to save your artwork to server</p>
                            <canvas id="demoCanvas" width="500" height="300">
                                alternate content
                            </canvas>
                            <button onClick={this.saveImage}>Save Image</button>
                            
                            <NavLink to={this.state.path}>Share page</NavLink>
                    </div>
                </div>

            </div>
        )
    }
}

export default Project