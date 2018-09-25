import json
import requests
import pprint
import datetime
import pymongo

# Initialize PyMongo to work with MongoDBs
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# Define database and collection
db = client.refugeeNews
collection = db.items


url = ('https://newsapi.org/v2/everything?'
       'q=refugees&'
       'from='+datetime.datetime.today().strftime('%Y-%m-%d')+'&'
       'sortBy=popularity&'
       'apiKey=bf468afe896d4afea9dbeb3babe274bf')

response = requests.get(url).json()


for article in response['articles']:
    title = article['title']
    url = article['url']
    content = article['content']

    # print(title)
    # print(url)
    # print(content)

refugeeNews = {'title': [], 'link': [], 'content':[]}


for article in response['articles']:
    title = article['title']
    url = article['url']
    content = article['content']

    refugeeNews['title'].append(article['title'])
    refugeeNews['link'].append(article['url'])
    refugeeNews['content'].append(article['content'])

collection.insert_one(refugeeNews)
# print(news['title'][1])
