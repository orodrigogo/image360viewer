import { cubicBezierYForX } from './Math';
import normalizeSVG from 'normalize-svg-path';
import absSVG from 'abs-svg-path';
import parseSVG from 'parse-svg-path';

export function getYForX(path, x) {
  const precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  const c = selectCurve(path, x);

  if (c === null) {
    return null;
  }

  return cubicBezierYForX(x, c.from, c.curve.c1, c.curve.c2, c.curve.to, precision);
};

export function selectCurve(path, x) {
  const result = {
    from: path.move,
    curve: null
  };

  for (var i = 0; i < path.curves.length; i++) {
    var c = path.curves[i];
    var contains = result.from.x > c.to.x ? x >= c.to.x && x <= result.from.x : x >= result.from.x && x <= c.to.x;

    if (contains) {
      result.curve = c;
      break;
    }

    result.from = c.to;
  }

  if (!curveIsFound(result)) {
    return null;
  }

  return result;
};

export function parse(d) {
  var segments = normalizeSVG(absSVG(parseSVG(d)));
  var path = createPath({ x: segments[0][1], y: segments[0][2] });

  segments.forEach(function (segment) {
    if (segment[0] === "Z") {
      close(path);
    } else if (segment[0] === "C") {
      addCurve(path, {
        c1: { x: segment[1], y: segment[2] }, c2: {
          x: segment[3], y: segment[4]
        }, to: { x: segment[5], y: segment[6] }
      });
    }
  });

  return path;
}

export function createPath(move) {
  return {
    move: move,
    curves: [],
    close: false
  };
}

export var addCurve = function addCurve(path, c) {
  path.curves.push({
    c1: c.c1,
    c2: c.c2,
    to: c.to
  });
};

var curveIsFound = function curveIsFound(c) {
  return c.curve !== null;
}
