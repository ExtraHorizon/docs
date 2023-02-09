import * as dotenv from 'dotenv'
dotenv.config();

import fetch from 'node-fetch';


export async function confluenceReq (url: string) {
  console.log(process.env.PASSWORD);
  console.log("blabla")
  const res = await  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization' : 'Basic ' + Buffer.from(process.env.USERNAME + ":" + process.env.PASSWORD).toString('base64'),
      'Accept': 'application/json'
    }
  })
  
  return res.json();
}

export async function getChildPages(ancestorId: string){

  const resData: any = await confluenceReq(`https://${process.env.HOST}/wiki/rest/api/content/${ancestorId}/descendant/page?depth=1&expand=body.storage,metadata.labels&limit=100`)

  // Filter on data with release note label
  let parsedData = resData.results.filter((item: any) => {
    
    const labelResults = item.metadata.labels.results;

    if (labelResults.length > 0) {
      return labelResults.filter((it:any) => it.name === "releasenotes")
    }

    return false;
  });

  // Map results 
  parsedData = parsedData.map((it: any) => {
    return {
      title: it.title,
      data: it.body.storage.value
    }
  })

  return parsedData;
}