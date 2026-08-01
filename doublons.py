"""Detecte les doublons visuels du catalogue par empreinte perceptuelle (dHash).

Le dHash compare la luminance de pixels voisins : deux photos prises en rafale,
ou la meme image reenregistree, donnent des empreintes tres proches meme si les
fichiers different octet pour octet. On compare par distance de Hamming.
"""
import json, os
from PIL import Image

RACINE = "/home/user/atelier-acidule/public"
SEUIL = 6          # bits de difference tolerees sur 64 : au-dela, photos distinctes

idx = json.load(open("catalogue-index.json"))


def empreinte(chemin: str) -> int:
    im = Image.open(chemin).convert("L").resize((9, 8), Image.LANCZOS)
    px = im.load()
    bits = 0
    for y in range(8):
        for x in range(8):
            bits = (bits << 1) | (1 if px[x, y] > px[x + 1, y] else 0)
    return bits


rapport = {}
for cat, photos in idx.items():
    vus: list[tuple[int, str]] = []
    gardes, doublons = [], []
    for p in photos:
        h = empreinte(os.path.join(RACINE, p["src"].lstrip("/")))
        jumeau = next((n for e, n in vus if bin(e ^ h).count("1") <= SEUIL), None)
        if jumeau:
            doublons.append((p["src"].split("/")[-1], jumeau.split("/")[-1]))
        else:
            vus.append((h, p["src"]))
            gardes.append(p)
    rapport[cat] = {"gardes": gardes, "doublons": doublons}

total_d = sum(len(r["doublons"]) for r in rapport.values())
print(f"{total_d} doublons detectes sur {sum(len(p) for p in idx.values())} photos\n")
for cat, r in rapport.items():
    if r["doublons"]:
        print(f"{cat}: {len(idx[cat])} -> {len(r['gardes'])} ({len(r['doublons'])} retires)")
        for d, orig in r["doublons"]:
            print(f"    {d}  ==  {orig}")

json.dump({c: r["gardes"] for c, r in rapport.items()},
          open("catalogue-index-dedup.json", "w"), ensure_ascii=False, indent=1)
