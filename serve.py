#!/usr/bin/env python3
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
class Handler(SimpleHTTPRequestHandler):
    extensions_map={**SimpleHTTPRequestHandler.extensions_map,'.wasm':'application/wasm'}
    def end_headers(self): self.send_header('Cache-Control','no-store'); super().end_headers()
parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=8011);args=parser.parse_args()
ThreadingHTTPServer(('127.0.0.1',args.port),partial(Handler,directory=str(Path(__file__).parent))).serve_forever()
