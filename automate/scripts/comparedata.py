#!/usr/bin/env python3

import sys
import re
import json
import csv
import os
import glob
import qrcode

## read csv
def readcsv(csvpath):
  with open(csvpath) as csv_file:
    csv_file.seek(0)
    reader = csv.reader(csv_file)
    header = next(reader)
    readings = []
    for row in reader:
      reading = {}
      for index, heading in enumerate(header):
        reading[heading] = row[index]
      readings.append(reading)
    return readings

def writecsv(csvpath, dictdata):
  print(dictdata[0])
  headers = list(dictdata[0].keys())
  print(headers)
  with open(csvpath, 'w') as csvfile:
    dict_writer = csv.DictWriter(csvfile, headers)
    dict_writer.writeheader()
    dict_writer.writerows(dictdata)
    csvfile.close()

def readjson(jsonpath):
  with open(jsonpath, 'r') as json_file:
    data = json.loads(json_file.read())
  return data

def writejson(jsonpath, dictdata):
  with open(jsonpath, 'w') as json_file:  
    json.dump(dictdata, json_file)

def find_no(val_to_find, json_data):
  output = None
  for each_data in json_data:
    if each_data.get('No') == val_to_find:
      print(each_data)
      output = each_data
      break
  return output

def cleandirectory(dir_path):
  c_dirpath = "{}/*".format(dir_path)
  files = glob.glob(c_dirpath)
  for f in files:
    os.remove(f)

def generateqr(txt, qrname, qrpath):
  filenm = "{}/{}".format(qrpath,qrname)
  qr = qrcode.QRCode(version=1,
                    error_correction=qrcode.constants.ERROR_CORRECT_L,
                    box_size=8,
                    border=1,
                    )
  #img = qrcode.make(txt)
  qr.add_data(txt)
  qr.make(fit=True)
  img = qr.make_image()
  img.save(filenm,'JPEG')

existing_data_json = '../output/20190930/DataKosong_sheet2/output.json'
new_data_csv = '../data/tomerge.csv'
output_qr_dir = "../output/output_qr"
os.makedirs(output_qr_dir, exist_ok=True)
cleandirectory(output_qr_dir)
output_jsonfilepath = "../output/output.json"
output_csvfilepath = "../output/output.csv"

existing_data = readjson(existing_data_json)
new_data = readcsv(new_data_csv)

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
  generateqr(gcode, qrname, output_qr_dir)

writejson(output_jsonfilepath, existing_data)
writecsv(output_csvfilepath, existing_data)
print(existing_data)