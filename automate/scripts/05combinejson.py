#!/usr/bin/env python3


import sys
import functools

libsdir = '../automatelibs'
sys.path.append(libsdir)

import Qcsv
import Qdir
import Qjson

csv_input = "../data/recap.csv"

json_output = "../compiledoutput/combined.json"
csv_output = "../compiledoutput/combined.csv"

def combineData(combined_dict_data, listdata):
  for eachdata in listdata:
    eachdata['guesttype'] = 'Reguler' if eachdata['guesttype'] == 'reg' else eachdata['guesttype']
    eachdata['num_invited'] = '2' if eachdata['num_invited'] == '' else eachdata['num_invited']
    combined_dict_data[eachdata['regnumber']] = eachdata
  

listjsonfiles = Qdir.findFileInDir('../output',fltofind=r'.*\.json$')
combined_dict_data = {}
for jsonfile in listjsonfiles:
  json_data = Qjson.readjson(jsonfile)
  combineData(combined_dict_data, json_data)

#print(combined_dict_data)
csv_data = Qcsv.readcsv(csv_input)

for each_data in csv_data:
  try:
    noval = "{:04d}".format(int(each_data.get('no')))
    #print(each_data)
    combined_dict_data[noval]['name'] = each_data['nama']
    combined_dict_data[noval]['address'] = each_data['alamat']
    combined_dict_data[noval]['city'] = each_data['kota']
    combined_dict_data[noval]['num_invited'] = each_data['JML']
    combined_dict_data[noval]['guesttype'] = each_data['Status']
    combined_dict_data[noval]['regnumber'] = noval
  except:
    print()
    if each_data.get('no') != '':
      noval = "{:04d}".format(int(each_data.get('no')))
      combined_dict_data[noval] = {
        'regnumber': noval,
        'name': each_data['nama'],
        'address': each_data['alamat'],
        'city': each_data['kota'],
        'num_invited': each_data['JML'],
        'guesttype': each_data['Status'],
      }
    else:
      print("error: {}".format(each_data))

list_data = list(combined_dict_data.values())
header_data = map(lambda x: list(x.keys()), list_data)
headers = []
a = [headers.extend(eachheader) for eachheader in header_data]
uniq_header = list(set(headers))


Qjson.writejson(json_output,list_data)
Qcsv.writecsv(csv_output,list_data, uniq_header)
