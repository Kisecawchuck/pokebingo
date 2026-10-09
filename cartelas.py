from glob import glob
import os
import pygame
from pygame.locals import *
from random import randrange
import re
import sys

B = 0
I = 1
N = 2
G = 3
O = 4
pygame.init()

def add_card(screen):
    ficha = pygame.transform.rotate(pygame.transform.smoothscale(pygame.image.load("template_cartela.png"), [540, 697]), 90)
    screen.blit(ficha, [35, 100])
    screen.blit(ficha, [610, 100])

def add_ditto(screen):
    ditto = pygame.transform.rotate(pygame.transform.smoothscale(pygame.image.load("N/00CoringaDitto.png"), [72,72]), 90)
    screen.blit(ditto, [347, 334])
    screen.blit(ditto, [921, 334])

def generate_cards(screen, n, all_cards):
    screen.fill([255,255,255])
    add_card(screen)
    add_ditto(screen)
    
    xs = [203, 777]
    pokemon = [[],[],[],[],[]]
    pokemon_in_cards = [[], []]
    for x_index in range(2):
        card_pokemon = []
        pokemon[B] = glob(r'B/*.png')
        pokemon[I] = glob(r'I/*.png')
        pokemon[N] = glob(r'N/*.png')
        pokemon[G] = glob(r'G/*.png')
        pokemon[O] = glob(r'O/*.png')
        pokemon[N].remove("N/00CoringaDitto.png")
        y = 478
        for i in range(5):
            x = xs[x_index]
            for j in range(5):
                if i != 2 or j != 2:
                    prox = pokemon[i].pop(randrange(0, len(pokemon[i])))
                    card_pokemon.append(re.sub(".png", "", re.sub("[BINGO]\\\\[0-9]+", "", prox)))
                    img = pygame.transform.rotate(pygame.transform.smoothscale(pygame.image.load(prox), [64, 64]), 90)
                    screen.blit(img, [x,y])
                    
                x += 73    
            y -= 70
        pokemon_in_cards[x_index] = card_pokemon
        all_cards.append(card_pokemon)
    pygame.display.flip()
    nome = f"cartela{n}.png"
    cartelas_dir = "cartelas"
    pygame.image.save(screen, os.path.join(cartelas_dir, nome))
    

def init_loop():
    import time
    screen = pygame.display.set_mode([1280,720])
    cartela = 0
    all_cards = []
##    while True:
##        for event in pygame.event.get():
##            if event.type == KEYDOWN:
##                if event.key==K_UP:
##                    generate_cards(screen, cartela, all_cards)
##                    cartela += 1
##                if event.key==K_ESCAPE:
##                    pygame.quit()
##                    return all_cards
    quantidade_cartelas = 0
    while quantidade_cartelas < 200:
        generate_cards(screen, cartela, all_cards)
        cartela += 1
        time.sleep(1)
        quantidade_cartelas+=1
    return all_cards
    
        

def write_all_cards(cards):
    with open("all_cards.txt", "w") as f:
        for card_list in cards:
            f.write("".join(card_list) + "\n")
        
                
all_cards = init_loop()
write_all_cards(all_cards)

