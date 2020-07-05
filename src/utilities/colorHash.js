export function djb2(str, hash){
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
    }
    return hash;
  }
  
export function hashStringToColor(str, hash) {
    var hash2 = djb2(str, hash);
    var r = (hash2 & 0xFF0000) >> 16;
    var g = (hash2 & 0x00FF00) >> 8;
    var b = hash2 & 0x0000FF;
    return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
}