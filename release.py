#!/usr/bin/env python3
"""Stamp release.json before committing a GitHub Pages deployment."""
from datetime import datetime, timezone
from pathlib import Path
import json

Path(__file__).with_name('release.json').write_text(json.dumps({
    'build': datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
}) + '\n')
