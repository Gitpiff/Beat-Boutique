from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class ShoppingCart(db.Model):
    __tablename__ = 'shopping_carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), unique=True, nullable=False)
    created_At = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    user = db.relationship('User', back_populates='shopping_cart')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'created_at': self.created_At,
            'updated_at': self.updated_at
        }
