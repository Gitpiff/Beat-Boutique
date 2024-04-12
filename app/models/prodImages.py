from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImage(db.Model):
    __table__= 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, db.Foreign(add_prefix_for_prod('products')))
