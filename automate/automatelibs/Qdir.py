#!/usr/bin/env python3

import os
import glob
import sys
import re

def cleanDirectory(dir_path):
  """Remove all content in a specific directory
  
  Args:
      dir_path (str): 
  """
  if os.path.exists(dir_path):
    c_dirpath = "{}/*".format(dir_path)
    files = glob.glob(c_dirpath)
    for f in files:
      os.remove(f)
    return True
  else:
    print("Directory does not exists", file=sys.stderr)
    return False

def findFileInDir(flpath, fltofind=r'.*\.json'):
  output = []
  for root, dirs, files in os.walk(flpath):
    path = root.split(os.sep)
    for flname in files:
      flfullpath = "{}/{}".format(("/".join(path)), flname)
      if fltofind != "":
        found = re.findall(fltofind, flfullpath)
        if len(found) > 0:
          output.extend(found)
      else:
        found = flfullpath
        output.append(found)
  return output