#!/usr/bin/env pyhton3


import requests

def getGuestlist(url):
  r = requests.get(url)
  return r.json()

def findInDict(complete_dict, dict_key, dict_value_to_find):
  for x in complete_dict:
    if x.get(dict_key) == dict_value_to_find:
      return x
  return None
