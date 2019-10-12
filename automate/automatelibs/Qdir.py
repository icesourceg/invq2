#!/usr/bin/env python3

import os
import glob

def cleandirectory(dir_path):
  c_dirpath = "{}/*".format(dir_path)
  files = glob.glob(c_dirpath)
  for f in files:
    os.remove(f)