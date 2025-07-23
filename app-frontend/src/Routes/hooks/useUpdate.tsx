
import axios from "axios";
interface inputType{
    idValue: string | null;
    editedTitleRef: string | undefined | null;
    editedInfoRef: string | undefined | null;
}
export const useUpdate =(props: inputType)=>{
    const title=props.editedTitleRef;
    const info=props.editedInfoRef;
    const id=props.idValue;
    const timerFuncEditedValue=()=>{
        axios.post(
            "http://localhost:3000" + "/api/v1/user/contents/edit",{
                title,
                id,
                info
            },{
                headers:{
                    'authorization': localStorage.getItem('token')
                }
            }
        ).then((response)=>{
            console.log("APi response of the edit endpoint", response.data);
            console.log('this is the response'+response.data.content)
        }
        )
    }
    return {timerFuncEditedValue}
}