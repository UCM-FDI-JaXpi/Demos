import Game from './Game';
import Jaxpi from 'jaxpi'
import { SERVER_URL, ACTOR_NAME, ACTOR_MAIL, GAME_TOKEN_POP } from "./Config";

export const jaxpi = new Jaxpi({name: ACTOR_NAME, mail: ACTOR_MAIL}, SERVER_URL, GAME_TOKEN_POP); // Añadir Token, quitar contraseña

Game.init();
Game.start();
