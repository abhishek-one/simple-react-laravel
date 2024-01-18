import Header from './Header';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




function Login(){
    const redirect = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('details')){
            redirect("/add");
        }
    })
    return (
        <div>
           <Header />
            <h1>
             Login
            </h1>
        </div>
    )
}
export default Login;