"""Move SectionLabel from above H2 to below H2 in home sections."""

from __future__ import annotations

import re
from pathlib import Path

HOME = Path(__file__).resolve().parents[1] / "src" / "components" / "home"

PAT = re.compile(
    r"(?P<indent>[ \t]*)<SectionLabel(?P<attrs>[^>]*)/>\s*\n"
    r"(?P=indent)<(?P<tag>h2)(?P<h2attrs>[^>]*)>(?P<body>.*?)</h2>",
    re.S,
)


def main() -> None:
    changed = 0
    for path in sorted(HOME.glob("HomeSec*.js")):
        if path.name == "HomeSec1.js":
            continue
        text = path.read_text(encoding="utf-8")

        def repl(m: re.Match[str]) -> str:
            indent = m.group("indent")
            attrs = re.sub(r"\s*number=\{[^}]+\}", "", m.group("attrs"))
            h2 = f"{indent}<h2{m.group('h2attrs')}>{m.group('body')}</h2>"
            label = f"{indent}<SectionLabel{attrs}/>"
            return f"{h2}\n{label}"

        new, n = PAT.subn(repl, text)
        if n:
            path.write_text(new, encoding="utf-8")
            changed += n
            print(f"{path.name}: {n}")
        else:
            print(f"{path.name}: no match")
    print(f"total swaps {changed}")


if __name__ == "__main__":
    main()
