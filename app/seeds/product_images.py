from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_product_images():
    guitar = ProductImage(
        product_id = 1,
        image_url = "https://images.unsplash.com/photo-1558098329-a11cff621064?q=80&w=3267&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    electric_guitar = ProductImage(
        product_id = 2,
        image_url = "https://images.unsplash.com/photo-1580745294190-1626b58bf7ce?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    bass_guitar = ProductImage(
        product_id = 3,
        image_url = "https://images.unsplash.com/photo-1618530089935-3030738b8c7b?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    vibrato_violin = ProductImage(
        product_id = 4,
        image_url = "https://images.unsplash.com/photo-1472312656035-eeef4726de6c?q=80&w=3618&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    harmonic_harp = ProductImage(
        product_id = 5,
        image_url = "https://images.unsplash.com/photo-1601902186937-b6c743ae2cd3?q=80&w=3168&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    keyboard = ProductImage(
        product_id = 6,
        image_url = "https://images.unsplash.com/photo-1524578471438-cdd96d68d82c?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    mixer = ProductImage(
        product_id = 7,
        image_url = "https://images.unsplash.com/photo-1526979118433-63c7344f06f1?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    ukelele = ProductImage(
        product_id = 8,
        image_url = "https://images.unsplash.com/photo-1541447554742-4b7eff548fe1?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    grand_piano = ProductImage(
        product_id = 9,
        image_url = "https://images.unsplash.com/photo-1518544897598-d3c0040f1089?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    cajon = ProductImage(
        product_id = 10,
        image_url = "https://images.unsplash.com/photo-1523309767134-749b82af8b13?q=80&w=2742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    rock_shirt = ProductImage(
        product_id = 11,
        image_url = "https://images.unsplash.com/photo-1519330377309-9ee1c6783348?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    pop_shirt = ProductImage(
        product_id = 12,
        image_url = "https://i.ebayimg.com/images/g/1sMAAOSw2CVgrOS3/s-l1200.webp"
    )
    jazz_shirt = ProductImage(
        product_id = 13,
        image_url = "https://images.unsplash.com/photo-1552847340-1e26a6af19d4?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    concert_shirt = ProductImage(
        product_id = 14,
        image_url = "https://i.ebayimg.com/images/g/1sMAAOSw2CVgrOS3/s-l1200.webp"
    )
    beach_shirt = ProductImage(
        product_id = 15,
        image_url = "https://cdn.shopify.com/s/files/1/1320/3823/files/Muscle-Beach-T-Shirt-For-Men-8Ball-9096.jpg?v=1707691950"
    )
    pop_hoodie = ProductImage(
        product_id = 16,
        image_url = "https://images.unsplash.com/photo-1609873814058-a8928924184a?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    superhero_shirt = ProductImage(
        product_id = 17,
        image_url = "https://www.merchandisingplaza.co.uk/206233/2/T-shirts-Marvel-Superheroes-Marvel-Superheroes-T-shirt---Marvel-Montage-Gray-l.jpg"
    )
    jazz_cd = ProductImage(
        product_id = 18,
        image_url = "https://images.unsplash.com/photo-1503853585905-d53f628e46ac?q=80&w=3056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    electronic_cd = ProductImage(
        product_id = 19,
        image_url = "https://images.unsplash.com/photo-1522745287160-f12721561e60?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    alternative_cd = ProductImage(
        product_id = 20,
        image_url = "https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=3572&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    rock_tape = ProductImage(
        product_id = 21,
        image_url = "https://i.ebayimg.com/images/g/2XoAAOSwCXVhfDTU/s-l1600.jpg"
    )
    indie_tape = ProductImage(
        product_id = 22,
        image_url = "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    vinil_tape = ProductImage(
        product_id = 23,
        image_url = "https://images.unsplash.com/photo-1689582880547-9f44899f6e6a?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    hiphop_tape = ProductImage(
        product_id = 24,
        image_url = "https://images.unsplash.com/photo-1636144106497-9014d58248bc?q=80&w=3764&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    soul_tape = ProductImage(
        product_id = 25,
        image_url = "https://plus.unsplash.com/premium_photo-1663047110595-1072e6a84323?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    rock_cd = ProductImage(
        product_id = 26,
        image_url = "https://images.unsplash.com/photo-1568742519063-d52207242898?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    random_pins = ProductImage(
        product_id = 27,
        image_url = "https://images.fineartamerica.com/images-medium-5/80s-music-rock-pins-jt-photodesign.jpg"
    )
    rock_pins = ProductImage(
        product_id = 28,
        image_url = "https://images.unsplash.com/photo-1590725923917-60416d04bb6f?q=80&w=3731&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    instrument_pins = ProductImage(
        product_id = 29,
        image_url = "https://m.media-amazon.com/images/I/517jkzJd+JL._AC_UY1000_.jpg"
    )
    guitar_pins = ProductImage(
        product_id = 30,
        image_url = "https://static.wixstatic.com/media/e13d97_9e6cd4348f294989a04fa69b07c1b7b9~mv2.jpg/v1/crop/x_0,y_150,w_2727,h_1423/fill/w_560,h_292,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IMG_E0277_JPG.jpg"
    )
    
    db.session.add(guitar)
    db.session.add(electric_guitar)
    db.session.add(bass_guitar)
    db.session.add(vibrato_violin)
    db.session.add(harmonic_harp)
    db.session.add(keyboard)
    db.session.add(mixer)
    db.session.add(ukelele)
    db.session.add(grand_piano)
    db.session.add(rock_shirt)
    db.session.add(jazz_cd)
    db.session.add(electronic_cd)
    db.session.add(indie_tape)
    db.session.add(jazz_shirt)
    db.session.add(vinil_tape)
    db.session.add(pop_hoodie)
    db.session.add(alternative_cd)
    db.session.add(pop_shirt)
    db.session.add(soul_tape)
    db.session.add(rock_cd)
    db.session.add(concert_shirt)
    db.session.add(beach_shirt)
    db.session.add(superhero_shirt)
    db.session.add(rock_tape)
    db.session.add(hiphop_tape)
    db.session.add(random_pins)
    db.session.add(instrument_pins)
    db.session.add(guitar_pins)
    db.session.add(rock_pins)
    db.session.add(cajon)
    db.session.commit()

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
    
    