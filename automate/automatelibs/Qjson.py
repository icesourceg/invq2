#!/usr/bin/env python3
import json

def writejson(jsonpath, dictdata):
  with open(jsonpath, 'w') as json_file:  
    json.dump(dictdata, json_file)

def readjson(jsonpath):
  with open(jsonpath, 'r') as json_file:
    data = json.loads(json_file.read())
  return data