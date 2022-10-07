import {useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
 import { userContext } from '../App';

const Logout = ()=>{

     const navigate = useNavigate();
      const {dispatch} = useContext(userContext);

     const startCalling = async()=>{
        const res = await fetch('/logout',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(res.status !== 200){
            throw new Error("Some erro occured during Logout");
        }else{
            console.log("logout successfully");
            dispatch({type:"LOGOUT",payload:false});
            navigate('/');
        }
     }

    useEffect(()=>{
         startCalling();
    },[]);
}

export default Logout;
