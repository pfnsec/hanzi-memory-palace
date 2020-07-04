import yaml
import json

import cedict


hzDict = {}


n = 0 

infile = open('cedict_1_0_ts_utf-8_mdbg.txt', encoding="utf-8")
for ch, chs, pinyin, defs, variants, mw in cedict.iter_cedict(infile):

#    print(chs, cedict.pinyinize(pinyin), defs)
    pron = cedict.pinyinize(pinyin),

    # Skip surnames
    #if(len(defs) == 1 and defs[0].startswith('surname')): continue
    #if(pron[0].isupper()): continue

    # Skip duplicates...
    #if(chs in hzDict): continue

    if(chs not in hzDict): 
        hzDict[chs] = []

    hzDict[chs].append({
        'pron': pron,
        'defs': defs
    })

    print(n)
    n += 1


with open('hanzi-dict.json', 'w') as outfile:
    json.dump(hzDict, outfile)