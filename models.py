from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMG_URL = 'https://tinyurl.com/demo-cupcake'


class Cupcake(db.Model):
    """Cupcake."""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer,
                   primary_key=True)

    flavor = db.Column(db.Text,
                       nullable=False)

    size = db.Column(db.Text,
                     nullable=False)

    rating = db.Column(db.Float, nullable=False)

    image = db.Column(db.Text, nullable=False, default=DEFAULT_IMG_URL)


def serialize_cupcake(cupcake):
    """Serialize a cupcake SQLAlchemy obj to dictionary."""

    return {
        "id": cupcake.id,
        "flavor": cupcake.flavor,
        "size": cupcake.size,
        "rating": cupcake.rating,
        "image": cupcake.image
    }


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
