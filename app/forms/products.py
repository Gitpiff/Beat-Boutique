from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired


class Products(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = TextAreaField("description")
    price = IntegerField("price", validators=[DataRequired()])
    inventory = IntegerField("inventory")
