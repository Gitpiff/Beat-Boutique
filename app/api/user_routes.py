from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User
from app.forms import LoginForm, SignUpForm, UpdateUserForm
from flask_login import login_user, logout_user

user_routes = Blueprint("users", __name__)


@user_routes.route("/<int:id>")
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if not user:
        return {"errors": ["User not found"]}, 404
    return user.to_dict()


@user_routes.route("signup", methods=["POST"])
def create_user():
    """
    Creates a new user and logs them in - no authentication required.
    """
    form = SignUpForm()
    form.csrf_token.data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        user = User(
            username=form.username.data,
            email=form.email.data,
            password=form.password.data,
            first_name=form.first_name.data,
            last_name=form.last_name.data,
        )

        db.session.add(user)
        db.session.commit()
        login_user(user)

        return user.to_dict(), 201
    return {"errors": form.errors}, 400


@user_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_user(id):
    """
    Updates a user's information. Requires authentication (login required).
    """
    user = User.query.get(id)
    if not user:
        return {"errors": ["User not found"]}, 404
    if user.id != current_user.id:
        return {"errors": ["Unauthorized"]}, 401

    form = UpdateUserForm()
    form.csrf_token.data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        # user.username = form.username.data
        # user.email = form.email.data
        user.first_name = form.first_name.data
        user.last_name = form.last_name.data
        db.session.commit()
        return user.to_dict()
    return {"errors": form.errors}, 400


@user_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_user(id):
    """
    Deletes a user. Requires authentication (login required).
    """
    user = User.query.get(id)
    if not user:
        return {"errors": ["User not found"]}, 404
    if user.id != current_user.id:
        return {"errors": ["Unauthorized"]}, 401

    db.session.delete(user)
    db.session.commit()
    return {"message": "User deleted successfully"}


@user_routes.route("/current")
@login_required
def get_current_user():
    """
    Retrieves the current logged-in user's data. Requires authentication (login required).
    """
    return current_user.to_dict()
