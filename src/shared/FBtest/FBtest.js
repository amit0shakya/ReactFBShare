import React,{Component} from 'react';
import MetaTags from 'react-meta-tags';

class FBtest extends Component{

    render(){
        return(
            <div>

                    <MetaTags>
                        <title>FBShareTest</title>
                        <meta property='og:url' content='https://amit0shakyafbshare.herokuapp.com' />
                        <meta property='og:type' content='website' />
                        <meta property='og:description' content='Amit test post Share' />
                        <meta property='og:title' content='Amit Post Title' />
                        <meta property='og:image' content='https://amit0shakyafbshare.herokuapp.com/serverdata/6nft2yi5ur944uv-8-1-2019-3-27-803/poster.jpg' />
                        <meta property='og:image:width' content='500' />
                        <meta property='og:image:height' content='300' />
                    </MetaTags>
            </div>
        )
    }
}

export default FBtest;