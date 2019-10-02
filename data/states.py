import json
from fuzzywuzzy import process
import pandas as pd
import random

def process_latlong():
    data = {}
    with open('latlong.txt', 'r') as f:
        lines = f.read().split('\n')
        for line in lines:
            print(line.split('\t'))
            state,  longitude, latitude = line.split('\t')
            data[state] = {
                'latitude': latitude,
                'longitude': longitude
            }

    with open('latlong.json', 'w+') as f:
        json.dump(data, f)


def process_emoji():
    df = pd.read_csv('tweets.csv')

    with open('emoji.txt','r') as f:
        emoji = f.read().split(' ')

    with open('states.txt', 'r') as f:
        lines = f.read().split('\n')
        states = [' '.join(line.split(' - ')) for line in lines]

    for state in states:
        pass

def random_data():
    with open('emoji.txt','r') as f:
        emoji = f.read().split(' ')

    with open('states.txt', 'r') as f:
        lines = f.read().split('\n')
        states = [line.split(' - ')[0] for line in lines]
        data = {state: random.choice(emoji) for state in states}

    with open('latlong.json', 'r') as f:
        latlong = json.load(f)
        rand_data = {}
        for state in latlong.keys():
            rand_data[state] = {
                'latitude': latlong[state]['latitude'],
                'longitude': latlong[state]['longitude'],
                'emoji': random.choice(emoji),
                'count': random.randint(1, 10000)
            }

    with open('rand_data.json', 'w+') as f:
        json.dump(rand_data, f)

def process_states():
    with open('states.txt', 'r') as f:
        lines = f.read().split('\n')
        states = [line.split(' - ') for line in lines]
        data = {}
        for state, abbr in states:
            data[state] = state
            data[abbr] = state

    with open('states-abbr.json', 'w+') as f:
        json.dump(data, f)

process_states()