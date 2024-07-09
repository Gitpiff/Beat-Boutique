from sqlalchemy.orm import joinedload
from sqlalchemy import func
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..forms.products import Products
from ..forms.product_image import ProductImageForm
from ..models import db, Product, ProductImage, Review
from ..aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from sqlalchemy.orm import joinedload

product_routes = Blueprint("products", __name__)


@product_routes.route("/")
def index():
    """
    Gets all products
    """
    page = request.args.get("page", 1, type=int)
    size = request.args.get("page_size", 10, type=int)

    get_all_products = Product.query.options(joinedload("images")).paginate(
        page=page, per_page=size
    )

    products_dict = []
    for product in get_all_products:
        avg_rating = (
            db.session.query(func.avg(Review.rating))
            .filter_by(product_id=product.id)
            .scalar()
        )
        product_dict = product.to_dict()
        product_dict.pop("reviews", None)
        if avg_rating:
            product_dict["avgRating"] = round(avg_rating, 2)
        else:
            product_dict["avgRating"] = 0

        products_dict.append(product_dict)

    return jsonify(products_dict)


@product_routes.route("/current")
@login_required
def get_current_user_products():
    """
    Gets all products of the current user along with associated images
    """
    user_id = current_user.id
    user_products = (
        Product.query.options(joinedload(Product.images))
        .filter_by(owner_id=user_id)
        .all()
    )

    return jsonify([product.to_dict() for product in user_products])


@product_routes.route("/", methods=["POST"])
@login_required
def create_new_product():
    """
    Creates new product
    """
    form = Products()

    form.csrf_token.data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        if len(form.data["name"]) > 255:
            return {"errors": ["Name must be 255 characters or less"]}, 400

        new_product = Product(
            name=form.data["name"],
            owner_id=current_user.id,
            description=form.data["description"],
            type=form.data["type"],
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

        if len(data.get("name", "")) > 255:
            return {"errors": ["Name must be 255 characters or less"]}, 400

        product.name = data.get("name", product.name)
        product.description = data.get("description", product.description)
        product.price = data.get("price", product.price)
        product.type = data.get("type", product.type)
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
        return jsonify({"error": "Product not found"}), 404

    if current_user.id != product.owner_id:
        return jsonify({"error": "unauthorized"}), 403

    product_images = ProductImage.query.filter_by(product_id=product_id).all()
    for image in product_images:
        remove_file_from_s3(image.image_url)
        db.session.delete(image)

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product was deleted successful"})


# @product_routes.route("/images/<int:product_id>", methods=["POST"])
# @login_required
# def add_new_image(product_id):
#     """
#     Creates new product image
#     """
#     product = Product.query.get(product_id)

#     if not product:
#         return jsonify({"error": "Product not found"}), 400

#     form = ProductImages()

#     form.csrf_token.data = request.cookies["csrf_token"]
#     if form.validate_on_submit():
#         new_image = ProductImage(
#             product_id=product.to_dict()["id"], image_url=form.data["image_url"]
#         )

#         db.session.add(new_image)
#         db.session.commit()

#         return new_image.to_dict()

#     return form.errors, 401


@product_routes.route("/images/<int:product_id>", methods=["POST"])
@login_required
def add_new_image(product_id):
    """
    Creates new product image
    """
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    if current_user.id != product.owner_id:
        return jsonify({"error": "Unauthorized"}), 403

    form = ProductImageForm()
    form.csrf_token.data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return jsonify(upload), 400

        url = upload["url"]
        new_image = ProductImage(product_id=product.id, image_url=url)
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict(), 201

    return jsonify({"error": "Validation failed", "errors": form.errors}), 422


@product_routes.route("/images/<int:image_id>", methods=["DELETE"])
@login_required
def delete_image(image_id):
    """
    Deletes product image
    """

    image_product = ProductImage.query.get(image_id)

    if not image_product:
        return jsonify({"error": "Product Image not found"}), 404

    # products = Product.query.get(image_product.to_dict()["product_id"])

    # if current_user.id != products.to_dict().owner_id:
    #     return jsonify({"error": "unauthorized"})

    remove_file_from_s3(image_product.image_url)

    db.session.delete(image_product)
    db.session.commit()

    return jsonify({"message": "Product Image was deleted successful"})
