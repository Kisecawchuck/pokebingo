# Programa para o PokéBingo
# trate variáveis em CAIXA_ALTA como constantes

import sys
import os
import time
import getopt
import pygame
from pygame.locals import *
from math import ceil, floor
from glob import glob
from random import randrange, shuffle

WIDTH = 1280
HEIGHT = 720
WHITE = (255, 255, 255)
SMALL_IMAGE_SIZE = (64, 64)
IMAGE_SIZE = (128, 128)
BIG_IMAGE_SIZE = (256, 256)

X0 = 580
Y0 = 120
Y_OFFSET = 10
X_STEP = SMALL_IMAGE_SIZE[0]
Y_STEP = SMALL_IMAGE_SIZE[1]

ROWS = 5
COLS = 5

pygame.init()
SCREEN = pygame.display.set_mode([WIDTH, HEIGHT])
SCREEN.fill(WHITE)
pygame.display.flip()

def sorteio(pokemon, bigpokemon, cnt):
    # limpamos o sorteio anterior
    SCREEN.fill(WHITE, [X0 + 3 * SMALL_IMAGE_SIZE[0] / 2, 0, IMAGE_SIZE[0], IMAGE_SIZE[1]])
    SCREEN.fill(WHITE, [X0 / 2, 1.5 * Y0, BIG_IMAGE_SIZE[0], BIG_IMAGE_SIZE[1]])

    # sorteamos um pokemon para cada imagem
    idx = randrange(len(pokemon))
    pkmn_sorteado = pokemon[idx]
    bigpkmn_sorteado = bigpokemon[idx]

    # desenhamos o ícone acima
    prox = pygame.transform.scale(pkmn_sorteado, IMAGE_SIZE)
    SCREEN.blit(prox, [X0 + 3 * SMALL_IMAGE_SIZE[0] / 2, 0])
    # desenhamos o ícone grande a esquerda
    prox_big = pygame.transform.scale(bigpkmn_sorteado, BIG_IMAGE_SIZE)
    SCREEN.blit(prox_big, [X0 / 2, 1.5 * Y0])
    # desenhamos casela
    pos_x = (cnt % COLS) * X_STEP + X0 # posição x para desenhar casela
    pos_y = (cnt // COLS) * Y_STEP + (Y0 + Y_OFFSET) # posição y para desenhar casela
    prox_casela = pygame.transform.scale(pkmn_sorteado, SMALL_IMAGE_SIZE)
    SCREEN.blit(prox_casela, [pos_x, pos_y])

    # não queremos sortear o mesmo pokemon duas vezes
    pokemon.remove(pkmn_sorteado)
    bigpokemon.remove(bigpkmn_sorteado)

    pygame.display.flip()


def main():
    # Flags de linha de comando
    try: 
        opts, args = getopt.getopt(sys.argv[1:], "ip:", ["interactive", "path="])
    except getopt.GetoptError as err:
        print(err)
        sys.exit(1)

    interactive = False
    img_dir = None
    for opt, arg in opts:
        if opt in ("-i", "--interactive"):
            interactive = True
        if opt in ("-p", "--path"):
            img_dir = arg

    if not img_dir:
        img_dir = input("Diretório das imagens: ")
    pokemon = glob(f"{img_dir}/*.png")

    # carrega os pokemon no pygame
    N = len(pokemon)
    for i in range(N):
        pokemon[i] = pygame.image.load(pokemon[i])

    shuffle(pokemon)
    bigpokemon = pokemon[ceil(N / 2) : N]
    print(len(bigpokemon))

    pokemon = pokemon[0: floor(N / 2)]
    print(len(pokemon))

    cnt = 0
    while pokemon and bigpokemon and cnt < ROWS*COLS:
        if interactive:
            for event in pygame.event.get():
                if event.type == KEYDOWN:
                    if event.key == K_q:
                        pygame.display.quit()
                        pygame.quit()
                        sys.exit()
                    if event.key == K_UP:
                        sorteio(pokemon, bigpokemon, cnt)
                        cnt += 1
        else:
            sorteio(pokemon, bigpokemon, cnt)
            cnt += 1

    os.makedirs("./cartelas", exist_ok = True)

    filename = f"cartela-{int(time.time())}.png"
    pygame.image.save(SCREEN, f"./cartelas/{filename}")
    print(f"Imagem salva em cartelas/{filename}")
    print("Acabaram os pokemon")

if __name__ == "__main__":
    main()
