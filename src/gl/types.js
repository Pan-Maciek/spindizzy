const __SIZE__ = { // Works like a lookup hashtable.
    vec2: 2,
    vec3: 3,
    vec4: 4,
    mat2: 4,
    mat3: 9,
    mat4: 16
}

/** Returns a size of type.
 * 
 * @param {String} type
 * @returns {Number}
 *
 */
export const typeSize = type => __SIZE__[type]