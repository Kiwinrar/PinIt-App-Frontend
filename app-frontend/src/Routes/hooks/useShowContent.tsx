import { useEffect, useState } from "react";
import axios from "axios";
interface inputType{
     titleReference?: string | undefined | null;
}
type contentType={
    _id: string,
    type: "document" | "youtube" | "twitter",
    info: string, 
    title: string,
    link: string
}
export const useShowContent=(props: inputType)=>{
    const [openContents, setOpenContents]=useState<(contentType | string)[]>([]);
    const loader:string="Loading..."
    let title=props.titleReference
    const timerFuncOpenContents=()=>{
        axios.get(
            "http://localhost:3000" + "/api/v1/user/contents/showOne",
            {
                params: {
                    title
                },
                headers:{
                    'authorization': localStorage.getItem('token')
                }
            }
        ).then((response)=>{
            console.log("APi response", response.data);
            const content=response.data.content
            setOpenContents(content && [content]);
            console.log('this is the response'+response.data.content)
        }
        )

    }
    useEffect(()=>{
        setOpenContents([loader])
        const timer=setTimeout(()=>{
            timerFuncOpenContents()
        }, 500)
        return ()=>{
            clearTimeout(timer)
        }
    }, [title]);
    useEffect(()=>{
        console.log("this is open contents", openContents)
    }, [openContents]);

    return {openContents, setOpenContents, timerFuncOpenContents};
}