import { Op } from 'sequelize';
import Activity from "../models/activity.model";
import Token from "../models/token.model";
import sequelize from '../db/mysql_db';

async function processListings() {
  try {
    // Find the most recent listing for each token

    const activities = await Activity.findAll();
    const tokens = await Token.findAll();

    if (tokens.length !== 0) {
      for (const token of tokens) {
        const tokenActivities = activities.filter(
          (activity) =>
            activity.contract_address === token.contract_address &&
            activity.token_index === token.index
        );

        if (tokenActivities.length !== 0) {
          for (let tokenActivity of tokenActivities) {
            await createToken(tokenActivity);
          }
        }
      }

    } else {
      if (activities.length !== 0) {
        for (let activity of activities) {
          await createToken(activity);
        }
      }
    }

    // Updating current price of expired date to null
    await updateToken();

    console.log('Listings processed successfully');
  } catch (error) {
    console.error('Error processing listings:', error);
  }
}

const createToken = async (data: any) => {
  Token.create({
    index: data.token_index,
    contract_address: data.contract_address,
    current_price: data.listing_price
  })
    .then((res) => {
      console.log(`Token with id: ${res.id}, created successfully`)
    })
    .catch((error) => {
      console.error(`Error creating token: ${error}`)
    })
}

const updateToken = async () => {
  Token.update(
    { contract_address: null },
    {
      where: {
        index: {
          [Op.notIn]: sequelize.literal(`
            SELECT token_index
            FROM activity
            WHERE listing_to > NOW()
          `),
        }
      }
    }
  );
}

export { processListings };
