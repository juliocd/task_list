import HipsumService from '../services/hipsum/HipsumService';

class HipsumHelper {

    public static async getSentences(sentences:number = 3):Promise<string[]|null>{
        let result = null;
        try{
            result = await HipsumService.getData(sentences);
            if(result){
                return result[0].split('.');
            }

            return result;
        }catch(e){
            console.error("### ERROR HipsumHelper.getSentences: ", e);
            return result;
        }
    }

}

export default HipsumHelper;