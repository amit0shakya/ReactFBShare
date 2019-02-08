import React ,{Component} from 'React';

class Preview extends Component{

    constructor(props){
        super(props)

        this.state={id}
    }

    componentWillMount(){

        this.setState({
            id:this.props.match.params.id
        })
    }

    render(){
        return(
            <div>
                this page got previewid - {this.state.id}
            </div>
        )
    }
}

export default Preview