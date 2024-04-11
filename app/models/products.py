from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Product(db.Model):
    __table__ = 'products'

    if environment == 'products':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    
