from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review_one = Review(
        user_id = 1,
        product_id = 1,
        rating = 4,
        review = "Absolutely love this guitar! The sound is rich and full, and it plays beautifully right out of the box."
    )
    review_two = Review(
        user_id = 2,
        product_id = 2,
        rating = 3,
        review = "Interesting instrument, but it takes some getting used to. The electronic sound is not for purists, but it's fun for experimental music."
    )
    review_three = Review(
        user_id = 3,
        product_id = 3,
        rating = 3,
        review = "Average build quality. It's okay for casual playing but consider something higher-end for professional use."
    )
    review_four = Review(
        user_id = 1,
        product_id = 4,
        rating = 3,
        review = "The bow quality is subpar, had to buy a new one separately. The violin itself is decent for the price."
    )

    review_five = Review(
        user_id = 2,
        product_id = 5,
        rating = 3,
        review = "I'm a bit disappointed with the quality of the padding. Had to take it to a shop for adjustments after a few weeks."
    )
    review_six = Review(
        user_id = 3,
        product_id = 6,
        rating = 4,
        review = "Really impressed with the quality for the price. Definitely a great buy!"
    )
    review_seven = Review(
        user_id = 1,
        product_id = 7,
        rating = 4,
        review = "The item arrived on time and was exactly as described. Couldn’t be happier!"
    )
    review_eight = Review(
        user_id = 1,
        product_id = 8,
        rating = 4,
        review = "Customer service was outstanding, and the product exceeds my expectations."
    )
    review_nine = Review(
        user_id = 3,
        product_id = 9,
        rating = 3,
        review = "I'm not totally satisfied with my purchase. It doesn't work as well as I had hoped."
    )
    review_ten = Review(
        user_id = 2,
        product_id = 10,
        rating = 3,
        review = "While the product is mostly good, it feels a bit cheaper than I expected."
    )
    review_eleven = Review(
        user_id = 3,
        product_id = 11,
        rating = 2,
        review = "Would not recommend. The product stopped working after a few uses."
    )
    review_twelve = Review(
        user_id = 2,
        product_id = 12,
        rating = 5,
        review = "This is exactly what I needed, and it works perfectly. Five stars!"
    )
    review_thirteen = Review(
        user_id = 2,
        product_id = 13,
        rating = 5,
        review = "I love it! It has really made a difference in my practice sessions."
    )
    review_fourteen = Review(
        user_id = 1,
        product_id = 14,
        rating = 5,
        review = "Fantastic! A must-have for any enthusiast or professional in this field."
    )
    review_fifteen = Review(
        user_id = 1,
        product_id = 15,
        rating = 4,
        review = "The quality is okay, but I've seen better products from this brand."
    )
    review_sixteen = Review(
        user_id = 1,
        product_id = 16,
        rating = 1,
        review = "Unfortunately, the product did not meet my expectations and I had to return it."
    )
    review_seventeen = Review(
        user_id = 2,
        product_id = 17,
        rating = 4,
        review = "Incredible performance right out of the box. I am very impressed!"
    )
    review_eighteen = Review(
        user_id = 2,
        product_id = 18,
        rating = 4,
        review = "It's a good starter product, but you might want to upgrade later on."
    )
    review_nineteen = Review(
        user_id = 2,
        product_id = 19,
        rating = 4,
        review = "The build quality is superb, and it looks just as pictured."
    )
    review_twenty = Review(
        user_id = 3,
        product_id = 20,
        rating = 5,
        review = "Five-star product. Worth every penny and then some!"
    )
    review_twenty_one = Review(
        user_id = 3,
        product_id = 21,
        rating = 4,
        review = "Not bad, but the installation was more complicated than it needed to be."
    )
    review_twenty_two = Review(
        user_id = 1,
        product_id = 22,
        rating = 3,
        review = "Works well, but the packaging was damaged. Luckily, the product was intact."
    )
    review_twenty_three = Review(
        user_id = 2,
        product_id = 1,
        rating = 4,
        review = "Pretty good overall, but I wish it had more features."
    )
    review_twenty_four = Review(
        user_id = 3,
        product_id = 5,
        rating = 4,
        review = "This product is reliable and easy to use, exactly what I was looking for."
    )
    review_twenty_five = Review(
        user_id = 1,
        product_id = 7,
        rating = 4,
        review = "It seems sturdy and durable. Time will tell, but so far, so good"
    )
    review_twenty_six = Review(
        user_id = 2,
        product_id = 9,
        rating = 1,
        review = "Product does not match the description. I would not buy this again"
    )
    review_twenty_seven = Review(
        user_id = 3,
        product_id = 12,
        rating = 3,
        review = "It's just okay. Not bad, but not great either."
    )
    review_twenty_eigth = Review(
        user_id = 3,
        product_id = 17,
        rating = 4,
        review = "The performance is fantastic, and it integrates well with my existing setup"
    )
    review_twenty_nine = Review(
        user_id = 2,
        product_id = 7,
        rating = 4,
        review = "Very satisfied with this purchase. It arrived quickly and works flawlessly."
    )
    review_thirty = Review(
        user_id = 1,
        product_id = 21,
        rating = 4,
        review = "This was a gift, and the recipient was absolutely thrilled with it."
    )
    review_thirty_one = Review(
        user_id = 1,
        product_id = 11,
        rating = 4,
        review = "While it works well, the color was a bit different from what was shown online. Keep this in mind when ordering."
    )
    review_thirty_two = Review(
        user_id = 2,
        product_id = 8,
        rating = 4,
        review = "Arrived quicker than I expected. Very efficient service and the product is top-notch!"
    )
    review_thirty_three = Review(
        user_id = 3,
        product_id = 1,
        rating = 5,
        review = "Excellent product! It has really enhanced my experience and I would highly recommend it to anyone."
    )

    db.session.add(review_one)
    db.session.add(review_two)
    db.session.add(review_three)
    db.session.add(review_four)
    db.session.add(review_five)
    db.session.add(review_six)
    db.session.add(review_seven)
    db.session.add(review_eight)
    db.session.add(review_nine)
    db.session.add(review_ten)
    db.session.add(review_eleven)
    db.session.add(review_twelve)
    db.session.add(review_thirteen)
    db.session.add(review_fourteen)
    db.session.add(review_fifteen)
    db.session.add(review_sixteen)
    db.session.add(review_seventeen)
    db.session.add(review_eighteen)
    db.session.add(review_nineteen)
    db.session.add(review_twenty)
    db.session.add(review_twenty_one)
    db.session.add(review_twenty_two)
    db.session.add(review_twenty_three)
    db.session.add(review_twenty_four)
    db.session.add(review_twenty_five)
    db.session.add(review_twenty_six)
    db.session.add(review_twenty_seven)
    db.session.add(review_twenty_eigth)
    db.session.add(review_twenty_nine)
    db.session.add(review_thirty)
    db.session.add(review_thirty_one)
    db.session.add(review_thirty_two)
    db.session.add(review_thirty_three)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()

