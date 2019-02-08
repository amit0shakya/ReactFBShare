import React ,{Component} from 'React';
import Img from 'react-image';
//import { FacebookProvider, Share } from 'react-facebook';


class Sharer extends Component{

    constructor(props){
        super(props)
        
        this.state={
            imgPath:'',
            fbBodyCode:''
        }
    }

    componentWillMount(){
        
        if(__isBrowser__){
            this.fbSetup()
        }
        
    }

    fbSetup(){

        this.setState({
          fbBodyCode:<div className="fb-share-button" data-href="https://amit0shakyafbshare.herokuapp.com/" data-layout="button_count" data-size="large" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Famit0shakyafbshare.herokuapp.com%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Share</a></div>,
          imgPath:'/serverdata/'+this.props.match.params.id+'/poster.jpg'
        })
    }


    render(){
        return(
            <div>
                Share this Image<br />
                <Img src={this.state.imgPath} />
                {this.state.fbBodyCode}
            </div>
        )
    }
}

export default Sharer;