import publish from './publish';
import instance from "./instance";

export class subController {

    public static index(name: string, obj: any, type: string){
        if(this.shouldBeProcessed(name, type)){
            instance.getInstance()
                .data
                .io.emit(`subscribe-${name}`, {data: this.toSend(obj, name), type: type})

        }
    }

    static toSend(obj: any, name: string){
        var toReturn: any = {}
        for(let cName of publish[name].data){
            toReturn[cName] = obj[cName];
        }
        return toReturn;
    }

    static shouldBeProcessed(name: string, type: string){
        if(publish[name] && publish[name].type.includes(type.toLowerCase())){
            return true;
        }else{
            return false;
        }
    }
}