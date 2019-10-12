#!/usr/bin/env python3

import random
import string
import uuid
import random
import re
import os
import sys

libsdir = '../automatelibs'
sys.path.append(libsdir)

import Qcsv
import Qjson
import Qapi
import Qdir
import Qqrcode


num_vip_cur = 0
num_vip_max = 100
vip_desk = list(range(1,13))

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

if __name__ == "__main__":

  csvfilepath = "../data/sheetkosong.csv"
  output_jsonfilepath = "../output/output.json"
  output_csvfilepath = "../output/output.csv"
  os.makedirs(os.path.dirname(output_jsonfilepath), exist_ok=True)
  output_qr_dir = "../output/output_qr"
  os.makedirs(output_qr_dir, exist_ok=True)
  listcsvcontent = Qcsv.readcsv(csvfilepath)
  Qdir.cleandirectory(output_qr_dir)
  
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
    Qqrcode.generateqr(gcode, qrname, output_qr_dir)

  Qjson.writejson(output_jsonfilepath, formatted_data)
  Qcsv.writecsv(output_csvfilepath, formatted_data)
  print(formatted_data)

