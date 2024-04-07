import { useState } from "react"
import LogInForm from "./login"
import { useNavigate } from "react-router-dom";

export default function SiteDoesntExist() {

    const nav = useNavigate();

    // const[style, setStyle] = useState({opacity: 10});
    const [clicked, setClicked] = useState(false);

    function handleClick() {
        setClicked(true);
        setStyle({ opacity: 0 });
    }

    

    return (<div >
        <div>welcome! <br></br> the site does not exist</div>
        <button onClick={() => { nav = ('/') }}>Let's build your site...</button>
        {/* <button style={style} onClick={()=>handleClick()}>Let's build your site...</button> */}

        {/* {clicked && <LogInForm></LogInForm>} */}


    </div>
    )

}