import puppeteer from "puppeteer"
import csv from "@/components/elements/csv"
import text from "@/components/elements/text"
import shell from "@/components/elements/shell"
import application from "@/settings/application.yaml"

async function getLinks(url, settings, page) {
  await page.goto(url, settings)
  //  scrapes the name and link of the product
  let info = await page.$$eval(".a-size-mini.a-spacing-none.a-color-base.s-line-clamp-2 a", (info) =>
    info.map((data) => {
      let obj = { link: data.href, name: data.innerText }
      return obj
    })
  )
  return info
}

export default async (data) => {
  const { options } = data
  const { information, settings } = application.automation
  const browser = await puppeteer.launch(settings.browser)
  const page = await browser.newPage()

  try {
    let container = []
    // for pagination url should be of form https://something{i} in for loop
    for (let i = 1; i <= 2; i++) {
      // put the url of the product on amazon to be scraped
      let url = ``
      let bulk = await getLinks(url, settings.page.static)
      container.push(...bulk)
      console.log(container)
      // provide filename for csv output
      await csv.write(container, "fileName.csv")
    }
  } catch (e) {
    throw new Error(e)
  } finally {
    await page.close()
    await browser.close()
  }
}
