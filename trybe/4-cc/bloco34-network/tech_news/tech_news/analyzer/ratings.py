from collections import Counter
from operator import itemgetter

from tech_news.database import find_news

# Requisito 10


def top_5_categories():
    news = find_news()
    categories = [news[i]["category"] for i in range(len(news))]
    count_categories = Counter(categories)
    sorted_categories = sorted(
        count_categories.items(), key=itemgetter(1), reverse=True
    )
    top_5 = [category[0] for category in sorted_categories[:5]]
    return top_5
