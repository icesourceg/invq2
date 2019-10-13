#!/usr/bin/env python3

"""
Script to generate combine qrcode with template and text, seperate based on note column
"""

from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import csv
import os
import sys

libsdir = '../automatelibs'
sys.path.append(libsdir)

import Qcsv

bgimg = "../data/template-crop.jpg"
csvfilepath = "../output/output.csv"
font = ImageFont.truetype("FreeSans.ttf", 32)
listcsvcontent = Qcsv.readcsv(csvfilepath)

for csvcontent in listcsvcontent:
  # background
  background = Image.open(bgimg)
  bgWidth, bgHeight = background.size
  draw = ImageDraw.Draw(background)

  # output_dir
  note = csvcontent.get('note') 

  # id
  id = csvcontent.get('regnumber')
  w, h = font.getsize(id)
  textposX = int((bgWidth-w)/2)
  textposY = 1000
  #draw.text((textposX, textposY),msg,(223,128,103),font=font)
  draw.text((textposX, textposY),id,(0,0,0),font=font)

  # qrimage
  qrimg = "../output/output_qr/{}.jpeg".format(csvcontent.get('regnumber'))
  qrImage = Image.open(qrimg)
  qrWidth, qrHeigth = qrImage.size
  qrposX = int((bgWidth-qrWidth) / 2)
  qrposY = 1060
  background.paste(qrImage, (qrposX, qrposY))

  # name
  name = csvcontent.get('name')
  w, h = font.getsize(name)
  textposX = int((bgWidth-w)/2)
  textposY = 1330
  #draw.text((textposX, textposY),msg,(223,128,103),font=font)
  draw.text((textposX, textposY),name,(0,0,0),font=font)
  
  # num invited
  num_invited = csvcontent.get('num_invited')
  w, h = font.getsize(num_invited)
  textposX = 825
  textposY = 1670
  #draw.text((textposX, textposY),msg,(223,128,103),font=font)
  draw.text((textposX, textposY),num_invited,(0,0,0),font=font)
  
  # save output
  output_path = "../output/combine/{}/inv_{}.jpeg".format(note, csvcontent.get('regnumber'))
  os.makedirs(os.path.dirname(output_path), exist_ok=True)
  print(output_path)
  background.save(output_path)
