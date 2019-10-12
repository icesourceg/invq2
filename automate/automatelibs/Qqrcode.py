#!/usr/bin/env python3

import qrcode

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