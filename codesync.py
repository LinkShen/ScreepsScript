
import os
import requests
import json

url = 'https://screeps.com/api/user/code'
headers = {'X-Token':'f655c370-9cbb-4fb4-aab4-ab264744fb11'}
branch = 'default'

def scanModules():
    modules = {}
    prefix = []
    for curdir, dirs, files in os.walk('src'):
        prefix.append(curdir)
        for fname in files:
            fname = os.path.join(curdir, fname)
            name = fname.replace("/", ".").split(".")
            if name[-1] != "js":
                continue
            f = open(fname)
            data = f.read()
            f.close()
            modules[".".join(name[1:-1])] = data
    return modules

def upload():
    data = {'branch':branch}
    data['modules'] = scanModules()
    r = requests.post(url=url, headers=headers, json=data)
    print(r.text)

def download():
    r = requests.get(url=url, headers=headers)
    print(r.text)

download()
