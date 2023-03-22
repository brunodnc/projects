import tech_news.database as db
from datetime import datetime

# Requisito 7


def search_by_title(title):
    news = db.find_news()
    found_news = [
        (news_item["title"], news_item["url"])
        for news_item in news
        if title.lower() in news_item["title"].lower()
    ]
    return found_news


# Requisito 8
def search_by_date(date_str):
    try:
        date = datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        raise ValueError("Data inválida")

    news = db.search_news({"timestamp": date.strftime("%d/%m/%Y")})
    return [(news["title"], news["url"]) for news in news]


# Requisito 9
def search_by_category(category):
    result = []
    news_list = db.search_news(
        {
            "category": {
                "$regex": category,
                "$options": "i"
                }
            }
        )
    for news in news_list:
        news_list.append((news["title"], news["url"]))
    return result
