from sqlalchemy.orm import joinedload
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..forms.products import Products
from ..forms.product_image import ProductImages
from ..models import db, Product, ProductImage

product_routes = Blueprint("products", __name__)


@product_routes.route("/")
def index():
    """
    Gets all products
    """
    get_all_products = Product.query.options(joinedload("images")).all()

    products_dict = [product.to_dict() for product in get_all_products]

    return jsonify(products_dict)


@product_routes.route("/", methods=["POST"])
@login_required
def create_new_product():
    """
    Creates new product
    """
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
    """
    Get product by Id
    """
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"error": "Product not found"}), 400

    return product.to_dict()


@product_routes.route("/<int:product_id>", methods=["PUT"])
@login_required
def update_products(product_id):
    """
    Updates product by Id
    """
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
    """
    Deletes product
    """
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"error": "Product not found"})

    if current_user.id != product.owner_id:
        return jsonify({"error": "unauthorized"})

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product was deleted successful"})


@product_routes.route("/images/<int:product_id>", methods=["POST"])
@login_required
def add_new_image(product_id):
    """
    Creates new product image
    """
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"error": "Product not found"}), 400

    form = ProductImages()

    form.csrf_token.data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_image = ProductImage(
            product_id=product.to_dict()["id"], image_url=form.data["image_url"]
        )

        db.session.add(new_image)
        db.session.commit()

        return new_image.to_dict()

    return form.errors, 401


@product_routes.route("/images/<int:image_id>", methods=["DELETE"])
@login_required
def delete_image(image_id):
    """
    Deletes product image
    """

    image_product = ProductImage.query.get(image_id)

    if not image_product:
        return jsonify({"error": "Product Image not found"}), 400

    products = Product.query.get(image_product.to_dict()["product_id"])

    if current_user.id != products.to_dict().owner_id:
        return jsonify({"error": "unauthorized"})

    db.session.delete(image_product)
    db.session.commit()

    return jsonify({"message": "Product Image was deleted successful"})
