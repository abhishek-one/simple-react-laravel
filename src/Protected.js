import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Protected(props){

    // let Cmp = props.testprops;
    
    // const redirect = useNavigate();

    // useEffect(()=>{
    //     if(!localStorage.getItem('details')){
    //         redirect("/login");
    //     }
    // })

    return (
        <div>
          {/* < Cmp /> */}
          Unathorised
        </div>
    )
}
export default Protected;