from tech_news.analyzer.reading_plan import (
    ReadingPlanService,
)  # noqa: F401, E261, E501
from unittest.mock import patch


def test_reading_plan_group_news():
    with patch("tech_news.database.find_news") as mock_find_news:
        mock_find_news.return_value = [
            {"title": "Artigo1", "reading_time": 4},
            {"title": "Artigo2", "reading_time": 3},
            {"title": "Artigo3", "reading_time": 10},
            {"title": "Artigo4", "reading_time": 15},
            {"title": "Artigo5", "reading_time": 12},
        ]

        result = ReadingPlanService.group_news_for_available_time(10)
        assert result == {
            "readable": [
                {
                    "unfilled_time": 3,
                    "chosen_news": [
                        (
                            "Artigo1",
                            4,
                        ),
                        (
                            "Artigo2",
                            3,
                        ),
                    ],
                },
                {
                    "unfilled_time": 0,
                    "chosen_news": [
                        (
                            "Artigo3",
                            10,
                        )
                    ],
                },
            ],
            "unreadable": [
                ("Artigo4", 15),
                ("Artigo5", 12),
            ],
        }
