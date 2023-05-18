import { Op } from 'sequelize';
import Activity from "../models/activity.model";
import Token from "../models/token.model";
import sequelize from "../db/mysql_db";

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

              if (tokenActivities.length === 0) {
                // No active listings for this token
                token.current_price = null;
              } else {
                const lowestListing = tokenActivities.reduce<Activity | null>(
                    (lowest: Activity | null, activity: Activity) => {
                    if (!lowest || activity.listing_price < lowest.listing_price) {
                      return activity;
                    }
                    return lowest;
                  },
                  null
                );
        
                if (lowestListing) {
                  token.current_price = lowestListing.listing_price;
                }
              }
        
              await token.save();
        }

        console.log('Listings processed successfully');
    } catch (error) {
        console.error('Error processing listings:', error);
    }
}

export { processListings };
