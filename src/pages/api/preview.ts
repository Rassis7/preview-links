import { NextApiRequest, NextApiResponse } from "next";
import { DOMWindow, JSDOM } from 'jsdom';
import axios from 'axios'
import https from 'https'

const api = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
  },
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false,
  })
});

export default async function generateUrl(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method not allowed');
    }
    const { url } = req.body
    const { data } = await api.get(url)  
    const { window } = new JSDOM(data, { url, contentType: "text/html"} )

    const metaImage = getMetaValue(window, 'image')
    const metaTitle = getMetaValue(window, 'title') ?? getTitle(window)
    const metaDescription = getMetaValue(window, 'description')
    const origin = window.document.location.origin

    const image = metaImage && isValidUrl(metaImage) ? metaImage : null
    res.status(200).json({
      title: metaTitle,
      description: metaDescription,
      image,
      origin,
    })
}

function getMetaValue(window: DOMWindow, metaTagName: string) {
  const meta =  window.document.querySelector(`meta[property='og:${metaTagName}']`)
  if (meta) return meta.getAttribute("content")
  return null;
}

function getTitle(window: DOMWindow) {
  let title = window.document.querySelector('title')?.textContent
  if (!title) {
    const h1 = window.document.querySelector('h1')?.textContent
    if(h1) return h1
    return null
  }
  return title
}

function isValidUrl(url: string) {
  return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url)
}