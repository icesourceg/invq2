#!/usr/bin/env python3


import sys
import functools
import requests
import json

libsdir = '../automatelibs'
sys.path.append(libsdir)

import Qcsv
import Qdir
import Qjson
import Qapi

json_file_path = "../compiledoutput/combinedlisted.json"
json_data = Qjson.readjson(json_file_path)
url = 'http://aya.cayalabs.com:5000/api/guest/addbulk'
token = 'Y2E2YTJjYmUwNTA5ZTYxNjAxNmI0MWU5'

for each_json in json_data:
  compiled_json = {"data": [each_json]}
  print(compiled_json)
  Qapi.sendGuest(url,json.dumps(compiled_json), token)
