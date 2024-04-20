from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func, Enum 



class TypeChoices(Enum):
    MUSICAL_INSTRUMENTS = 'Musical Instruments'
    CLOTHING = 'Clothing'
    TAPES = 'Tapes'
    CDS = 'CDs'
    PINS = 'Pins'

    @staticmethod
    def fetch_names():
        return [c.value for c in TypeChoices.__members__.values()]
class Product(db.Model):
    __tablename__ = 'products'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    type = db.Column(Enum(TypeChoices), nullable=False)
    price = db.Column(db.Numeric(10,2), nullable=False)
    inventory = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

    user = db.relationship('User', back_populates='products')
    images = db.relationship('ProductImage', back_populates='product')
    reviews = db.relationship('Review', back_populates='product')
    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'type': self.type.name,
            'price': self.price,
            'inventory': self.inventory,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
