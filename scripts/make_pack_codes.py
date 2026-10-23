#!/usr/bin/env python3
"""Make 兑换码 for the 精选系列 sold on 爱发电.

    python3 scripts/make_pack_codes.py            # 200 codes for each series and the bundle
    python3 scripts/make_pack_codes.py washi 50   # 50 more codes for one series

The codes are written to private/pack-codes-<series>.txt, one per line, ready to paste into the
爱发电 product's 自动发货 list. That folder is ignored by git: the codes are never published. Only a
short SHA-256 of each code goes into assets/pack-codes.json, which the app checks a code against.
Running the script again adds new codes and keeps the old ones working.
"""
import hashlib
import json
import pathlib
import secrets
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "assets" / "pack-codes.json"
PRIVATE = ROOT / "private"
PREFIXES = {"washi": "WASHI", "ribbon": "RIBBON", "ticket": "TICKET", "flora": "FLORA", "all": "ALL"}
# No 0/O or 1/I, so a code read aloud or copied by hand cannot be mistaken.
ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"


def digest(code: str) -> str:
    return hashlib.sha256(f"openpages-pack:{code}".encode()).hexdigest()[:16]


def make(pack: str, count: int, known: set) -> list:
    codes = []
    while len(codes) < count:
        body = "".join(secrets.choice(ALPHABET) for _ in range(8))
        code = f"{PREFIXES[pack]}-{body[:4]}-{body[4:]}"
        if digest(code) in known:
            continue
        known.add(digest(code))
        codes.append(code)
    return codes


def main() -> None:
    args = sys.argv[1:]
    packs = [args[0]] if args and args[0] in PREFIXES else list(PREFIXES)
    count = int(args[-1]) if args and args[-1].isdigit() else 200
    data = json.loads(PUBLIC.read_text()) if PUBLIC.exists() else {"version": 1, "packs": {}}
    PRIVATE.mkdir(exist_ok=True)
    for pack in packs:
        hashes = data["packs"].setdefault(pack, [])
        codes = make(pack, count, set(hashes))
        hashes.extend(digest(code) for code in codes)
        with (PRIVATE / f"pack-codes-{pack}.txt").open("a") as out:
            out.write("\n".join(codes) + "\n")
        print(f"{pack}: +{len(codes)} codes -> private/pack-codes-{pack}.txt ({len(hashes)} in total)")
    PUBLIC.write_text(json.dumps(data, separators=(",", ":")) + "\n")
    print(f"hashes -> {PUBLIC.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
