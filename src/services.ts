import axios from 'axios'

export async function getChannelId(channelId : string): Promise<string  | null> {
    try {
        const apiKey = import.meta.env.VITE_API_KEY   
        
        const res = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelId}&hl=fr&regionCode=fr&type=channel&maxResults=1&key=${apiKey}`
        )
        console.log(res.data)
        return res.data.items[0].id.channelId;
    }
    catch(err){
        console.log(err)
        return null;
    }
  }

export async function getData(channelId : string) {
  try {
        const apiKey = import.meta.env.VITE_API_KEY   
        
        const res = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&hl=fr&regionCode=fr&id=${channelId}&key=${apiKey}`
            
        )
        return res.data.items[0];
    }
    catch(err){
        return null;
    }
}
