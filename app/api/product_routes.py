from flask import Blueprint, request, jsonify
from flask_login import login_required
from ..forms.products import Products
from ..models import db, Product

product_routes = Blueprint("products", __name__)


@product_routes.route("/")
def index():
    get_all_products = db.session.query(Product).all()
    products_dict = [product.to_dict() for product in get_all_products]
    return jsonify(products_dict)


@product_routes.route("/", methods=["POST"])
# @login_required
def create_new_product():
    form = Products()

    form.csrf_token.data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_product = Product(
            name=form.data["name"],
            owner_id=1,
            description=form.data["description"],
            price=form.data["price"],
            inventory=form.data["inventory"],
        )

        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict()

    return form.errors, 401
