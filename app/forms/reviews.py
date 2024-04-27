from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField


class Reviews(FlaskForm):
    user_id = IntegerField("User Id")
    product_id = IntegerField("Product Id")
    rating = IntegerField("Rating")
    review = TextAreaField("Review")