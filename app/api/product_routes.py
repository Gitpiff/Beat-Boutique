from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..forms.products import Products
from ..models import db, Product

product_routes = Blueprint("products", __name__)


@product_routes.route("/")
def index():
    get_all_products = db.session.query(Product).all()
    products_dict = [product.to_dict() for product in get_all_products]
    return jsonify(products_dict)


@product_routes.route("/", methods=["POST"])
@login_required
def create_new_product():
    form = Products()

    form.csrf_token.data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_product = Product(
            name=form.data["name"],
            owner_id=current_user.id,
            description=form.data["description"],
            price=form.data["price"],
            inventory=form.data["inventory"],
        )

        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict()

    return form.errors, 401


@product_routes.route("/<int:product_id>")
def get_product_by_id(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"error": "Product not found"}), 400

    return product.to_dict()


@product_routes.route("/<int:product_id>", methods=["PUT"])
@login_required
def update_products(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"error": "Product not found"})

    if current_user.id != product.owner_id:
        return jsonify({"error": "unauthorized"})

    data = request.json

    if data:
        product.name = data.get("name", product.name)
        product.description = data.get("description", product.description)
        product.price = data.get("price", product.price)
        product.inventory = data.get("inventory", product.inventory)

    db.session.commit()

    return product.to_dict()


@product_routes.route("/<int:product_id>", methods=["DELETE"])
@login_required
def delete_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"error": "Product not found"})

    if current_user.id != product.owner_id:
        return jsonify({"error": "unauthorized"})

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product was deleted successful"})
