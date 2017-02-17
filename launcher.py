#!/usr/bin/env python
from __future__ import print_function

import json
import os
import os.path
import subprocess


path = os.path.join('.', 'src', 'app', 'services')
for direntry in os.listdir(path):
    if not direntry.endswith('.json'):
        continue

    filepath = os.path.join(path, direntry)
    with open(filepath, 'r') as file_handle:
        data = json.load(file_handle)
        for i in range(len(data)):
            print(direntry, i)
            subprocess.call(['casperjs', 'screenshot.js', direntry, str(i)])

