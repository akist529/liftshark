import { defineStore } from 'pinia';
import { Stat } from '@/types/index';

export const statsStore = defineStore('statsStore', {
    state: () => ({
        weight: <Stat[]>[],
        neck: <Stat[]>[],
        shoulders: <Stat[]>[],
        chest: <Stat[]>[],
        biceps: <Stat[]>[],
        waist: <Stat[]>[],
        hips: <Stat[]>[],
        thighs: <Stat[]>[]
    }),
    getters: {
        weight: (state) => {
            return state.weight;
        },
        neck: (state) => {
            return state.neck;
        },
        shoulders: (state) => {
            return state.shoulders;
        },
        chest: (state) => {
            return state.chest;
        },
        biceps: (state) => {
            return state.biceps;
        },
        waist: (state) => {
            return state.waist;
        },
        hips: (state) => {
            return state.hips;
        },
        thighs: (state) => {
            return state.thighs;
        }
    },
    actions: {
        addStat (stat: Stat) {
            switch (stat.attributes.type) {
                case 'Weight':
                    this.weight.push(stat);
                    break;
                case 'Neck':
                    this.neck.push(stat);
                    break;
                case 'Shoulders':
                    this.shoulders.push(stat);
                    break;
                case 'Chest':
                    this.chest.push(stat);
                    break;
                case 'Biceps':
                    this.biceps.push(stat);
                    break;
                case 'Waist':
                    this.waist.push(stat);
                    break;
                case 'Hips':
                    this.hips.push(stat);
                    break;
                case 'Thighs':
                    this.thighs.push(stat);
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
                    this.neck = this.neck.filter((neck: Stat) => neck.id !== stat.id);
                    break;
                case 'Shoulders':
                    this.shoulders = this.shoulders.filter((shoulders: Stat) => shoulders.id !== stat.id);
                    break;
                case 'Chest':
                    this.chest = this.chest.filter((chest: Stat) => chest.id !== stat.id);
                    break;
                case 'Biceps':
                    this.biceps = this.biceps.filter((biceps: Stat) => biceps.id !== stat.id);
                    break;
                case 'Waist':
                    this.waist = this.waist.filter((waist: Stat) => waist.id !== stat.id);
                    break;
                case 'Hips':
                    this.hips = this.hips.filter((hips: Stat) => hips.id !== stat.id);
                    break;
                case 'Thighs':
                    this.thighs = this.thighs.filter((thighs: Stat) => thighs.id !== stat.id);
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
                    { const filteredNeck = this.neck.filter((neck: Stat) => neck.id !== updatedStat.id);
                        filteredNeck.push(updatedStat);
                        this.neck = filteredNeck; }
                    break;
                case 'Shoulders':
                    { const filteredShoulders = this.shoulders.filter((shoulders: Stat) => shoulders.id !== updatedStat.id);
                        filteredShoulders.push(updatedStat);
                        this.shoulders = filteredShoulders; }
                    break;
                case 'Chest':
                    { const filteredChest = this.chest.filter((chest: Stat) => chest.id !== updatedStat.id);
                        filteredChest.push(updatedStat);
                        this.chest = filteredChest; }
                    break;
                case 'Biceps':
                    { const filteredBiceps = this.biceps.filter((biceps: Stat) => biceps.id !== updatedStat.id);
                        filteredBiceps.push(updatedStat);
                        this.biceps = filteredBiceps; }
                    break;
                case 'Waist':
                    { const filteredWaist = this.waist.filter((waist: Stat) => waist.id !== updatedStat.id);
                        filteredWaist.push(updatedStat);
                        this.waist = filteredWaist; }
                    break;
                case 'Hips':
                    { const filteredHips = this.hips.filter((hips: Stat) => hips.id !== updatedStat.id);
                        filteredHips.push(updatedStat);
                        this.hips = filteredHips; }
                    break;
                case 'Thighs':
                    { const filteredThighs = this.thighs.filter((thighs: Stat) => thighs.id !== updatedStat.id);
                        filteredThighs.push(updatedStat);
                        this.thighs = filteredThighs; }
                    break;
                default:
                    console.log(`Attempted to update ${updatedStat.attributes.type}, no such stat exists`);
                    break;
            }
        }
    }
});
