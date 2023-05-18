import axios from 'axios';
import Activity from '../models/activity.model';


interface ApiResponse {
    events: any[];
    continuation?: string;
  }

const fetchEvent =async () => {
    const baseUrl = 'https://api.reservoir.tools/events/asks/v3';
    const limit = 1000;
    let continuation = "";
    let events: any[] = [];

    while (true) {
        const queryParams = `?limit=${limit}${continuation ? `&continuation=${continuation}` : ''}`;
        const url = `${baseUrl}${queryParams}`;

        try {
            const res = await axios.get(url); // fetch(url);
            const dataToJson= (await res.data as ApiResponse);
            const newOrderEvents = dataToJson.events.filter((event: any) => event.event.kind == 'new-order') 
            await Activity.bulkCreate(newOrderEvents)
        } catch (error) {
            console.error(`Error fetching data from the api: ${error}`);
            break;
        }
    }

    return events;
}

export default fetchEvent;