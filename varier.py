"""Reordonne chaque categorie pour que les premieres photos soient les plus
differentes entre elles (parcours du plus eloigne, sur empreinte dHash).

Les pages ne montrent qu'un extrait : 4 exemples par famille, 15 editions
speciales. Prendre les N premieres du dossier donnait plusieurs angles de la
MEME piece — quatre sacs bleu clair d'affilee. On veut un echantillon varie.
Le reste de la categorie suit, dans l'ordre d'origine.
"""
import json, os
from PIL import Image

RACINE = "/home/user/atelier-acidule/public"
idx = json.load(open("catalogue-index.json"))


def empreinte(p):
    im = Image.open(os.path.join(RACINE, p["src"].lstrip("/"))).convert("L")
    im = im.resize((9, 8), Image.LANCZOS)
    px = im.load()
    b = 0
    for y in range(8):
        for x in range(8):
            b = (b << 1) | (1 if px[x, y] > px[x + 1, y] else 0)
    return b


dist = lambda a, b: bin(a ^ b).count("1")

for cat, photos in idx.items():
    if len(photos) < 3:
        continue
    emp = [empreinte(p) for p in photos]
    restants = list(range(len(photos)))
    ordre = [restants.pop(0)]                      # on garde la 1re en tete
    while restants:
        # le candidat dont l'empreinte est la plus eloignee de TOUTES les
        # photos deja retenues
        suivant = max(restants, key=lambda i: min(dist(emp[i], emp[j]) for j in ordre))
        ordre.append(suivant)
        restants.remove(suivant)
    idx[cat] = [photos[i] for i in ordre]

json.dump(idx, open("catalogue-index.json", "w"), ensure_ascii=False, indent=1)
print("categories reordonnees :", len(idx))
