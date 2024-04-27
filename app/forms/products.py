from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SelectField
from wtforms.validators import DataRequired


class Products(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = TextAreaField("description")
    type = SelectField("types", choices=["CLOTHING", "TAPES", "CDS", "PINS", "MUSICAL_INSTRUMENTS"])
    price = IntegerField("price", validators=[DataRequired()])
    inventory = IntegerField("inventory")
