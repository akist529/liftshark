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

export interface MuscleData {
    count: number,
    next: string | null,
    previous: string | null,
    results: Muscle[]
}

export interface Equipment {
    id: number,
    name: string
}

export interface EquipmentData {
    count: number,
    next: string | null,
    previous: string | null,
    results: Equipment[]
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

export interface ImageData {
    count: number,
    next: string | null,
    previous: string | null,
    results: Image[]
}

export interface Set {
    key: number,
    weight: number,
    reps: number
}

export interface Entry {
    key: number,
    name: string,
    sets: Set[]
}

export interface Routine {
    name: string,
    day: string,
    entries: Entry[]
}

export interface RoutineData {
    id: number,
    attributes: Routine
}

export interface Workout {
    date: string,
    entries: Entry[]
}

export interface WorkoutData {
    id: number,
    attributes: Workout
}

export interface Weight {
    date: string,
    measurement: number
}

export interface WeightData {
    id: number,
    attributes: Weight
}

export interface Measurement {
    date: string,
    muscle: string,
    measurement: number
}

export interface MeasurementData {
    id: number,
    attributes: Measurement
}

export interface Record {
    date: string,
    exercise: number,
    max: number
}

export interface RecordData {
    id: number,
    attributes: Record
}

export interface ExerciseData {
    count: number,
    next: string,
    previous: string,
    results: Exercise[]
}

export interface Favorite {
    // eslint-disable-next-line camelcase
    exercise_base: number
}

export interface FavoriteData {
    id: number,
    attributes: Favorite
}

export interface APIData {
    count: number,
    next: string | null,
    previous: string | null,
    results: Muscle[] | Equipment[] | Image[]
}
