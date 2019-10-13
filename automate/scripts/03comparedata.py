#!/usr/bin/env python3

"""
Script To 
"""


import sys
import re
import json
import csv
import os

libsdir = '../automatelibs'
sys.path.append(libsdir)

import Qcsv
import Qjson
import Qapi
import Qdir
import Qqrcode

def find_no(val_to_find, json_data):
  output = None
  for each_data in json_data:
    if each_data.get('No') == val_to_find:
      print(each_data)
      output = each_data
      break
  return output

existing_data_json = '../output/20190930/DataKosong_sheet2/output.json'
new_data_csv = '../data/tomerge.csv'
output_qr_dir = "../output/output_qr"
os.makedirs(output_qr_dir, exist_ok=True)
Qdir.cleandirectory(output_qr_dir)
output_jsonfilepath = "../output/output.json"
output_csvfilepath = "../output/output.csv"

existing_data = Qjson.readjson(existing_data_json)
new_data = Qcsv.readcsv(new_data_csv)

for each_existing in existing_data:
  print(each_existing)
  found_data = find_no(each_existing['regnumber'], new_data)
  if found_data is not None:
    print(found_data)
    each_existing['name'] = found_data.get('Nama')
    each_existing['alamat'] = found_data.get('Alamat')
    each_existing['city'] = found_data.get('Kota')
    each_existing['num_invited'] = found_data.get('Jumlah orang')
  regnumber = "{:04d}".format(int(each_existing['regnumber']))
  qrname = "{}.jpeg".format(regnumber)
  gcode = each_existing['code']
  Qqrcode.generateqr(gcode, qrname, output_qr_dir)

Qjson.writejson(output_jsonfilepath, existing_data)
Qcsv.writecsv(output_csvfilepath, existing_data)
print(existing_data)