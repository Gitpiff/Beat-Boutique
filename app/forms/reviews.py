from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired

class Reviews(FlaskForm):
    user_id = IntegerField("User Id", validators=[DataRequired()])
    product_id = IntegerField("Product Id")
    rating = IntegerField("Rating")
    review = TextAreaField("Review")