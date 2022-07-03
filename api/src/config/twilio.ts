import { Twilio } from "twilio";
import Account from "../models/Account";

const sendMessage = async (sid: string, token: string, from: string,   message : string, phone : string) => {

    const account = await Account.find({sid});
    const client = new Twilio(sid, token);

    if(message.length === 0 || phone.length === 0) return false;
    try{
        const res =  await client.messages.create({ 
            from: from,
            to: phone,
            body: message
        });
        return res.sid
    }catch(err){
        process.env.DEV &&
        console.log(`Error Sending Messages`, err);
    }
    return null;
}
export { sendMessage };