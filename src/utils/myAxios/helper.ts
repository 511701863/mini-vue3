export const deepClone = (obj:any) => {
  if(typeof obj !== 'object') {return obj;}

  const buf = new obj.constructor;
  for(const k in obj) {
    if(obj.hasOwnProperty(k)){
      buf[k] = typeof obj[k] === 'object' ? deepClone(obj[k]) :obj[k];
    }
  }
  return buf;
};

export const deepMerge = ( target:any = {}, source:any = {} ) => {
	target = deepClone( target );
	if ( typeof target !== 'object' || typeof source !== 'object' ) {return false;}
	for ( const prop in source ) {
		if ( !source.hasOwnProperty( prop ) ) {continue;}
		if ( prop in target ) {
			if ( typeof target[prop] !== 'object' ) {
				target[prop] = source[prop];
			} else {
				if ( typeof source[prop] !== 'object' ) {
					target[prop] = source[prop];
				} else {
					if ( target[prop].concat && source[prop].concat ) {
						target[prop] = target[prop].concat( source[prop] );
					} else {
						target[prop] = deepMerge( target[prop], source[prop] );
					}
				}
			}
		} else {
			target[prop] = source[prop];
		}
	}
	return target;
};

export const urlRegExp = (value:any) => {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test( value );
};

