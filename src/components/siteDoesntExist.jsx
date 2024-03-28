import { useState } from "react"
import LogInForm from "./tryForm"

export default function SiteDoesntExist(){
    

const[style, setStyle] = useState({opacity: 10});
const[clicked , setClicked] = useState(false);

function handleClick(){
    setClicked(true);
    setStyle({opacity: 0});
}

    return(<div >
        <div style={style}>sorry, the site does not exist</div>
        <button style={style} onClick={()=>handleClick()}>to enter as a administrator</button>
        {clicked && <LogInForm></LogInForm> }

        
        </div>
    )
    
}