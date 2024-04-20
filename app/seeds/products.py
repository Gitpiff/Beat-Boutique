from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    guitar = Product(
        owner_id = 1,
        name = "Acoustic Guitar",
        description = "A classic instrument for beginners and professionals",
        type = "Musical Instruments",
        price = 300,
        inventory = 10
    )
    electric_guitar = Product(
        owner_id = 2,
        name = "Electric Guitar",
        description = "Popular in rock, jazz, and blues music.",
        type = "Musical Instruments",
        price = 500,
        inventory = 7
    )
    bass_guitar = Product(
        owner_id = 3,
        name = "Bass Guitar",
        description = "Essential for the rhythm section in bands.",
        type = "Musical Instruments",
        price = 250,
        inventory = 5
    )
    vibrato_violin = Product(
        owner_id = 1,
        name = "Vibrato Violin",
        description = "A handcrafted violin with rich tones, perfect for classical music enthusiasts.",
        type = "Musical Instruments",
        price = 450,
        inventory = 4
    )
    harmonic_harp = Product(
        owner_id = 2,
        name = "Harmonic Harp",
        description = "Full-sized orchestral harp with 47 strings for a complete range of notes. ",
        type = "Musical Instruments",
        price = 1250,
        inventory = 5
    )
    keyboard = Product(
        owner_id = 3,
        name="Dynamic Keyboard",
        description="An electronic keyboard with 88 weighted keys and various instrument sounds.",
        type = "Musical Instruments",
        price=499,
        inventory=3
    )
    mixer = Product(
        owner_id = 1,
        name="Electronic Mixer",
        description="A DJ mixer equipped with advanced features for live performances.",
        type = "Musical Instruments",
        price=750,
        inventory=4
    )
    ukelele = Product(
        owner_id = 2,
        name="Ukulele Fun",
        description="A fun and light ukulele for players of all ages.",
        type = "Musical Instruments",
        price=90,
        inventory=9
    )
    grand_piano = Product(
        owner_id = 1,
        name="Grand Piano",
        description="A magnificent grand piano that combines rich tone and precise action.",
        type = "Musical Instruments",
        price=10000,
        inventory=2

    )
    cajon = Product(
        owner_id = 3,
        name="Cajun Cajon", 
        description="Handmade wooden cajon with adjustable snare wires for percussionists.", 
        type = "Musical Instruments",
        price=120, 
        inventory=7
    )
    rock_shirt= Product(
        owner_id = 2,
        name="Rock Legend T-shirt", 
        description="A T-shirt featuring a legendary rock icon.", 
        type = "Clothing",
        price=25, 
        inventory=10
    )
    pop_shirt= Product(
        owner_id = 2,
        name="Pop T-shirt", 
        description="A T-shirt featuring a legendary pop icon.", 
        type = "Clothing",
        price=25, 
        inventory=10
    )
    jazz_shirt = Product(
        owner_id = 2,
        name="Jazz Night T-shirt", 
        type="Clothing",
        description="A stylish T-shirt for jazz night events.", 
        price=24, 
        inventory=7
    )
    concert_shirt = Product(
        owner_id = 2,
        name="Concert T-shirt", 
        type="Clothing",
        description="Rock your fandom with this stylish concert t-shirt, featuring a dynamic front graphic of the artist and tour dates on the back, perfect for any music enthusiast!", 
        price=24, 
        inventory=7
    )
    beach_shirt = Product(
        owner_id = 2,
        name="T-shirt for the beach", 
        type="Clothing",
        description="Embrace summer vibes with this vibrant beach shirt, adorned with a tropical print and lightweight fabric, ideal for sunny days by the sea!", 
        price=24, 
        inventory=7
    )
    pop_hoodie = Product(
        owner_id = 2,
        name="Pop Icons Hoodie", 
        description="A comfortable hoodie featuring icons of pop music.", 
        type="Clothing",
        price=45, 
        inventory=5
    )
    superhero_shirt = Product(
        owner_id = 2,
        name="Super Heroe T-shirt", 
        type="Clothing",
        description="Unleash your inner hero with this dynamic superhero shirt, featuring bold graphics of your favorite character ready for action!", 
        price=24, 
        inventory=7
    )
    jazz_cd = Product(
        owner_id = 3,
        name="Jazz Fusion CD", 
        description="A CD collection of the best jazz fusion tracks.", 
        price=15, 
        type="CDs",
        inventory=5,
    )
    electronic_cd = Product(
        owner_id = 1,
        name="Electronic Beats CD", 
        description="A CD with popular electronic beats and tracks for DJing.", 
        price=12, 
        type="CDs",
        inventory=8
    )
    alternative_cd = Product(
        owner_id = 1,
        name="Alternative Hits CD", 
        description="A CD filled with top alternative rock tracks.", 
        price=13, 
        type="CDs",
        inventory=8
    )
    rock_tape = Product(
        owner_id = 1,
        name="Rock Revival CD", 
        description="A tape reviving classic rock hits.", 
        type="Tapes",
        price=16, 
        inventory=7
    )
    indie_tape = Product(
        owner_id = 1,
        name="Indie Anthems Tape", 
        description="A collection of indie anthems on cassette.", 
        type="Tapes",
        price=9, 
        inventory=10
    )
    vinil_tape = Product(
        owner_id = 3,
        name="Vinyl Vibe Tape", 
        description="A retro tape featuring classic vinyl records from the 80s.", 
        type="Tapes",
        price=9, 
        inventory=6
    )
    hiphop_tape = Product(
        owner_id = 3,
        name="Hip-Hop Beats Tape", 
        description="A tape with crisp and catchy hip-hop beats.", 
        type="Tapes",
        price=11, 
        inventory=7
    )
    soul_tape = Product(
        owner_id = 2,
        name="Soul Session Tape", 
        description="An exclusive tape with soulful live sessions.", 
        type="Tapes",
        price=12, 
        inventory=9
    )
    rock_cd = Product(
        owner_id = 1,
        name="Rock CD",
        description= "Turn up the volume with this electrifying rock CD, packed with powerful guitar riffs and unforgettable anthems that define a generation!",
        type="CDs",
        price=15,
        inventory=10
    )
    random_pins = Product(
        owner_id = 1,
        name="Random Pins", 
        description="Set of random Rock bands",
        type="Pins", 
        price=25, 
        inventory=10
    )
    rock_pins = Product(
        owner_id = 2,
        name="Punk Rock Pins", 
        description="A set of assorted punk rock enamel pins, perfect for decorating jackets and backpacks.", 
        type="Pins",
        price=15, 
        inventory=9
    )
    instuments_pins = Product(
        owner_id = 3,
        name="Instrument Pins",
        description="Set of pins of musical instruments",
        type="Pins",
        price=30,
        inventory=10
    )
    guitar_pins = Product(
        owner_id = 2,
        name="Guitar Pins",
        description = "Guitar Pins, perfect for decorating jackets",
        type="Pins",
        price=25,
        inventory=10
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
    db.session.add(hiphop_tape)
    db.session.add(soul_tape)
    db.session.add(rock_cd)
    db.session.add(pop_shirt)
    db.session.add(rock_pins)
    db.session.add(cajon)
    db.session.add(concert_shirt)
    db.session.add(beach_shirt)
    db.session.add(superhero_shirt)
    db.session.add(rock_tape)
    db.session.add(random_pins)
    db.session.add(instuments_pins)
    db.session.add(guitar_pins)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
    
