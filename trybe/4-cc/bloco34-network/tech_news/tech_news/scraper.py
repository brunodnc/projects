import requests
import time
import parsel
from tech_news.database import create_news


# Requisito 1
def fetch(url):
    headers = {"user-agent": "Fake user-agent"}
    try:
        time.sleep(1)
        response = requests.get(url, headers=headers, timeout=3)
        if response.status_code == 200:
            return response.text
        else:
            return None
    except requests.ReadTimeout:
        return None


# Requisito 2
def scrape_updates(html):
    sel = parsel.Selector(html)
    update_links = sel.css(".cs-overlay-link::attr(href)").getall()
    return update_links


# Requisito 3


def scrape_next_page_link(html_content):
    sel = parsel.Selector(html_content)
    next_page_link = sel.css("a.next::attr(href)").get()
    if next_page_link:
        return next_page_link
    else:
        return None


# Requisito 4
def scrape_news(html_content):
    sel = parsel.Selector(html_content)
    news = {}
    news["url"] = sel.css('link[rel="canonical"]::attr(href)').get()
    news["title"] = sel.css(".entry-title::text").get().strip()
    news["timestamp"] = (
        sel.css(".post-meta .meta-date::text")
        .re_first(r"\d{2}/\d{2}/\d{4}")
        .strip()
    )
    news["writer"] = sel.css(".author a::text").get().strip()
    news["reading_time"] = int(
        sel.css(".meta-reading-time::text").re_first(r"\d+").strip()
    )
    news["summary"] = "".join(
        sel.css(".entry-content > p:nth-of-type(1) *::text").getall()
    ).strip()

    news["category"] = (
        sel.css(".category-style > span.label::text").get().strip()
    )
    return news


# Requisito 5
def get_tech_news(n):
    html = fetch("https://blog.betrybe.com/")
    urls = []
    while len(urls) < n:
        urls += scrape_updates(html)

        if len(urls) < n:
            html = fetch(scrape_next_page_link(html))

    data = []
    for link in urls[0:n]:
        data.append(scrape_news(fetch(link)))

    create_news(data)
    return data
