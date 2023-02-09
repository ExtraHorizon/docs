import * as dotenv from 'dotenv'
dotenv.config();
import { confluenceReq, getChildPages } from './lib/confluence.js';
import { extractReleaseData } from './lib/parsing.js';

const HOST = 'extrahorizon.atlassian.net';
const PAGE_ID = "22645774"


async function main(){


  // const res : any = await confluenceReq(`https://${HOST}/wiki/rest/api/content/${PAGE_ID}?expand=body.storage,metadata.labels`)

  // const result = extractReleaseData(res.body.storage.value);

  const res : any = await getChildPages(PAGE_ID)

  const parsedResults = res.map((item:any) => { 

    return {
      title: item.title, 
      ...extractReleaseData(item.data)
    }
  
  })

  console.log(parsedResults)
}



main();