
import os
import requests
import json

url = 'https://screeps.com/api/user/code'
headers = {'X-Token':'f655c370-9cbb-4fb4-aab4-ab264744fb11'}
branch = 'default'

def scanModules(dir):
    modules = {}
    prefix = []
    for curdir, _, files in os.walk(dir):
        prefix.append(curdir)
        for fname in files:
            fname = os.path.join(curdir, fname)
            name = fname.replace("/", ".").split(".")
            if name[-1] != "js":
                continue
            f = open(fname)
            data = f.read()
            f.close()
            modules[".".join(name[2:-1])] = data
    return modules

def scanBranches():
    datas = []
    for dir in os.listdir('src'):
        data = {'branch': dir, 'modules': scanModules('src/'+dir)}
        datas.append(data)
    return datas

def upload():
    datas = scanBranches()
    for data in datas:
        r = requests.post(url=url, headers=headers, json=data)
        print(r.text)

def download():
    r = requests.get(url=url, headers=headers)
    print(json.loads(r.text))

download()
# upload()
