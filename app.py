# import necessary libraries
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
# import refugee_news

# create instance of Flask app
app = Flask(__name__) 

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/refugee_app"
mongo = PyMongo(app)

# Create route that finds documents from Mongo and renders index.html template
@app.route("/")
def index():
    
    # Find data
    refugeeNews = mongo.db.refugeeNews.items.find_one()

    # return template and data
    return render_template("index.html", refugeeNews = refugeeNews)


# Run app
if __name__ == "__main__":
    app.run(debug=True)
