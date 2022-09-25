from http import server
from flask import Flask

appGeneradorMsg= Flask(__name__)

@appGeneradorMsg.route('/')
def iniciar():
    return 'Bienvenido'

if __name__==('__main__'):
    appGeneradorMsg.run(debug=True)