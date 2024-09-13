import {createImage} from "./Utils";

import playerImage from '../../assets/player.png';
import ebodyImage from '../../assets/ebody.png';
import eheadImage from '../../assets/ehead.png';

import hitAudio from '../../assets/hit.mp3';
import moveAudio from '../../assets/move.mp3';
import shotAudio from '../../assets/shot.mp3';

const _imgs = {};
const _audios = {};

/**
 * Load images.
 * @param {Array.<string>} ids - image IDs
 */
function loadImages(ids) {
  ids.forEach(id => {
    if (!_imgs[id]) {
      switch (id) {
        case 'player':
          _imgs[id] = createImage(playerImage);
          break;
        case 'ebody':
          _imgs[id] = createImage(ebodyImage);
          break;
        case 'ehead':
          _imgs[id] = createImage(eheadImage);
          break;
        default:
          console.error(`Imagen desconocida: ${id}`);
      }
    }
  });
}

/**
 * Draw Asset image.
 * @param {CanvasRenderingContext2D} ctx - canvas' 2D rendering context
 * @param {string} id - image id
 * @param {number} sx - x in source.
 * @param {number} sy - y in source.
 * @param {number} sw - sub-width.
 * @param {number} sh - sub-height.
 * @param {number} x - x in canvas.
 * @param {number} y - y in canvas.
 * @param {number} w - width to draw.
 * @param {number} h - height to draw.
 */
function draw(ctx, id, sx, sy, sw, sh, x, y, w, h) {
  const image = _imgs[id];
  if (image && image.complete && image.naturalWidth !== 0) {
    ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
  } else {
    console.error(`Imagen no cargada o rota: ${id}`);
  }
}

/**
 * Load audios.
 * @param {Array.<string>} ids - audio IDs
 */
function loadAudios(ids) {
  ids.forEach(id => {
    if (!_audios[id]) {
      switch (id) {
        case 'move':
          _audios[id] = new Audio(moveAudio);
          break;
        case 'hit':
          _audios[id] = new Audio(hitAudio);
          break;
        case 'shot':
          _audios[id] = new Audio(shotAudio);
          break;
        default:
          console.error(`Audio desconocido: ${id}`);
      }
    }
  });
}

/**
 * Play audio.
 * @param {string} id - audio id.
 */
function play(id) {
  if (_audios[id] && _audios[id].paused) {
    _audios[id].play();
  } else {
    console.error(`Audio no encontrado o ya en reproducción: ${id}`);
  }
}

export default {
  loadImages,
  draw,
  loadAudios,
  play,
}
