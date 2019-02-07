import React ,{Component} from 'React';
import Img from 'react-image';
//import { FacebookProvider, Share } from 'react-facebook';

var imgPath="nothing";

class Sharer extends Component{

    constructor(props){
        super(props)
        imgPath='/serverdata/'+props.match.params.id+'/poster.jpg';
    }

    render(){
        return(
            <div>
                Share this Image<br />
                <Img src={imgPath} />

                {/*}
                <FacebookProvider appId="576379196100963">
                    <Share href="http://www.facebook.com">
                    {({ handleClick, loading }) => (
                        <button type="button" disabled="loading" onClick={handleClick}>Share</button>
                    )}
                    </Share>
                </FacebookProvider>
                        */}
            </div>
        )
    }
}

export default Sharer;