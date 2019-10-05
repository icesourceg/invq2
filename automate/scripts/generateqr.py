#!/usr/bin/env python3

import qrcode
import random
import string
import json
import csv
import uuid
import random
import re
import os
import glob

num_vip_cur = 0
num_vip_max = 100
vip_desk = list(range(1,13))

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

def writejson(jsonpath, dictdata):
  with open(jsonpath, 'w') as json_file:  
    json.dump(dictdata, json_file)

def randomvip():
  global num_vip_cur, num_vip_max 
  listguesttype = ['vip','reg']
  if num_vip_cur <= num_vip_max:
    guesttype = random.choice(listguesttype)
    if guesttype == 'vip':
      num_vip_cur += 1
  else:
    guesttype = 'reg'
  return guesttype

def randomdesk(gtype):
  global vip_desk
  if gtype == 'vip':
    desk_num = random.choice(vip_desk)
  else:
    desk_num = "-"
  return desk_num

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

if __name__ == "__main__":

  csvfilepath = "../data/data_kosong.csv"
  output_jsonfilepath = "../output/output.json"
  output_csvfilepath = "../output/output.csv"
  os.makedirs(os.path.dirname(output_jsonfilepath), exist_ok=True)
  output_qr_dir = "../output/output_qr"
  os.makedirs(output_qr_dir, exist_ok=True)
  listcsvcontent = readcsv(csvfilepath)
  cleandirectory(output_qr_dir)
  
  formatted_data = []
  for eachcontent in listcsvcontent:
    ## limit number of vip 
    #gtype = randomvip()
    print(eachcontent)
    ## random desk , if vip the desk should be between 1-12
    #dnumber = randomdesk(gtype)
    if eachcontent.get('Note') == "VIP":
      note = eachcontent.get('Note')
      gtype = "VIP"
      dnumber = eachcontent.get('No Meja')
    else:
      note = "none" if eachcontent.get('Note') == "" else eachcontent.get('Note')
      gtype = "reg"
      dnumber = "-"

    gcode = str(uuid.uuid4())
    #gcode = eachcontent.get('Kode')
    regnumber = "{:04d}".format(int(eachcontent.get('No')))
    clean_shop_name = re.sub(r"[^\w\s]", '', eachcontent.get('Nama'))
    qrname = "{}.jpeg".format(regnumber)
    each_data = {
      "name": eachcontent.get('Nama'),
      "alamat": eachcontent.get('Alamat'),
      "num_invited": eachcontent.get('Jumlah orang'),
      "city": eachcontent.get('Kota'),
      "code": gcode,
      "guesttype": gtype,
      "desknumber": dnumber,
      "regnumber": regnumber,
      "note": note
    }
    formatted_data.append(each_data)
    generateqr(gcode, qrname, output_qr_dir)

  writejson(output_jsonfilepath, formatted_data)
  writecsv(output_csvfilepath, formatted_data)
  print(formatted_data)

# OUTPUTPATH = "qr-output2"
# RND=string.lowercase+string.digits
# idxnm = "%s/index.csv" %(OUTPUTPATH)
# NUMRND = 5
# NUMPUTPUT = 1000

# open(idxnm,"w").close()

# def writeindex(txtinput,filenm):
#     f = open(filenm,"a")
#     f.writelines(txtinput+"\n")
#     f.close()


# for i in range(0,NUMPUTPUT):
#     txt = "AS-" + ''.join(random.sample(RND,NUMRND))
#     filenm = "%s/%s.jpg" %(OUTPUTPATH,txt)
#     writeindex(txt, idxnm)
#     qr = qrcode.QRCode(version=1,
#                             error_correction=qrcode.constants.ERROR_CORRECT_L,
#                             box_size=8,
#                             border=1,
#                            )
#     #img = qrcode.make(txt)
#     qr.add_data(txt)
#     qr.make(fit=True)
#     img = qr.make_image()
#     img.save(filenm,'JPEG')