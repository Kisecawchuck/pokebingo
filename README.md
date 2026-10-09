# pokebingo

PokéBingo para o An(IME)^2

## Dependências

```bash
pipenv install pygame pillow pypdf2
```

## Uso

```bash
# execute download.js antes de pokebingo.py para ter os sprites
node download.js

# gerar cartelas
pipenv run python cartelas.py
pipenv run python convert.py
pipenv run python combine.py

# sorteio
pipenv run python pokebingo.py
```
