import json
import yaml



res = []

with open('hanzi-dict.json') as json_file:
    hanziDict = json.load(json_file)

    with open('hanzidb.yaml') as file:
        hanzidb = yaml.load(file, Loader=yaml.FullLoader)

        for h in hanzidb:
            
            defs = hanziDict.get(h)

            r = {
                'word': h,
                'defs': defs
            }

            #print(r)

            res.append(r)


with open('hanzidb-translated.json', 'w') as outfile:
    json.dump(res, outfile)


