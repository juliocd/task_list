import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

class HipsumService {
    
    public static async getData (sentences: number = 3): Promise<any|null> {

        try{
            const url:string = `${process.env.HIPSUM_HOST_API_HOST}/api/?type=hipster-centric&sentences=${sentences}`;
            const request: AxiosRequestConfig = {
                method: 'GET',
                url
            }

            let response: AxiosResponse = await axios(request);
            return response.data;
        }catch(e){
            console.error("### ERROR HipsumService.getData: ", e);
            return false;
        }
    }
}

export default HipsumService;