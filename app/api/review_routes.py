from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..forms.reviews import Reviews
from ..models import db, Review, Product

review_routes = Blueprint("reviews", __name__)


@review_routes.route('/<int:product_id>')
def reviews(product_id):
    """
    Gets all product's reviews
    """
    reviews = Review.query.get(product_id)
    reviews = Review.query.filter_by(product_id=product_id).all()

    if not reviews:
        return jsonify({"error": "Product not found"}), 404

    reviews_dict = [review.to_dict() for review in reviews] 
    return jsonify(reviews_dict)




@review_routes.route('/<int:product_id>', methods=["POST"])
@login_required
def new_review(product_id):
    """
    Creates a review
    """
    product = Product.query.get(product_id)
    form = Reviews()
    
    if current_user.id == product.owner_id:
        return jsonify({"error": "You can't review your own product"})

    form.csrf_token.data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_review = Review(
            user_id = current_user.id,
            product_id = product_id,
            rating = form.data["rating"],
            review = form.data["review"]
        )

        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    
    return form.errors, 401



@review_routes.route("/<int:review_id>", methods=["PUT"])
@login_required
def update_review(review_id):
    """
    Creates a review
    """
    review = Review.query.get(review_id)

    if not review:
       return jsonify({"error": "Review not found"}) 

    if current_user.id != review.owner_id:
        return jsonify({"error": "Forbidden"})
    
    data = request.json

    if data:
        review.rating = data.get("rating", review.rating)
        review.review = data.get("review", review.review)
    
    db.session.commit()

    return review.to_dict()



@review_routes.route("/<int:review_id>", methods=["DELETE"])
@login_required
def delete_review(review_id):
    """
    Delete a review
    """
    review = Review.query.get(review_id)

    if not review:
       return jsonify({"error": "Review not found"}) 

    if current_user.id != review.owner_id:
        return jsonify({"error": "Forbidden"})

    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review was deleted successful"})
