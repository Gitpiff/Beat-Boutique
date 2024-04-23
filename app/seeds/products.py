from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    guitar = Product(
        owner_id = 1,
        name = "Acoustic Guitar",
        description = "A classic instrument for beginners and professionals",
        type = "MUSICAL_INSTRUMENTS",
        price = 300,
        inventory = 10
    )
    electric_guitar = Product(
        owner_id = 2,
        name = "Electric Guitar",
        description = "Popular in rock, jazz, and blues music.",
        type = "MUSICAL_INSTRUMENTS",
        price = 500,
        inventory = 7
    )
    bass_guitar = Product(
        owner_id = 3,
        name = "Bass Guitar",
        description = "Essential for the rhythm section in bands.",
        type = "MUSICAL_INSTRUMENTS",
        price = 250,
        inventory = 5
    )
    vibrato_violin = Product(
        owner_id = 1,
        name = "Vibrato Violin",
        description = "A handcrafted violin with rich tones, perfect for classical music enthusiasts.",
        type = "MUSICAL_INSTRUMENTS",
        price = 450,
        inventory = 4
    )
    harmonic_harp = Product(
        owner_id = 2,
        name = "Harmonic Harp",
        description = "Full-sized orchestral harp with 47 strings for a complete range of notes. ",
        type = "MUSICAL_INSTRUMENTS",
        price = 1250,
        inventory = 5
    )
    keyboard = Product(
        owner_id = 3,
        name="Dynamic Keyboard",
        description="An electronic keyboard with 88 weighted keys and various instrument sounds.",
        type = "MUSICAL_INSTRUMENTS",
        price=499,
        inventory=3
    )
    mixer = Product(
        owner_id = 1,
        name="Electronic Mixer",
        description="A DJ mixer equipped with advanced features for live performances.",
        type = "MUSICAL_INSTRUMENTS",
        price=750,
        inventory=4
    )
    ukelele = Product(
        owner_id = 2,
        name="Ukulele Fun",
        description="A fun and light ukulele for players of all ages.",
        type = "MUSICAL_INSTRUMENTS",
        price=90,
        inventory=9
    )
    grand_piano = Product(
        owner_id = 1,
        name="Grand Piano",
        description="A magnificent grand piano that combines rich tone and precise action.",
        type = "MUSICAL_INSTRUMENTS",
        price=10000,
        inventory=2

    )
    cajon = Product(
        owner_id = 3,
        name="Cajun Cajon", 
        description="Handmade wooden cajon with adjustable snare wires for percussionists.", 
        type = "MUSICAL_INSTRUMENTS",
        price=120, 
        inventory=7
    )
    rock_shirt= Product(
        owner_id = 2,
        name="Rock Legend T-shirt", 
        description="A T-shirt featuring a legendary rock icon.", 
        type = "CLOTHING",
        price=25, 
        inventory=10
    )
    pop_shirt= Product(
        owner_id = 2,
        name="Pop T-shirt", 
        description="A T-shirt featuring a legendary pop icon.", 
        type = "CLOTHING",
        price=25, 
        inventory=10
    )
    jazz_shirt = Product(
        owner_id = 2,
        name="Jazz Night T-shirt", 
        type="CLOTHING",
        description="A stylish T-shirt for jazz night events.", 
        price=24, 
        inventory=7
    )
    concert_shirt = Product(
        owner_id = 2,
        name="Concert T-shirt", 
        type="CLOTHING",
        description="Rock your fandom with this stylish concert t-shirt, featuring a dynamic front graphic of the artist and tour dates on the back, perfect for any music enthusiast!", 
        price=24, 
        inventory=7
    )
    beach_shirt = Product(
        owner_id = 2,
        name="T-shirt for the beach", 
        type="CLOTHING",
        description="Embrace summer vibes with this vibrant beach shirt, adorned with a tropical print and lightweight fabric, ideal for sunny days by the sea!", 
        price=24, 
        inventory=7
    )
    pop_hoodie = Product(
        owner_id = 2,
        name="Pop Icons Hoodie", 
        description="A comfortable hoodie featuring icons of pop music.", 
        type="CLOTHING",
        price=45, 
        inventory=5
    )
    superhero_shirt = Product(
        owner_id = 2,
        name="Super Heroe T-shirt", 
        type="CLOTHING",
        description="Unleash your inner hero with this dynamic superhero shirt, featuring bold graphics of your favorite character ready for action!", 
        price=24, 
        inventory=7
    )
    jazz_cd = Product(
        owner_id = 3,
        name="Jazz Fusion CD", 
        description="A CD collection of the best jazz fusion tracks.", 
        price=15, 
        type="CDS",
        inventory=5,
    )
    electronic_cd = Product(
        owner_id = 1,
        name="Electronic Beats CD", 
        description="A CD with popular electronic beats and tracks for DJing.", 
        price=12, 
        type="CDS",
        inventory=8
    )
    alternative_cd = Product(
        owner_id = 1,
        name="Alternative Hits CD", 
        description="A CD filled with top alternative rock tracks.", 
        price=13, 
        type="CDS",
        inventory=8
    )
    rock_tape = Product(
        owner_id = 1,
        name="Rock Revival CD", 
        description="A tape reviving classic rock hits.", 
        type="TAPES",
        price=16, 
        inventory=7
    )
    indie_tape = Product(
        owner_id = 1,
        name="Indie Anthems Tape", 
        description="A collection of indie anthems on cassette.", 
        type="TAPES",
        price=9, 
        inventory=10
    )
    vinil_tape = Product(
        owner_id = 3,
        name="Vinyl Vibe Tape", 
        description="A retro tape featuring classic vinyl records from the 80s.", 
        type="TAPES",
        price=9, 
        inventory=6
    )
    hiphop_tape = Product(
        owner_id = 3,
        name="Hip-Hop Beats Tape", 
        description="A tape with crisp and catchy hip-hop beats.", 
        type="TAPES",
        price=11, 
        inventory=7
    )
    soul_tape = Product(
        owner_id = 2,
        name="Soul Session Tape", 
        description="An exclusive tape with soulful live sessions.", 
        type="TAPES",
        price=12, 
        inventory=9
    )
    rock_cd = Product(
        owner_id = 1,
        name="Rock CD",
        description= "Turn up the volume with this electrifying rock CD, packed with powerful guitar riffs and unforgettable anthems that define a generation!",
        type="CDS",
        price=15,
        inventory=10
    )
    random_PINS = Product(
        owner_id = 1,
        name="Random PINS", 
        description="Set of random Rock bands",
        type="PINS", 
        price=25, 
        inventory=10
    )
    rock_PINS = Product(
        owner_id = 2,
        name="Punk Rock PINS", 
        description="A set of assorted punk rock enamel PINS, perfect for decorating jackets and backpacks.", 
        type="PINS",
        price=15, 
        inventory=9
    )
    instuments_PINS = Product(
        owner_id = 3,
        name="Instrument PINS",
        description="Set of PINS of MUSICAL_INSTRUMENTS",
        type="PINS",
        price=30,
        inventory=10
    )
    guitar_PINS = Product(
        owner_id = 2,
        name="Guitar PINS",
        description = "Guitar PINS, perfect for decorating jackets",
        type="PINS",
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
    db.session.add(rock_PINS)
    db.session.add(cajon)
    db.session.add(concert_shirt)
    db.session.add(beach_shirt)
    db.session.add(superhero_shirt)
    db.session.add(rock_tape)
    db.session.add(random_PINS)
    db.session.add(instuments_PINS)
    db.session.add(guitar_PINS)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
    
