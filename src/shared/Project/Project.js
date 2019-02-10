import React,{Component} from 'react'
import Navbar from '../Nav/Navbar';
import css from './project.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

var createjs, stage, label, shape, oldX, oldY, size, color, canvas;

class Project extends Component {

    constructor(){
        super()

        this.state = { 
            username:'',
            redirect:false,
            path:'',
            helmetcode:''
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
        stage.cache(0,0,600,300);

        console.log("Save image command goes to server")
        var _parent = this;

        axios.post('/saveimage', {
            imgdata: stage.getCacheDataURL()
          })
          .then(function (response) {

            _parent.id = response.data.id;

            console.log("Image write success from server")

            var sharePath='https://amit0shakyafbshare.herokuapp.com/serverdata/'+response.data.id+'/'
            window.location.href = sharePath;
            
          })

    }

    init() {

        createjs = window.createjs;

        canvas = document.getElementById('demoCanvas');

        stage = new createjs.Stage(canvas);
        stage.enableDOMEvents(true);

        var _rootCont = new createjs.Container()
        var _drawCont = new createjs.Container();
        
        stage.addChild(_rootCont);
        stage.addChild(_drawCont);

        var rect = new createjs.Graphics().beginStroke("red").beginFill('#fff5ed').drawRect(0, 0, 600, 300);
        var rectShape = new createjs.Shape(rect);

        _rootCont.addChild(rectShape)

        stage.update();
        
        console.log(_rootCont,"<<<_rootCont");

        label = new createjs.Text("Write Someting Here", "24px Arial");
        label.x = label.y = 10;

        shape = new createjs.Shape();
        _drawCont.addChild(shape, label);
        
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
            <div className={css.projectwrapper}> 
                <Navbar /> <br />
                {this.state.helmetcode}<br /> 
                {this.state.username}
                {this.state.redirect}

                <div className={css.wrapper}>
                    <div className={css.bodyarea}>
                    <h2>Project</h2>
                    <p>Draw Some random thing on Canvas otherwise make your Autograph and then click save
                        to save your artwork to server</p>
                            <canvas id="demoCanvas" width="600" height="300">
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