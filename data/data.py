import requests
import tweepy
import os
from tqdm import tqdm

auth = tweepy.AppAuthHandler(os.environ['CONSUMER_KEY'],os.environ['CONSUMER_SECRET'])
api = tweepy.API(auth,wait_on_rate_limit=True)

geocode = '45.604186,-96.650757,2523km'

def get_tweets(q):
    return [','.join([tweet.created_at.__repr__(), tweet.user.location, tweet.text]) for tweet in
            tweepy.Cursor(api.search, q=q, lang='eu', geocode=geocode).items()]

with open('emoji.txt','r') as f:
    emojis = f.read().split(' ')

queries = []
for emoji in emojis:
    if len(queries) == 0 or len(queries[-1]) > 40:
        queries.append(emoji)
    else:
        queries[-1] += ' OR ' + emoji

with open('tweets.csv', 'w+') as f:
    f.write('datetime,location,text\n')
    for emoji in tqdm(emojis, desc='Fetching tweets for emoji...'):
        for t in get_tweets(emoji):
            f.write(t+'\n')

