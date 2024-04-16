from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    guitar = Product(
        owner_id = 1,
        name = "Acoustic Guitar",
        description = "A classic instrument for beginners and professionals",
        price = 300,
        inventory = 10
    )
    electric_guitar = Product(
        owner_id = 2,
        name = "Electric Guitar",
        description = "Popular in rock, jazz, and blues music.",
        price = 500,
        inventory = 7
    )
    bass_guitar = Product(
        owner_id = 3,
        name = "Bass Guitar",
        description = "Essential for the rhythm section in bands.",
        price = 250,
        inventory = 5
    )
    vibrato_violin = Product(
        owner_id = 1,
        name = "Vibrato Violin",
        description = "A handcrafted violin with rich tones, perfect for classical music enthusiasts.",
        price = 450,
        inventory = 4
    )
    harmonic_harp = Product(
        owner_id = 2,
        name = "Harmonic Harp",
        description = "Full-sized orchestral harp with 47 strings for a complete range of notes. ",
        price = 1250,
        inventory = 5
    )
    keyboard = Product(
        owner_id = 3,
        name="Dynamic Keyboard",
        description="An electronic keyboard with 88 weighted keys and various instrument sounds.",
        price=499.50,
        inventory=3
    )
    mixer = Product(
        owner_id = 1,
        name="Electronic Mixer",
        description="A DJ mixer equipped with advanced features for live performances.",
        price=750.00,
        inventory=4
    )
    ukelele = Product(
        owner_id = 2,
        name="Ukulele Fun",
        description="A fun and light ukulele for players of all ages.",
        price=90.00,
        inventory=9
    )
    grand_piano = Product(
        owner_id = 3,
        name="Grand Piano",
        description="A magnificent grand piano that combines rich tone and precise action.",
        price=10000.00,
        inventory=2

    )
    rock_shirt= Product(
        owner_id = 3,
        name="Rock Legend T-shirt", 
        description="A T-shirt featuring a legendary rock icon.", 
        price=25.00, 
        inventory=10
    )
    jazz_cd = Product(
        owner_id = 3,
        name="Jazz Fusion CD", 
        description="A CD collection of the best jazz fusion tracks.", 
        price=15.99, 
        inventory=5,
    )
    electronic_shirt = Product(
        owner_id = 3,
        name="Electronic Beats CD", 
        description="A CD with popular electronic beats and tracks for DJing.", 
        price=12.00, 
        inventory=8
    )
    indie_tape = Product(
        owner_id = 3,
        name="Indie Anthems Tape", 
        description="A collection of indie anthems on cassette.", 
        price=9.50, 
        inventory=10
    )
    jazz_shirt = Product(
        owner_id = 3,
        name="Jazz Night T-shirt", 
        description="A stylish T-shirt for jazz night events.", 
        price=24.00, 
        inventory=7
    )
    vinil_tape = Product(
        owner_id = 3,
        name="Vinyl Vibe Tape", 
        description="A retro tape featuring classic vinyl records from the 80s.", 
        price=9.99, 
        inventory=6
    )
    pop_hoodie = Product(
        owner_id = 3,
        name="Pop Icons Hoodie", 
        description="A comfortable hoodie featuring icons of pop music.", 
        price=45.00, 
        inventory=5
    )
    alternative_cd = Product(
        owner_id = 3,
        name="Alternative Hits CD", 
        description="A CD filled with top alternative rock tracks.", 
        price=13.50, 
        inventory=8
    )
    hiphop_tape = Product(
        owner_id = 3,
        name="Hip-Hop Beats Tape", 
        description="A tape with crisp and catchy hip-hop beats.", 
        price=11.00, 
        inventory=7
    )
    soul_tape = Product(
        owner_id = 3,
        name="Soul Session Tape", 
        description="An exclusive tape with soulful live sessions.", 
        price=12.50, 
        inventory=9
    )
    rock_cd = Product(
        owner_id = 3,
        name="Rock Revival CD", 
        description="A CD reviving classic rock hits with modern twists.", 
        price=16.75, 
        inventory=7
    )
    music_book = Product(
        owner_id = 3,
        name="Music Theory Book", 
        description="An introductory book on music theory, perfect for beginners looking to understand the basics of music composition.", 
        price=25.00, 
        inventory=10
    )
    rock_pins = Product(
        owner_id = 3,
        name="Punk Rock Pins", 
        description="A set of assorted punk rock enamel pins, perfect for decorating jackets and backpacks.", 
        price=15.00, 
        inventory=9
    )
    cajon = Product(
        owner_id = 3,
        name="Cajun Cajon", 
        description="Handmade wooden cajon with adjustable snare wires for percussionists.", 
        price=120, 
        inventory=7
    )


