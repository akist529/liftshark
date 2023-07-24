import { defineStore } from 'pinia';
import { Stat } from '@/types/index';
import Cookies from 'js-cookie';

const token: string = Cookies.get('token');

export const useStatStore = defineStore('statStore', {
    state: () => ({
        weight: <Stat[]>[],
        measurements: {
            neck: <Stat[]>[],
            shoulders: <Stat[]>[],
            chest: <Stat[]>[],
            biceps: <Stat[]>[],
            waist: <Stat[]>[],
            hips: <Stat[]>[],
            thighs: <Stat[]>[]
        },
        loading: false
    }),
    actions: {
        addStat (stat: Stat) {
            switch (stat.attributes.type) {
                case 'Weight':
                    this.weight.push(stat);
                    break;
                case 'Neck':
                    this.measurements.neck.push(stat);
                    break;
                case 'Shoulders':
                    this.measurements.shoulders.push(stat);
                    break;
                case 'Chest':
                    this.measurements.chest.push(stat);
                    break;
                case 'Biceps':
                    this.measurements.biceps.push(stat);
                    break;
                case 'Waist':
                    this.measurements.waist.push(stat);
                    break;
                case 'Hips':
                    this.measurements.hips.push(stat);
                    break;
                case 'Thighs':
                    this.measurements.thighs.push(stat);
                    break;
                default:
                    console.log(`Attempted to log ${stat.attributes.type}, no such stat exists`);
                    break;
            }
        },
        deleteStat (stat: Stat) {
            switch (stat.attributes.type) {
                case 'Weight':
                    this.weight = this.weight.filter((weight: Stat) => weight.id !== stat.id);
                    break;
                case 'Neck':
                    this.measurements.neck = this.measurements.neck.filter((neck: Stat) => neck.id !== stat.id);
                    break;
                case 'Shoulders':
                    this.measurements.shoulders = this.measurements.shoulders.filter((shoulders: Stat) => shoulders.id !== stat.id);
                    break;
                case 'Chest':
                    this.measurements.chest = this.measurements.chest.filter((chest: Stat) => chest.id !== stat.id);
                    break;
                case 'Biceps':
                    this.measurements.biceps = this.measurements.biceps.filter((biceps: Stat) => biceps.id !== stat.id);
                    break;
                case 'Waist':
                    this.measurements.waist = this.measurements.waist.filter((waist: Stat) => waist.id !== stat.id);
                    break;
                case 'Hips':
                    this.measurements.hips = this.measurements.hips.filter((hips: Stat) => hips.id !== stat.id);
                    break;
                case 'Thighs':
                    this.measurements.thighs = this.measurements.thighs.filter((thighs: Stat) => thighs.id !== stat.id);
                    break;
                default:
                    console.log(`Attempted to delete ${stat.attributes.type}, no such stat exists`);
                    break;
            }
        },
        updateStat (updatedStat: Stat) {
            switch (updatedStat.attributes.type) {
                case 'Weight':
                    { const filteredWeight = this.weight.filter((weight: Stat) => weight.id !== updatedStat.id);
                        filteredWeight.push(updatedStat);
                        this.weight = filteredWeight; }
                    break;
                case 'Neck':
                    { const filteredNeck = this.measurements.neck.filter((neck: Stat) => neck.id !== updatedStat.id);
                        filteredNeck.push(updatedStat);
                        this.measurements.neck = filteredNeck; }
                    break;
                case 'Shoulders':
                    { const filteredShoulders = this.measurements.shoulders.filter((shoulders: Stat) => shoulders.id !== updatedStat.id);
                        filteredShoulders.push(updatedStat);
                        this.measurements.shoulders = filteredShoulders; }
                    break;
                case 'Chest':
                    { const filteredChest = this.measurements.chest.filter((chest: Stat) => chest.id !== updatedStat.id);
                        filteredChest.push(updatedStat);
                        this.measurements.chest = filteredChest; }
                    break;
                case 'Biceps':
                    { const filteredBiceps = this.measurements.biceps.filter((biceps: Stat) => biceps.id !== updatedStat.id);
                        filteredBiceps.push(updatedStat);
                        this.measurements.biceps = filteredBiceps; }
                    break;
                case 'Waist':
                    { const filteredWaist = this.measurements.waist.filter((waist: Stat) => waist.id !== updatedStat.id);
                        filteredWaist.push(updatedStat);
                        this.measurements.waist = filteredWaist; }
                    break;
                case 'Hips':
                    { const filteredHips = this.measurements.hips.filter((hips: Stat) => hips.id !== updatedStat.id);
                        filteredHips.push(updatedStat);
                        this.measurements.hips = filteredHips; }
                    break;
                case 'Thighs':
                    { const filteredThighs = this.measurements.thighs.filter((thighs: Stat) => thighs.id !== updatedStat.id);
                        filteredThighs.push(updatedStat);
                        this.measurements.thighs = filteredThighs; }
                    break;
                default:
                    console.log(`Attempted to update ${updatedStat.attributes.type}, no such stat exists`);
                    break;
            }
        },
        async getStats () {
            this.loading = true;

            if (token) {
                await fetch('http://localhost:1337/api/weight', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json'
                    }
                    }).then(response => {
                        return response.json();
                    }).then(data => {
                        this.weight = data.data;
                    }).catch(error => {
                        console.log(error);
                    });

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
                const localWeight: Stat[] = JSON.parse(localStorage.getItem('weight') || '[]');
                this.weight = localWeight;
                const localMeasurements = JSON.parse(localStorage.getItem('measurements') || '[]');
                this.measurements = localMeasurements;
            }

            this.loading = false;
        }
    }
});
