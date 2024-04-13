from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    user = db.relationship('User', back_populates='transactions')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_amount': float(self.total_amount),
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
