import { Op } from 'sequelize';
import Activity from "../models/activity.model";
import Token from "../models/token.model";

async function processListings() {
    try {
        // Find the most recent listing for each token

        const activities = await Activity.findAll();
        const tokens = await Token.findAll();

        for (const token of tokens) {
            const tokenActivities = activities.filter(
                (activity) =>
                  activity.contract_address === token.contract_address &&
                  activity.token_index === token.index
              );

              if (tokenActivities.length !== 0) {
                for (let tokenActivity of tokenActivities ) {
                  await createToken(tokenActivity);
                }
              }
        }

        console.log('Listings processed successfully');
    } catch (error) {
        console.error('Error processing listings:', error);
    }
}

const createToken =async (data:any) => {
  Token.create({
    index: data.token_index,
    contract_address:data.contract_address
  })
    .then((res) => {
    console.log(`Token with id: ${res.id}, created successfully`)
  })
  .catch((error) => {
    console.error(`Error creating token: ${error}`)
  })
}

export { processListings };
