import { useEffect, useState } from "react";
import axios from "axios";

export const useContent=()=>{
    const [contents, setContents]=useState([]);
    const timerFunc=()=>{
        axios.get(
            "http://localhost:3000" + "/api/v1/user/contents/show",{
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            }
        ).then((response)=>{
            setContents(response.data.content)
            console.log(contents)     
        }
        )

    }
    useEffect(()=>{
        timerFunc();
        const timer=setInterval(()=>{
            timerFunc();
        }, 10*1000)
        return ()=>{
            clearInterval(timer)
        }
    }, []);
    useEffect(()=>{
        console.log(contents)
    }, [contents]);
    return {contents, timerFunc};
}