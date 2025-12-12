import cron from 'node-cron'
import User from '../models/user.model.js'

async function syncLeads(){

    const verifiedName = await User.find({status: 'Verified', isSynced: false});

    for(const name of verifiedName){
        console.log(
              `[CRM Sync] Sending verified lead ${name.name} to Sales Team...`
        );

        name.isSynced = true;
        await name.save();
    }
}

cron.schedule('*/15 * * * * *', syncLeads);

export default syncLeads;

