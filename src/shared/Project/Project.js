import React,{Component} from 'react'
import Navbar from '../Nav/Navbar';
import css from './project.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

var createjs, stage, label, shape, oldX, oldY, size, color, canvas;

class Project extends Component {

    constructor(){
        super()

        this.state = { 
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

    saveImage(){
        stage.cache(0,0,500,300);

        var _parent = this;

        axios.post('/saveimage', {
            imgdata: stage.getCacheDataURL()
          })
          .then(function (response) {

            _parent.id = response.data.id;

            setTimeout(function(){
                var sharePath='https://amit0shakyafbshare.herokuapp.com/serverdata/'+response.data.id+'/'
                window.location.href = sharePath;
            },10000)

            //window.open('https://amit0shakyafbshare.herokuapp.com/serverdata/'+response.data.id+'/')
            //var path='/sharer/'+_parent.id;
            //var imagepath ='https://amit0shakyafbshare.herokuapp.com/serverdata/'+response.data.id+'/poster.jpg'

            /*
            _parent.setState({
                helmetcode: <MetaTags>
                    <title>Only4Laugh</title>
                    <meta property='og:url' content='https://amit0shakyafbshare.herokuapp.com' />
                    <meta property='og:type' content='website' />
                    <meta property='og:description' content='Amit Post Discription' />
                    <meta property='og:title' content='Amit Post Title' />
                    <meta property='og:image' content={imagepath} />
                    <meta property='og:image:width' content='500' />
                    <meta property='og:image:height' content='300' />
                    </MetaTags>,
                    username:"Amit Shakya",
                    redirect:true,
                    path:path
                })

                _parent.props.history.push(path)
            */
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

        if(this.state.redirect){
     
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
                    </div>
                </div>

            </div>
        )
    }
}

export default Project