import axios from "axios";

export const commonApi = async(httpRequest, url, reqBody, reqHeader) => {

    // console.log(reqHeader)
    const reConfig = {
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader
    }

    return await axios(reConfig).then( (res)=>{
        return res
    } ).catch( (err)=>{
        return err
    } )

}