#!/usr/bin/env python3


import sys
import functools

libsdir = '../automatelibs'
sys.path.append(libsdir)

import Qcsv
import Qdir
import Qjson

json_output = "../compiledoutput/combined.json"
csv_output = "../compiledoutput/combined.csv"

def combineData(combined_dict_data, listdata):
  for eachdata in listdata:
    combined_dict_data[eachdata['regnumber']] = eachdata
  

listjsonfiles = Qdir.findFileInDir('../output',fltofind=r'.*\.json$')
combined_dict_data = {}
for jsonfile in listjsonfiles:
  json_data = Qjson.readjson(jsonfile)
  combineData(combined_dict_data, json_data)

list_data = list(combined_dict_data.values())
header_data = map(lambda x: list(x.keys()), list_data)
headers = []
a = [headers.extend(eachheader) for eachheader in header_data]
uniq_header = list(set(headers))


Qjson.writejson(json_output,list_data)
Qcsv.writecsv(csv_output,list_data, uniq_header)
