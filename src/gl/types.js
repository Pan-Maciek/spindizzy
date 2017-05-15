const __SIZE__ = Object.freeze({
    vec2: 2,
    vec3: 3,
    vec4: 4,
    mat2: 4,
    mat3: 9,
    mat4: 16,
})

export const typeSize = type => __SIZE__[type]