#!/usr/bin/env python3

import csv

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