import fetch, { Response } from "node-fetch";

export async function Fetcher(url:string){
    try {
        const response : Response = await fetch(url);
        // const data = await response.text();
        return response;
    } catch(error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

