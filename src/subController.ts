import publish from './publish';
import io from './app'

export class subController {

    public static index(name: string, obj: any){
        if(this.shouldBeProcessed(name)){
            io.then((io) => {
                io.emit(`subscribe-${name}`, this.toSend(obj, name))
            })
        }
    }

    static toSend(obj: any, name: string){
        var toReturn: any = {}
        for(let cName of publish[name].data){
            toReturn[cName] = obj[cName];
        }
        return toReturn;
    }

    static shouldBeProcessed(name: string){
        if(publish[name]){
            return true;
        }else{
            return false;
        }
    }
}