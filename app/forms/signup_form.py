from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, ValidationError, EqualTo, Email
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already in use.")


class SignUpForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), username_exists])
    email = StringField("Email", validators=[DataRequired(), user_exists, Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    first_name = StringField("First Name")
    last_name = StringField("Last Name")
