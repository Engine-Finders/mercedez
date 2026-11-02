"""Map home Sec2–4 images to public/cars assets (nearest model when missing)."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CARS = ROOT / "public" / "cars"
FILES = sorted(p.name for p in CARS.glob("*.webp"))


def pick(*needles: str, prefer_gens: list[str] | None = None) -> str | None:
    prefer_gens = prefer_gens or []
    cands = [f for f in FILES if all(n.lower() in f.lower() for n in needles)]
    if not cands:
        return None

    def score(f: str) -> tuple:
        fl = f.lower()
        g = 99
        for i, gen in enumerate(prefer_gens):
            if gen.lower() in fl:
                g = i
                break
        dup = 5 if "(" in f else 0
        special = (
            1
            if ("amg" in fl and "amg line" not in fl and "std amg" not in fl)
            else 0
        )
        return (g, special, dup, len(f))

    return sorted(cands, key=score)[0]


def path(name: str | None) -> str:
    return f"/cars/{name}" if name else "/cars/models/c-class.webp"


def main() -> None:
    sec2_map = {
        "A-Class": pick("a-class", prefer_gens=["w177", "w176", "w169", "w168"]),
        "B-Class": pick("b-class", prefer_gens=["w247", "w246", "w245"]),
        "CLA": pick("cla", prefer_gens=["c118", "c117"]),
        "C-Class": pick("c-class", "w206"),
        "CLK": pick("clk", prefer_gens=["c209", "c208"]),
        "CLC-Class": pick("clc"),
        "CLS": pick("cls", prefer_gens=["c257", "c218", "c219"]),
        # Nearest available when model folder has no match
        "E-Class": pick("cls", prefer_gens=["c257", "c218"]) or pick("c-class", "w206"),
        "S-Class": pick("cls", prefer_gens=["c257", "c218"]) or pick("c-class", "w206"),
        "G-Class": pick("b-class", prefer_gens=["w247", "w246"]),
        "GLA": pick("b-class", prefer_gens=["w247", "w246"]),
        "GLC": pick("c-class", prefer_gens=["w206", "w205"]),
        "GLE": pick("b-class", prefer_gens=["w247", "w246"]),
        "GLK": pick("b-class", prefer_gens=["w246", "w245"]),
        "GLS": pick("b-class", prefer_gens=["w247", "w246"]),
        "M-Class (ML)": pick("b-class", prefer_gens=["w247", "w246"]),
        "R-Class": pick("b-class", prefer_gens=["w247", "w246"]),
        "SL": pick("amg gt", prefer_gens=["c190", "r232"]) or pick("clk"),
        "SLC / SLK": pick("clk", prefer_gens=["c209", "a209", "c208"]),
        "SLS AMG": pick("amg gt", prefer_gens=["c190", "r232"]),
        "AMG GT": pick("amg gt", prefer_gens=["c190", "r232"]),
        "Sprinter": pick("citan", prefer_gens=["w420", "w415"]),
        "Vito": pick("citan", prefer_gens=["w420", "w415"]),
        "V-Class": pick("citan", "tourer") or pick("citan"),
        "Viano": pick("citan", prefer_gens=["w415", "w420"]),
        "Citan": pick("citan", prefer_gens=["w420", "w415"]),
        "Vaneo": pick("a-class", prefer_gens=["w169", "w168"]) or pick("b-class"),
        "Vario": pick("citan", prefer_gens=["w415", "w420"]),
    }

    sec2_path = ROOT / "src" / "data" / "home" / "homeSec2.json"
    sec2 = json.loads(sec2_path.read_text(encoding="utf-8"))
    for m in sec2["models"]:
        name = m["model"]
        img = sec2_map.get(name) or pick("c-class", "w206")
        m["image"] = {
            "src": path(img),
            "alt": m.get("image", {}).get("alt") or f"Mercedes {name}",
        }
        print(f"Sec2 {name:16s} -> {img}")
    sec2_path.write_text(
        json.dumps(sec2, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    sec3_path = ROOT / "src" / "data" / "home" / "homeSec3.json"
    sec3 = json.loads(sec3_path.read_text(encoding="utf-8"))
    sec3_img = pick("c-class", "w205") or pick("c-class", "w206")
    sec3["headerImage"] = {
        "src": path(sec3_img),
        "alt": "Mercedes-Benz for diagnostic calculator",
    }
    print("Sec3 header ->", sec3_img)
    sec3_path.write_text(
        json.dumps(sec3, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    sec4_path = ROOT / "src" / "data" / "home" / "homeSec4.json"
    sec4 = json.loads(sec4_path.read_text(encoding="utf-8"))
    default4 = pick("c-class", "w206")
    sec4["cardImage"] = {"src": path(default4), "alt": "Mercedes-Benz"}

    ranking_imgs = {
        1: pick("c-class", "w206"),
        2: pick("c-class", "w206"),
        3: pick("c-class", "w205"),
        4: pick("amg gt", prefer_gens=["c190", "r232"]),
        5: pick("c-class", prefer_gens=["w206", "w205"]),
        6: pick("c-class", "w203"),
        7: pick("b-class", prefer_gens=["w247", "w246"]),
        8: pick("cls", prefer_gens=["c219", "c218", "c257"]),
    }
    for row in sec4["rankings"]:
        img = ranking_imgs.get(row["rank"]) or default4
        row["image"] = {
            "src": path(img),
            "alt": row.get("winner") or "Mercedes-Benz",
        }
        print(f"Sec4 #{row['rank']} -> {img}")

    sec4_path.write_text(
        json.dumps(sec4, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print("done")


if __name__ == "__main__":
    main()
