from http import server
from flask import Flask, render_template

appGeneradorMsg= Flask(__name__)

@appGeneradorMsg.route('/layout')
def iniciar():
    return render_template('layout.html')

if __name__==('__main__'):
    appGeneradorMsg.run(debug=True)