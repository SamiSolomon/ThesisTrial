import "./facility.css";
 
import {Component} from "react"
class FacilityData extends Component {
    render(){
        return(
            <div>

                <h1>{this.props.heading}</h1>
                <p>{this.props.text}</p>
            </div>


        )
    }

}
export default FacilityData;