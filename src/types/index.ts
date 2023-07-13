export interface Exercise {
    id: number
    uuid: string
    name: string
    // eslint-disable-next-line camelcase
    exercise_base: number
    description: string
    // eslint-disable-next-line camelcase
    creation_date: string
    category: number
    muscles: number[]
    // eslint-disable-next-line camelcase
    muscles_secondary: number[]
    equipment: number[]
    langage: number
    license: number
    // eslint-disable-next-line camelcase
    license_author: string
    variations: number[]
    // eslint-disable-next-line camelcase
    author_history: string[]
}

export interface Muscle {
    id: number
    name: string
    // eslint-disable-next-line camelcase
    name_en: string
    // eslint-disable-next-line camelcase
    is_front: boolean
    // eslint-disable-next-line camelcase
    image_url_main: string
    // eslint-disable-next-line camelcase
    image_url_secondary: string
  }

export interface Equipment {
    id: number,
    name: string
}

export interface Category {
    id: number,
    name: string
}

export interface Image {
    id: number,
    uuid: string,
    // eslint-disable-next-line camelcase
    exercise_base: number,
    image: string,
    // eslint-disable-next-line camelcase
    is_main: boolean,
    style: string,
    license: number,
    // eslint-disable-next-line camelcase
    license_author: string,
    // eslint-disable-next-line camelcase
    author_history: string[]
}

export interface Set {
    id: number,
    weight: number,
    reps: number
}

export interface Entry {
    id: number,
    name: string,
    sets: Set[]
}

export interface Routine {
    id: number,
    attributes: {
        name: string,
        day: string,
        exercises?: Entry[]
    }
}

export interface Workout {
    id: number,
    attributes: {
        date: string,
        routine: number
    }
}

export interface Stat {
    id: number,
    attributes: {
        date: string,
        type: string,
        stat: number
    }
}
