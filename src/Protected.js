import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Protected(props){

    let Cmp = props.testprop;
    
    const redirect = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('details')){
            redirect("/login");
        }
    })

    return (
        <div>
            {Cmp}
        </div>
    )
}
export default Protected;