// Pinia imports
import { defineStore } from 'pinia';
// Type interfaces
import { WeightData, Weight, MeasurementData, Measurement, RecordData, Record } from '@/types/index';
// Third-party libraries
import Cookies from 'js-cookie';

const token: string = Cookies.get('token');

export const useStatStore = defineStore('statStore', {
    state: () => ({
        weights: [] as WeightData[],
        measurements: [] as MeasurementData[],
        records: [] as RecordData[],
        loading: false
    }),
    actions: {
        async addWeight (weight: Weight) {
            if (token) {
                await fetch('http://localhost:1337/apis/weights', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: weight
                    })
                })
            } else {
                const weights: WeightData[] = JSON.parse(localStorage.getItem('weights') || '[]');

                weights.push({
                    id: weights.length,
                    attributes: weight
                });

                localStorage.setItem('weights', JSON.stringify(weights));
            }

            this.getStats();
        },
        async addMeasurement (measurement: Measurement) {
            if (token) {
                await fetch('http://localhost:1337/apis/measurements', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: measurement
                    })
                })
            } else {
                const measurements: MeasurementData[] = JSON.parse(localStorage.getItem('measurements') || '[]');

                measurements.push({
                    id: measurements.length,
                    attributes: measurement
                });

                localStorage.setItem('measurements', JSON.stringify(measurements));
            }

            this.getStats();
        },
        async addRecord (record: Record) {
            if (token) {
                await fetch('http://localhost:1337/apis/records', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: record
                    })
                })
            } else {
                const records: RecordData[] = JSON.parse(localStorage.getItem('records') || '[]');

                records.push({
                    id: records.length,
                    attributes: record
                });

                localStorage.setItem('records', JSON.stringify(records));
            }

            this.getStats();
        },
        async deleteWeight (idToDelete: number) {
            const weights = this.weights.filter(weight => weight.id !== idToDelete);

            if (token) {
                await fetch('http://localhost:1337/apis/weights', {
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
                await fetch('http://localhost:1337/apis/measurements', {
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
                await fetch('http://localhost:1337/apis/records', {
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
                await fetch('http://localhost:1337/apis/weights', {
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
                await fetch('http://localhost:1337/apis/measurements', {
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
                await fetch('http://localhost:1337/apis/records', {
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
                await fetch('http://localhost:1337/api/weights', {
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
                await fetch('http://localhost:1337/api/measurements', {
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
                await fetch('http://localhost:1337/api/records', {
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
