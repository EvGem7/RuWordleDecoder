export function decode(input: string): string {
  const wordId = getWordId(input);
  if (!wordId) {
    return 'Cannot get word_id';
  }
  const significantPart = getSignificantPart(wordId);
  if (!significantPart) {
    return 'Cannot get significant part';
  }
  const caesarEncoded = unmap(significantPart);
  if (!caesarEncoded) {
    return 'Cannot unmap';
  }
  const result = uncaesar(caesarEncoded);
  if (!result) {
    return 'Cannot uncaesar';
  }
  return result;
}

function unmap(significantPart: string): string {
  const arr = significantPart.split('').map((it) => dict[it]);
  if (arr.some((it) => !it)) {
    return '';
  }
  return arr.join('');
}

function getWordId(input: string): string | null {
  if (input.length === WORD_ID_LENGTH) {
    return input.toLowerCase();
  }
  try {
    const urlIndex = input.indexOf("https://");
    const url = input.substring(urlIndex);
    const parsed = new URL(url);
    const wordId = parsed.searchParams.get('word_id');
    if (!wordId) {
      return null;
    }
    if (wordId.length === WORD_ID_LENGTH) {
      return wordId.toLowerCase();
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

function getSignificantPart(wordId: string): string {
  return wordId.substring(3, 8);
}

function uncaesar(input: string): string {
  const arr = input.split('').map((it) => {
    const index = it.charCodeAt(0) - CAESAR_ALPHABET.charCodeAt(0);
    if (index < 0 || index >= CAESAR_ALPHABET.length) {
      return undefined;
    }
    let uncaesaredIndex = index - CAESAR_SHIFT;
    while (uncaesaredIndex < 0) {
      uncaesaredIndex += CAESAR_ALPHABET.length;
    }
    return CAESAR_ALPHABET[uncaesaredIndex];
  });
  if (arr.some((it) => !it)) {
    return '';
  }
  return arr.join('');
}

const dict: Record<string, string> = {
  f: 'а',
  '1': 'б',
  d: 'в',
  u: 'г',
  l: 'д',
  t: 'е',
  '`': 'ё',
  '2': 'ж',
  p: 'з',
  b: 'и',
  q: 'й',
  r: 'к',
  k: 'л',
  v: 'м',
  y: 'н',
  j: 'о',
  g: 'п',
  h: 'р',
  c: 'с',
  n: 'т',
  e: 'у',
  a: 'ф',
  '3': 'х',
  w: 'ц',
  x: 'ч',
  i: 'ш',
  o: 'щ',
  '4': 'ъ',
  s: 'ы',
  m: 'ь',
  '5': 'э',
  '6': 'ю',
  z: 'я',
};

const CAESAR_SHIFT = 5;
const CAESAR_ALPHABET = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';

const WORD_ID_LENGTH = 11;
