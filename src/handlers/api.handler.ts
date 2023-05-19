import axios from 'axios';
import Activity from '../models/activity.model';


interface ApiResponse {
    events: any[];
    continuation: string;
}

const fetchEvent = async () => {
    const baseUrl = 'https://api.reservoir.tools/events/asks/v3';
    const limit = 1000;
    let continuation = "";
    let events: any[] = [];

    while (true) {
        const queryParams = `?limit=${limit}${continuation ? `&continuation=${continuation}` : ''}`;
        const url = `${baseUrl}${queryParams}`;

        try {
            const res = await axios.get(url); // fetch(url);
            const dataToJson = (await res.data as ApiResponse);
            continuation = dataToJson.continuation;
            const newOrderEvents = dataToJson.events.filter((event: any) => event.event.kind == 'new-order')
            await createActivity(newOrderEvents);
            if (continuation == "") {
                break
            }
        } catch (error) {
            console.error(`Error fetching data from the api: ${error}`);
            break;
        }
    }

    return events;
}

const createActivity = async (datas: any) => {
    for (let data of datas.event) {
        Activity.create({
            contract_address: data.order.contract,
            token_index: data.order.criteria.data.token.tokenId,
            listing_price: data.order.price.amount.native,
            maker: data.order.maker,
            listing_from: data.order.validFrom,
            listing_to: data.order.validTo,
            event_timestamp: data.event.createdAt,
        }).then(res => {
            console.log(`Activity with id: ${res.id}, created successfully`);
        }).catch((error) => {
            console.error(`Error creating activity: ${error}`)
        })
    }
}

export default fetchEvent;