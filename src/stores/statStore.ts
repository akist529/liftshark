// Vue imports
import { ref } from 'vue';
// Pinia imports
import { defineStore } from 'pinia';
// Type interfaces
import { WeightData, MeasurementData, RecordData } from '@/types/index';
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
// Third-party libraries
import Cookies from 'js-cookie';

const token: string = Cookies.get('token');

export const useStatStore = defineStore('statStore', {
    state: () => ({
        weights: [] as WeightData[],
        measurements: [] as MeasurementData[],
        records: [] as RecordData[],
        loading: false,
        date: ref(new Date()),
        dateVal: new Date().getDate(),
        dateString: new Date().toLocaleDateString('en-CA').split('T')[0],
        datepicker: ref<DatePickerInstance>(null),
        tab: ''
    }),
    actions: {
        async addWeight (weight: number) {
            if (token) {
                await fetch('https://strapi-hj5r.onrender.com/api/weights', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: {
                            date: this.date.toLocaleDateString('en-CA').split('T')[0],
                            measurement: weight
                        }
                    })
                })
            } else {
                const weights: WeightData[] = JSON.parse(localStorage.getItem('weights') || '[]');

                weights.push({
                    id: weights.length,
                    attributes: {
                        date: this.date.toLocaleDateString('en-CA').split('T')[0],
                        measurement: weight
                    }
                });

                localStorage.setItem('weights', JSON.stringify(weights));
            }

            this.getStats();
        },
        async addMeasurement (muscle: string, measurement: number) {
            if (token) {
                await fetch('https://strapi-hj5r.onrender.com/api/measurements', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: {
                            date: this.date.toLocaleDateString('en-CA').split('T')[0],
                            muscle,
                            measurement
                        }
                    })
                })
            } else {
                const measurements: MeasurementData[] = JSON.parse(localStorage.getItem('measurements') || '[]');

                measurements.push({
                    id: measurements.length,
                    attributes: {
                        date: this.date.toLocaleDateString('en-CA').split('T')[0],
                        muscle,
                        measurement
                    }
                });

                localStorage.setItem('measurements', JSON.stringify(measurements));
            }

            this.getStats();
        },
        async addRecord (exercise: number, max: number) {
            if (token) {
                await fetch('https://strapi-hj5r.onrender.com/api/records', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: {
                            date: this.date.toLocaleDateString('en-CA').split('T')[0],
                            exercise,
                            max
                        }
                    })
                })
            } else {
                const records: RecordData[] = JSON.parse(localStorage.getItem('records') || '[]');

                records.push({
                    id: records.length,
                    attributes: {
                        date: this.date.toLocaleDateString('en-CA').split('T')[0],
                        exercise,
                        max
                    }
                });

                localStorage.setItem('records', JSON.stringify(records));
            }

            this.getStats();
        },
        async deleteWeight (idToDelete: number) {
            const weights = this.weights.filter(weight => weight.id !== idToDelete);

            if (token) {
                await fetch('https://strapi-hj5r.onrender.com/api/weights', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: weights
                    })
                })
            } else {
                localStorage.setItem('weights', JSON.stringify(weights));
            }

            this.getStats();
        },
        async deleteMeasurement (idToDelete: number) {
            const measurements = this.measurements.filter(measurement => measurement.id !== idToDelete);

            if (token) {
                await fetch('https://strapi-hj5r.onrender.com/api/measurements', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: measurements
                    })
                })
            } else {
                localStorage.setItem('measurements', JSON.stringify(measurements));
            }

            this.getStats();
        },
        async deleteRecord (idToDelete: number) {
            const records = this.records.filter(record => record.id !== idToDelete);

            if (token) {
                await fetch('https://strapi-hj5r.onrender.com/api/records', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: records
                    })
                })
            } else {
                localStorage.setItem('records', JSON.stringify(records));
            }

            this.getStats();
        },
        async updateWeight (weight: WeightData) {
            const weights = this.weights.filter(storedWeight => storedWeight.id !== weight.id);
            weights.push(weight);

            if (token) {
                await fetch('https://strapi-hj5r.onrender.com/api/weights', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: weights
                    })
                })
            } else {
                localStorage.setItem('weights', JSON.stringify(weights));
            }

            this.getStats();
        },
        async updateMeasurement (measurement: MeasurementData) {
            const measurements = this.measurements.filter(storedMeasurement => storedMeasurement.id !== measurement.id);
            measurements.push(measurement);

            if (token) {
                await fetch('https://strapi-hj5r.onrender.com/api/measurements', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: measurements
                    })
                })
            } else {
                localStorage.setItem('measurements', JSON.stringify(measurements));
            }

            this.getStats();
        },
        async updateRecord (record: RecordData) {
            const records = this.records.filter(storedRecord => storedRecord.id !== record.id);
            records.push(record);

            if (token) {
                await fetch('https://strapi-hj5r.onrender.com/api/records', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: records
                    })
                })
            } else {
                localStorage.setItem('records', JSON.stringify(records));
            }

            this.getStats();
        },
        async getWeights () {
            this.loading = true;

            if (token) {
                await fetch('https://strapi-hj5r.onrender.com/api/weights', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                    }).then(response => {
                        return response.json();
                    }).then(data => {
                        this.weights = data.data;
                    }).catch(error => {
                        console.log(error);
                    });
            } else {
                this.weights = JSON.parse(localStorage.getItem('weights') || '[]');
            }

            this.loading = false;
        },
        async getMeasurements () {
            this.loading = true;

            if (token) {
                await fetch('https://strapi-hj5r.onrender.com/api/measurements', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json'
                    }
                    }).then(response => {
                        return response.json();
                    }).then(data => {
                        this.measurements = data.data;
                    }).catch(error => {
                        console.log(error);
                    });
            } else {
                this.measurements = JSON.parse(localStorage.getItem('measurements') || '[]');
            }

            this.loading = false;
        },
        async getRecords () {
            this.loading = true;

            if (token) {
                await fetch('https://strapi-hj5r.onrender.com/api/records', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json'
                    }
                    }).then(response => {
                        return response.json();
                    }).then(data => {
                        this.records = data.data;
                    }).catch(error => {
                        console.log(error);
                    });
            } else {
                this.records = JSON.parse(localStorage.getItem('records') || '[]');
            }

            this.loading = false;
        },
        async getStats () {
            this.loading = true;

            this.getWeights();
            this.getMeasurements();
            this.getRecords();

            this.loading = false;
        }
    }
});
