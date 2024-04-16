from app.models import db, OrderHistory, environment, SCHEMA
from sqlalchemy.sql import text

def seed_order_history():
    order_one = OrderHistory(
        user_id = 1,
        total_amount = 790,
        items = {"guitar", "mixer"}
    )
    order_two = OrderHistory(
        user_id = 2,
        total_amount = 1990,
        items = {"violin", "music book", "harp"}
    )
    order_three = OrderHistory(
        user_id = 3,
        total_amount = 1200,
        items = {"keyboard", "mixer"}
    )
    order_four = OrderHistory(
        user_id = 1,
        total_amount = 100,
        items = {"rock shirt", "rock pins"}
    )
    order_five = OrderHistory(
        user_id = 2,
        total_amount = 10090,
        items = {"ukelele", "piano"}
    )
    order_six = OrderHistory(
        user_id = 3,
        total_amount = 30,
        items = {"jazz cd", "electronic cd"}
    )

    db.session.add(order_one)
    db.session.add(order_two)
    db.session.add(order_three)
    db.session.add(order_four)
    db.session.add(order_five)
    db.session.add(order_six)
    db.session.commit()

def undo_seed_order_history():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_history RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_history"))

    db.session.commit()
