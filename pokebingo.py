# Programa para o PokéBingo
# trate variáveis em CAIXA_ALTA como constantes

import sys
import os
import time
import pygame
from pygame.locals import *
from math import ceil, floor
from glob import glob
from random import randrange, shuffle

WIDTH = 1280
HEIGHT = 720
WHITE = (255, 255, 255)
BG_COLOR = (242.4, 241.5, 239.4)
SMALL_IMAGE_SIZE = (64, 64)
IMAGE_SIZE = (128, 128)
BIG_IMAGE_SIZE = (256, 256)

X0 = 590
Y0 = 20
Y_OFFSET = IMAGE_SIZE[1]
X_STEP = SMALL_IMAGE_SIZE[0]
Y_STEP = SMALL_IMAGE_SIZE[1]

ROWS = 5
COLS = 10

pygame.init()
SCREEN = pygame.display.set_mode([WIDTH, HEIGHT])
SCREEN.fill(WHITE)
pygame.display.flip()

def sorteio(pokemon, bigpokemon, cnt):
    # limpamos o sorteio anterior
    SCREEN.fill(BG_COLOR, [X0 + 4 * SMALL_IMAGE_SIZE[0], Y0, IMAGE_SIZE[0], IMAGE_SIZE[1]])
    SCREEN.fill(BG_COLOR, [281.6 - BIG_IMAGE_SIZE[0] / 2, 357.6 - BIG_IMAGE_SIZE[1] / 2, BIG_IMAGE_SIZE[0], BIG_IMAGE_SIZE[1]])

    # sorteamos um pokemon para cada imagem
    idx = randrange(len(pokemon))
    pkmn_sorteado = pokemon[idx]
    bigpkmn_sorteado = bigpokemon[idx]

    # desenhamos o ícone acima
    prox = pygame.transform.scale(pkmn_sorteado, IMAGE_SIZE)
    SCREEN.blit(prox, [X0 + 4 * SMALL_IMAGE_SIZE[0], Y0])
    # desenhamos o ícone grande a esquerda
    prox_big = pygame.transform.scale(bigpkmn_sorteado, BIG_IMAGE_SIZE)
    SCREEN.blit(prox_big, [281.6 - BIG_IMAGE_SIZE[0] / 2, 357.6 - BIG_IMAGE_SIZE[1] / 2])
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
    pokemon = glob("sprites/shuffle/*.png")
    bigpokemon = glob("sprites/icons/*.png")
    pokemon.sort()
    bigpokemon.sort()

    quadro = pygame.transform.scale(pygame.image.load("quadro.jpeg"), [WIDTH, HEIGHT])
    SCREEN.blit(quadro, [0, 0])

    # carrega os pokemon no pygame
    N = len(pokemon)
    print(len(bigpokemon))
    print(len(pokemon))
    for i in range(N):
        pokemon[i] = pygame.image.load(pokemon[i])
        bigpokemon[i] = pygame.image.load(bigpokemon[i])


    cnt = 0
    while pokemon and bigpokemon:
        for event in pygame.event.get():
            if event.type == KEYDOWN:
                if event.key == K_q:
                    pygame.display.quit()
                    pygame.quit()
                    sys.exit()
                if event.key == K_UP:
                    sorteio(pokemon, bigpokemon, cnt)
                    cnt += 1
    while True:
        for event in pygame.event.get():
            if event.type == KEYDOWN:
                if event.key == K_q:
                    pygame.display.quit()
                    pygame.quit()
                    sys.exit()


if __name__ == "__main__":
    main()
